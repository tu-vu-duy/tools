eXo.require("eXo.core.TaskDescriptor")  ;
eXo.require("eXo.projects.Project")  ;
eXo.require("eXo.projects.eXoProduct")  ;
eXo.require("eXo.server")  ;

function DBInstance() {
  this.name = null ;
  this.drivers = [] ;
  this.conectionURL = null ;
  this.driverClass = null ;
  this.username = null ;
  this.password = null;
  this.dialect = null ;
}

DBInstance.prototype.DeployTask = function(product, server, repos) {
  var task = new TaskDescriptor("Deploy Database Driver", null) ;
  task.description = "Deploy the database driver for database "  + this.name;
  task.product = product ;
  task.server = server ;
  task.repos = repos ;
  task.dbinstance = this ;

  task.execute = function() {
    var driver = this.dbinstance.drivers ;
    for(var i = 0; i < driver.length ; i++) {
      var project = driver[i] ;
      project.deployTo(repos, server) ;
      server.onDeploy(project) ;
    }
  }
  return task ;
}

DBInstance.prototype.GetConfigTask = function() {
  var descriptor = new TaskDescriptor("Configure Database", null) ;
  descriptor.description = "Configure the database environment for " + this.name;

  descriptor.execute = function() {
    var input = null ;
    input = eXo.System.readInput("Enter the connection url[" + this.conectionURL + "]") ;
    if(input != null && input.length() > 0) conectionURL = input ;
    input = eXo.System.readInput("Enter the username[" + this.username + "]") ;
    if(input != null && input.length() > 0) username = input ;
    input = eXo.System.readInput("Enter the password[" + this.password + "]") ;
    if(input != null && input.length() > 0) password = input ;       
  }
  return descriptor;
}

DBInstance.prototype.ConfigureTask = function(product, server) {
  var descriptor =  new TaskDescriptor("Configure Database", null) ;
  descriptor.description = "Configure the database environment for " + this.name;
  descriptor.product = product;
  descriptor.server = server;
      
  descriptor.modifyDbConfig = function(moduleFile, configEntry) {
    file = new java.io.File(moduleFile) ;
    if(!file.exists())  return ;
    var configContent = new java.lang.String(eXo.core.IOUtil.getJarEntryContent(moduleFile, configEntry)) ;
    configContent = configContent.replace("${dialect}", this.dialect) ;
    configContent = configContent.replace("${driverClass}", this.driverClass) ;
    configContent = configContent.replace("${connectionUrl}", this.conectionURL) ;
    configContent = configContent.replace("${username}", this.username) ;
    configContent = configContent.replace("${password}", this.password) ;
    var mentries = new java.util.HashMap() ;
    mentries.put(configEntry, configContent.getBytes("UTF-8")) ;
    eXo.core.IOUtil.modifyJar(moduleFile, mentries, null);
  }
 
  descriptor.execute =function () {
    var properties = new java.util.HashMap() ;
    properties.put("${dialect}", this.dialect) ;
    properties.put("${driverClass}", this.driverClass) ;
    properties.put("${connectionUrl}", this.conectionURL) ;
    properties.put("${username}", this.username) ;
    properties.put("${password}", this.password) ;
        
    var imports = new java.util.HashMap() ;
    imports.put("war:/conf/database-configuration.hsql.xml", "war:/conf/database-configuration.xml") ;
    eXo.core.IOUtil.modifyJarEntry(this.server.deployWebappDir + "/" + this.product.portalwar, "WEB-INF/conf/configuration.xml", imports);
    eXo.core.IOUtil.modifyJarEntry(this.server.deployWebappDir + "/" + this.product.portalwar, "WEB-INF/conf/database-configuration.xml", properties);

    imports.clear() ;
    imports.put("classpath:/conf/portal/jdbcexo-configuration.hsql.xml", "classpath:/conf/portal/jdbcexo-configuration.db.xml") ;
    eXo.core.IOUtil.modifyJarEntry(this.server.deployLibDir + "/exo-platform.services.database.impl-2.0.3.jar" , "conf/portal/configuration.xml", imports);
    eXo.core.IOUtil.modifyJarEntry(this.server.deployLibDir + "/exo-platform.services.database.impl-2.0.3.jar" , "conf/portal/jdbcexo-configuration.db.xml", properties);
        
    imports.clear() ;
    imports.put("classpath:/conf/portal/jdbcjcr-configuration.hsql.xml", "classpath:/conf/portal/jdbcjcr-configuration.xml") ;
    eXo.core.IOUtil.modifyJarEntry(this.server.deployLibDir + "/exo-jcr.services.jcr.impl-1.1.jar" , "conf/portal/configuration.xml", imports);
    eXo.core.IOUtil.modifyJarEntry(this.server.deployLibDir + "/exo-jcr.services.jcr.impl-1.1.jar" , "conf/portal/jdbcjcr-configuration.xml", properties);
  }
  return descriptor;
}

//==========================================================================================

function Database() {
  
}

Database.prototype.HsqlDB = function() {
  var instance = new DBInstance() ;
  instance.name = "hsql" ;
  instance.drivers = [ new Project("hsqldb", "hsqldb", "jar", "1.8.0.7") ] ;

  instance.driverClass = "org.hsqldb.jdbcDriver";
  instance.dialect = "org.hibernate.dialect.HSQLDialect" ;
  instance.conectionURL = "jdbc:hsqldb:file:/tmp/hsql/exodb";
  instance.username = "sa" ;
  instance.password = "";
  return instance ;
}

Database.prototype.MysqlDB = function() {
  var instance = new DBInstance() ;
  instance.name = "mysql" ;
  instance.drivers = [ new Project("mysql", "mysql-connector-java", "jar", "5.0.3-bin")] ;
   
  instance.driverClass = "com.mysql.jdbc.Driver";
  instance.dialect = "org.hibernate.dialect.MySQLDialect" ;
  instance.conectionURL = "jdbc:mysql://localhost:3306/exodb?relaxAutoCommit=true&amp;autoReconnect=true&amp;useUnicode=true&amp;characterEncoding=utf8";
  instance.username = "exo" ;
  instance.password = "exo";
    
    return instance ;
  }

//==========================================================================================

eXo.server.Database = new Database() ;

//var dbinstance = eXo.server.Database.HsqlDB() ;

//product = new eXo.projects.eXoProduct.portal();
//server = new Tomcat(eXo.env.workingDir + "/exo-tomcat") ;

//var task = dbinstance.DeployTask (product, server, eXo.env.m2Repos);
//task.execute();

//var descriptor = dbinstance.GetConfigTask();
//descriptor.execute() ;
//print ("parameter ====>  User: " + this.username);

//var task = dbinstance.ConfigureTask(product, server);
//task.modifyDbConfig("target/exo.tool.build-2.0.jar", "linux/exobuild.sh");

//var task = dbinstance.ConfigureTask(product, server);
//task.execute();
//print ("parameter ====>  TEST PASS " );



