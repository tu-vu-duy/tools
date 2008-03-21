eXo.require("eXo.server.Tomcat") ;
eXo.require("eXo.server.Jboss") ;
eXo.require("eXo.server.Jonas") ;
eXo.require("eXo.server.Database") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.command.maven") ;
eXo.require("eXo.command.svn") ;
// eXo.require("eXo.command.exosvn") ;
eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.projects.Workflow") ;
eXo.require("eXo.projects.Product") ;

// initialize possible database setups   
var databaseMap = new java.util.HashMap();
databaseMap.put("hsqldb", eXo.server.Database.HsqlDB("hsqldb"));
databaseMap.put("mysql", eXo.server.Database.MysqlDB("mysql"));
databaseMap.put("oracle", eXo.server.Database.OracleDB("oracle"));
databaseMap.put("postgresql", eXo.server.Database.PostgresDB("postgresql"));
databaseMap.put("db2", eXo.server.Database.DB2ExpressDB("db2"));
databaseMap.put("db2v8", eXo.server.Database.DB2V8DB("db2v8"));   
databaseMap.put("derby", eXo.server.Database.DerbyDB("derby"));
databaseMap.put("sqlserver", eXo.server.Database.SqlServerDB("sqlserver"));

var modules = ["all","pc","jcr", "ws", "tools", "ecm", "cs", "ks", "portal"];
var products = ["cs", "ks" ,"ecm","portal", "ultimate", "wcm", "webos"];
var servers = ["all", "jonas", "jboss", "tomcat"];

function exobuildInstructions() {
  print(
   "\n" +
   "Use of the exobuild command: \n\n" +
   "  exobuild --product=name\n" +
   "           [--version=version]\n" + 
   "           [--update]\n" +
   "           [--build]\n" +
   "           [--exclude=modules]\n" +
   "           [--deploy[=server]]\n" +
   "           [--release[=server]]\n" +   
   "           [--workflow[=jbpm|bonita]]\n" +
   "           [--clean-mvn-repo]\n" +
   "           [--database[=dialect]]\n" +
   "           [--dbsetup=option]\n" +
   "\n\n" +
   "Options: \n" +
   "  * --product=name     Mandatory. Name of the product you want to build.\n" +
   "                       The possible names are " + products +".\n" +
   "  * --version=version  Allows to specify which version of the product\n" +
   "                       to build such as trunk, tags/2.0, branches/2.0,.... Default is trunk.\n" +
   "  * --update           Run a svn update before it builds.\n" +
   "  * --build            Compile and install the sub projects of the product,\n" +
   "  * --exclude          Exclude the given modules (comma separated) from compilation and fetch jars from repository\n" +   
   "                       You can specify any module name in " + modules + ".\n" +
   "                       Use this to avoid full build or when a module breaks the build\n" +
   "  * --deploy=server    Deploy to a given application server. Possible values are: " + servers +".\n" +
   "                       Default is tomcat.\n" +   
   "  * --release=server   Release for the target application server. Produce a zip named after the current SVN revision.\n" + 
   "                       Possible values are: " + servers +". Default is tomcat\n" +   
   "  * --clean-mvn-repo   Clean your local repository of eXo artifacts before building.\n" +
   "  * --database=dialect Specify target database dialect. The possible values are " + databaseMap.keySet() + ".\n" +
   "                       This will configure the appropriate JCR dialects and deploy the JDBC driver.\n" +
   "                       Used with --dbsetup=file option, exobuild tries to get database settings in a file named\n" + 
   "                       database-configuration.{dialect}.xml\n" +   
   "  * --dbsetup=option   Use this option with --database option to specify the database setup behaviour.\n" +
   "                       dbsetup=file will use the database and jcr files you provided.\n" +
   "                       dbsetup=ask allow you to enter the connection url , username and password of the database server.\n" +
   "                       dbsetup=defaults is the default option if dbsetup is not specified and will override settings by those defined in Database.js\n" +    
   "  * --workflow=engine  Specify the workflow engine to bundle with the product. The possible values are bonita or jbpm.\n"+
   "                       This option is only used for products that use workflow. Default engine is jbpm\n"
  );
}

function ReleaseTask(server, product, version) {
  var descriptor = new TaskDescriptor("Release Task", server.serverHome) ;
  descriptor.execute = function() {
    var versionInfo = "unknown";
    if("trunk" == version) {
    
      var commands = ["svn", "info", eXo.env.eXoProjectsDir + "/" + product.codeRepo] ;
      
      eXo.System.info("RELEASE", "Getting product revision from SVN.");
      var result = eXo.System.run(commands) ;
       
      var line = result.split("\n") ;
      for(var i = 0; i < line.length; i++) {
        if(line[i].match("vision")) {
         eXo.System.info("RELEASE", line[i]);
         versionInfo = "r" + line[i].substring(line[i].lastIndexOf(":")+1, line[i].length()).trim() ;
       }
      } 
    } else {
      versionInfo = version ;
    }
    
    var zipName = "exo-" + product.name + "-" + versionInfo + "-" + server.name;
    eXo.System.info("RELEASE", "Building zip: " + zipName + ".zip"+ " in " + eXo.env.workingDir);    
    eXo.core.IOUtil.zip(server.serverHome, eXo.env.workingDir, zipName) ;
  }
  return descriptor ;
}


var build_ = false ;
var update_ = false ;
var ask = false ;
var exclude_ = null ;
var release_ = false;
var cleanMVNRepo_ = false;
var dbsetup = "defaults";
var maven = new eXo.command.maven() ;
var exosvn = null ;
var server = null ;
var deployServers = null;
var productName = null;
var product = null ;
var dialect = "hsqldb";
var database = databaseMap.get(dialect);
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
  } else if (arg.match("--dbsetup")) {
   if (arg.match("--dbsetup=")) dbsetup = arg.substring("--dbsetup=".length);
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
  } else if (arg.match("--database=")) {
   		dialect = arg.substring("--database=".length);
   
   var database = databaseMap.get(dialect); 
   if (database == null) {
     eXo.System.info("ERR", "Unknown dialect " + dialect + ". Please provide one of: " + databaseMap.keySet());
    java.lang.System.exit(1);
   }
       
  } else if (arg.match("--product")) {
    productName = arg.substring("--product=".length);
  }else if (arg.match("--workflow")) {
    var workflowName = arg.substring("--workflow=".length);
    workflow = new Workflow(workflowName,version);
    java.lang.System.setProperty("workflow",workflowName) ;
  } else {
    eXo.System.info("ERR", "UNKNOWN ARGUMENT: " + arg); 
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
  
if(deployServers != null  && dbsetup == "ask") {
  tasks.add(database.GetConfigTask()) ;
}
if(update_) {
//	exosvn = new eXo.command.exosvn();
	exosvn = new eXo.command.svn();
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
    workflow.version = product.workflowVersion ;
		workflow.configWorkflow(product);
	}	 	
  for(var i = 0; i < deployServers.length; i++) {
    server =  deployServers[i] ;
    server.pluginVersion = product.serverPluginVersion ;
    tasks.add(product.DeployTask(product, server, eXo.env.m2Repos)) ;
    tasks.add(database.DeployTask(product, server, eXo.env.m2Repos)) ;
    tasks.add(database.ConfigureTask(product, server, dbsetup)) ;
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
