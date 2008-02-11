eXo.require("eXo.server.Tomcat") ;
eXo.require("eXo.server.Jboss") ;
eXo.require("eXo.server.Jonas") ;
eXo.require("eXo.server.Database") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.command.maven") ;
eXo.require("eXo.command.exosvn") ;
eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.projects.Workflow") ;
eXo.require("eXo.projects.Product") ;

function exobuildInstructions() {
  print(
   "\n\n" +
   "Usage the exobuild command: \n\n" +
   "  exobuild --product=[portal,ecm,cs,ultimate]\n" +
   "           [--version]\n" + 
   "           [--update]\n" +
   "           [--build]\n" +
   "           [--exclude=all,pc,jcr,..]\n" +
   "           [--deploy=tomcat,jboss,jonas]\n" +
   "					 [--workflow=jbpm,bonita]\n" +
   "           [--clean-mvn-repo]\n" +
   "           [--database]\n" +
   "           [--ask]\n" +
   "\n\n" +
   "Options: \n" +
   "  * --product          is mandatory. The possible names are portal, ecm, groupware, all\n" +
   "  * --version          is optional. This option allows to specify which version of the product\n" +
   "                       to build. Default is \"trunk\"\n" +
   "  * --update           is optional. If you add this option, exobuild  will make a\n" +
   "                       svn update before it builds\n" +
   "  * --build            is optional. If you add this option, the exobuild command\n" +
   "                       will compile and install the sub projects of the product,\n" +
   "  * --exclude          is optional. You can specify any module name. Ideal when one dependency\n" +
   "                       makes the compilation break.\n" +
   "  * --deploy           is optional. The possible names are tomcat-server, jboss-server, and\n" +
   "                       jonas-server. If you enter only --deploy, the tomcat-server will be used\n" +
   "  * --clean-mvn-repo   is optional. This option is allowed you to delete the exo artifact in the\n" +
   "                       maven repository.\n" +
   "  * --database         is optional. This option must use with the --deploy option. The possible\n" +
   "                       values are hsql, mysql, oracle, postgres, derby and mssql\n" +
   "  * --ask              is optional. This option is used with --database option. it allow you to\n" +
   "                       enter the connection url , username and password of the database server\n"  +
   "  * --workflow         is optional. The possible names are bonita or jbpm. This option only use\n"+
   "                       for products which use workflow like ecm,ultimate and ecm related products\n"+
   "                       By default, jpbm will be used for the products"
  );
}

function ReleaseTask(server, product, version) {
  var descriptor = new TaskDescriptor("Release Task", server.serverHome) ;
  descriptor.execute = function() {
    var versionInfo = "unknown";
    if("trunk" == version) {
      var commands = ["svn", "info", eXo.env.eXoProjectsDir + "/" + product.codeRepo] ;
      var result = eXo.System.run(commands) ; 
      var line = result.split("\n") ;
      for(var i = 0; i < line.length; i++) {
        if(line[i].startsWith("Revision: ")) {
          versionInfo = "r" + line[i].substring("Revision: ".length, line[i].length()) ;
       }
      } 
    } else {
      versionInfo = version ;
    }
    eXo.core.IOUtil.zip(server.serverHome, eXo.env.workingDir, "exo-" + product.name + "-" + versionInfo + "-" + server.name) ;
  }
  return descriptor ;
}


var build_ = false ;
var update_ = false ;
var ask = false ;
var exclude_ = null ;
var release_ = false;
var cleanMVNRepo_ = false;

var maven = new eXo.command.maven() ;
var exosvn = null ;
var server = null ;
var deployServers = null;
var productName = null;
var product = null ;
var database = null;
var version = "trunk";
var workflow = new Workflow("jbpm",version)

var args = arguments;

