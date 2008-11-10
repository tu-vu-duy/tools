eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.projects.Project");

function Red5Tomcat(tomcatHome) {
  this.runningInstance_ = null ;
  this.name = "red5-tomcat" ;
  this.serverHome = tomcatHome ;
  this.cleanServer = java.lang.System.getProperty("clean.server") ;
  if(this.cleanServer == null || this.cleanServer.equals("") || !this.cleanServer.startsWith("red5-tomcat")) this.cleanServer = "red5-tomcat" ;
  this.deployLibDir = this.serverHome + "/lib" ;
  this.deployWebappDir = this.serverHome + "/webapps";
  this.patchDir = this.serverHome ;
  this.pluginVersion = "trunk";
}

Red5Tomcat.prototype.RunTask = function() {
	var descriptor = new TaskDescriptor("Run Red5Tomcat", this.serverHome + "/bin") ;
	descriptor.execute = function() {
		java.lang.System.setProperty("user.dir", descriptor.workingDir) ;
		java.lang.System.setProperty("catalina.base", eXo.server.Red5Tomcat.serverHome) ;
    java.lang.System.setProperty("catalina.home", eXo.server.Red5Tomcat.serverHome) ;
    java.lang.System.setProperty("java.io.tmpdir", eXo.server.Red5Tomcat.serverHome + "/temp") ;
    java.lang.System.setProperty("org.apache.commons.logging.Log","org.apache.commons.logging.impl.SimpleLog") ;
    java.lang.System.setProperty("java.security.auth.login.config", eXo.server.Red5Tomcat.serverHome + "/conf/jaas.conf") ;
    var sysClasspath = [
      new java.net.URL("file:" + eXo.env.javaHome + "/lib/tools.jar"), 
      new java.net.URL("file:" + this.serverHome + "/bin/commons-logging-api.jar")
    ];
    eXo.System.addSystemClasspath(sysClasspath);
    var tomcatClasspath = [ new java.net.URL("file:" + eXo.server.Red5Tomcat.serverHome + "/bin/bootstrap.jar")];
    var contextLoader= java.lang.Thread.currentThread().getContextClassLoader();
    var tomcatLoader = new java.net.URLClassLoader(tomcatClasspath, contextLoader);
    java.lang.Thread.currentThread().setContextClassLoader(tomcatLoader);
    
    var bootstrap = tomcatLoader.loadClass("org.apache.catalina.startup.Bootstrap") ;
    instance =  bootstrap.newInstance() ;
		java.lang.System.gc() ;
    instance.init() ;
    instance.start() ;

    java.lang.Thread.currentThread().setContextClassLoader(contextLoader); 
    eXo.server.Red5Tomcat.runningInstance_ =  instance ;
	}
	return descriptor;
}

Red5Tomcat.prototype.StopTask = function() {
	var descriptor = new TaskDescriptor("Stop Red5Tomcat", this.serverHome + "/bin") ;
	descriptor.execute = function() {
		if(eXo.server.Red5Tomcat.runningInstance_ != null) {
      eXo.server.Red5Tomcat.runningInstance_.stop() ;
      eXo.server.Red5Tomcat.runningInstance_ = null ;
    }
	}
	return descriptor;
}

Red5Tomcat.prototype.CleanTask = function() {
	var descriptor = new TaskDescriptor("Clean Red5Tomcat", this.serverHome + "/bin") ;
	descriptor.execute = function() {
	eXo.core.IOUtil.emptyFolder(serverHome + "/logs");
    eXo.core.IOUtil.emptyFolder(serverHome + "/temp");
	}
	return descriptor;
}

Red5Tomcat.prototype.preDeploy = function(product) {
	product.addDependencies(new Project("commons-logging", "commons-logging", "jar", "1.0.4")) ;
  product.addDependencies(new Project("commons-pool", "commons-pool", "jar", "1.2")) ;
  product.addDependencies(new Project("commons-dbcp", "commons-dbcp", "jar", "1.2.1")) ;
  product.addDependencies(new Project("org.exoplatform.tool", "exo.tool.webunit", "jar", "trunk")) ;
}

Red5Tomcat.prototype.onDeploy = function(project) {
//  if("exo-portal" == project.type) {
//    var context = project.artifactId.substring(project.artifactId.lastIndexOf(".") + 1) ;
//    var dirname = this.serverHome + "/conf/Catalina/localhost/";
//    var destDir = new java.io.File(dirname);
//    if(!destDir.exists()) destDir.mkdirs() ;
//    var filename = dirname + context + ".xml";
//    eXo.System.info("TOMCAT", "Generating tomcat context" + filename);    
//    var config = 
//      "<Context path='/" + context+ "' docBase='" + context + "' debug='0' reloadable='true' crossContext='true'> \n" +
//      //className can be org.apache.catalina.logger.FileLogger
//      "  <Logger className='org.apache.catalina.logger.SystemOutLogger' \n" +
//      "          prefix='localhost_" + context + "_log.' suffix='.txt' timestamp='true'/> \n" +
//      "  <Manager className='org.apache.catalina.session.PersistentManager' saveOnRestart='false'/> \n" +
//      "  <Realm className='org.apache.catalina.realm.JAASRealm' \n" +
//      "         appName='exo-domain' \n" +
//      "         userClassNames='org.exoplatform.services.security.jaas.UserPrincipal' \n" +
//      "         roleClassNames='org.exoplatform.services.security.jaas.RolePrincipal' \n" +
//      "         debug='0' cache='false'/> \n" +
//      "	 <Valve className='org.apache.catalina.authenticator.FormAuthenticator' characterEncoding='UTF-8'/>" +
//      "</Context> \n";
//    eXo.core.IOUtil.createFile(filename, config) ;
//  }
}

Red5Tomcat.prototype.postDeploy = function(product) {
	
}

eXo.server.Red5Tomcat = Red5Tomcat.prototype.constructor ;