for(var i = 0; i <args.length; i++) {
  var arg = args[i] ;
  if ("--update" == arg) {
    update_ = true ;
  } else if (arg.match ("--version")) {
    version = arg.substring("--version=".length);
  } else if ("--build" == arg) {
    build_ = true ;
  } else if ("--ask" == arg) {
    ask = true ;
  } else if ("--clean-mvn-repo" == arg) {
    cleanMVNRepo_ = true ;
  } else if ("--release" == arg) {
    release_ = true ;
  } else if ("--release=jboss" == arg) {
    release_ = true ;
    deployServers = [new Jboss(eXo.env.workingDir + "/exo-jboss")];
  } else if ("--release=jonas" == arg) {
    release_ = true ;
    deployServers = [new Jonas(eXo.env.workingDir + "/exo-jonas")];
  } else if ("--release=all" == arg) {
    release_ = true ;
    deployServers = [
      new Jboss(eXo.env.workingDir + "/exo-jboss") ,
      new Jonas(eXo.env.workingDir + "/exo-jonas") ,
      new Tomcat(eXo.env.workingDir + "/exo-tomcat")
    ]  ;
  } else if (arg.match("--exclude="))  {
    exclude_ = arg.substring("--exclude=".length) ;
  } else if (arg.match("--deploy")) {
    if(arg == "--deploy=jboss") server = new Jboss(eXo.env.workingDir + "/exo-jboss") ;
    else if(arg == "--deploy=jonas") server = new Jonas(eXo.env.workingDir + "/exo-jonas") ;
    else server = new Tomcat(eXo.env.workingDir + "/exo-tomcat") ;
  } else if(arg == "--database=mysql") {
    database = eXo.server.Database.MysqlDB() ;
  } else if(arg == "--database=oracle") {
    database = eXo.server.Database.OracleDB() ;
  } else if(arg == "--database=postgresql") {
    database = eXo.server.Database.PostgresDB() ;
  } else if(arg == "--database=db2") {
    database = eXo.server.Database.DB2ExpressDB() ;
  } else if(arg == "--database=db2v8") {
	 database = eXo.server.Database.DB2V8DB() ;  
  } else if(arg == "--database=derby") {
    database = eXo.server.Database.DerbyDB() ;
  } else if(arg == "--database=sqlserver") {
    database = eXo.server.Database.SqlServerDB() ;
  } else if (arg.match("--product")) {
    productName = arg.substring("--product=".length);
  }else if (arg.match("--workflow")) {
    var workflowName = arg.substring("--workflow=".length);
    workflow = new Workflow(workflowName,version);
    java.lang.System.setProperty("workflow",workflowName) ;
  } else {
    print("UNKNOWN ARGUMENT: " + arg); 
    exobuildInstructions() ;
    java.lang.System.exit(1);
  }
}

if(productName == null) { 
  exobuildInstructions() ;
} else {
  product = Product.GetProduct(productName, version);
}

tasks =  new java.util.ArrayList() ;
  
if(database == null) database = eXo.server.Database.HsqlDB() ;
  
if(release_ && server == null) {
  server = new Tomcat(eXo.env.workingDir + "/exo-tomcat") ;
}

if(server != null  && deployServers == null) {
  deployServers = [server] ; 
}
  
if(deployServers != null  && ask) {
  tasks.add(database.GetConfigTask()) ;
}
if(update_) {
	exosvn = new eXo.command.exosvn();
  if("all" != exclude_) {
    for(var i = 0; i < product.dependencyModule.length; i++) {
      var module = product.dependencyModule[i] ;
      if(exclude_ == null || exclude_.indexOf(module.name) < 0) {
        var moduleDir = eXo.env.eXoProjectsDir + "/" + module.relativeSRCRepo ;
        var directory = new java.io.File(moduleDir);
        if(directory.exists()) tasks.add(exosvn.UpdateTask(moduleDir));
      }
    }
  }
  tasks.add(exosvn.UpdateTask(eXo.env.eXoProjectsDir + "/" + product.codeRepo));
}


if(build_) {
  var mvnArgs = ["clean", "install"] ;
  for(var i = 0; i < product.dependencyModule.length; i++) {
  	var module = product.dependencyModule[i] ;
    if(cleanMVNRepo_) {
      eXo.core.IOUtil.remove(eXo.env.dependenciesDir + "/repository/" + module.relativeMavenRepo) ;
    }
    if("all" != exclude_) {
      if(exclude_ == null || exclude_.indexOf(module.name) < 0) {
        var moduleDir = eXo.env.eXoProjectsDir + "/" + module.relativeSRCRepo ;
        var directory = new java.io.File(moduleDir);
        if(directory.exists()) tasks.add(maven.MavenTask(moduleDir, mvnArgs));
      }
    }
  }
  var moduleDir = eXo.env.eXoProjectsDir + "/" + product.codeRepo ;
  tasks.add(maven.MavenTask(moduleDir, mvnArgs));
}

if(deployServers != null) {	
	if(product.useWorkflow) {			
		workflow.configWorkflow(product);
	}	 	
  for(var i = 0; i < deployServers.length; i++) {
    server =  deployServers[i] ;
    tasks.add(product.DeployTask(product, server, eXo.env.m2Repos)) ;
    tasks.add(database.DeployTask(product, server, eXo.env.m2Repos)) ;
    tasks.add(database.ConfigureTask(product, server)) ;
    if(release_)tasks.add(ReleaseTask(server, product, version)) ;
  }
}


for(var i = 0; i < tasks.size(); i++) {
  task = tasks.get(i) ;
  var start = java.lang.System.currentTimeMillis() ;
  task.banner() ;
  task.execute() ;
  task.executionTime = java.lang.System.currentTimeMillis() - start ;
  task.report() ;
}
