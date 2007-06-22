eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.projects.Project");

function Tomcat(tomcatHome) {
  this.runningInstance_ = null ;
  this.name = "tomcat" ;
  this.serverHome = tomcatHome ;
  this.cleanServer = "tomcat-6.0.10" ;
  this.deployLibDir = this.serverHome + "/lib" ;
  this.deployWebappDir = this.serverHome + "/webapps";
  this.patchDir = this.serverHome ;
}

Tomcat.prototype.RunTask = function() {
	var descriptor = new TaskDescriptor("Run Tomcat", this.serverHome + "/bin") ;
	descriptor.execute = function() {
		java.lang.System.setProperty("user.dir", descriptor.workingDir) ;
		java.lang.System.setProperty("catalina.base", eXo.server.Tomcat.serverHome) ;
    java.lang.System.setProperty("catalina.home", eXo.server.Tomcat.serverHome) ;
    java.lang.System.setProperty("java.io.tmpdir", eXo.server.Tomcat.serverHome + "/temp") ;
    java.lang.System.setProperty("org.apache.commons.logging.Log","org.apache.commons.logging.impl.SimpleLog") ;
    java.lang.System.setProperty("java.security.auth.login.config", eXo.server.Tomcat.serverHome + "/conf/jaas.conf") ;
    var sysClasspath = [
      new java.net.URL("file:" + eXo.env.javaHome + "/lib/tools.jar"), 
      new java.net.URL("file:" + this.serverHome + "/bin/commons-logging-api.jar")
    ];
    eXo.System.addSystemClasspath(sysClasspath);
    var tomcatClasspath = [ new java.net.URL("file:" + eXo.server.Tomcat.serverHome + "/bin/bootstrap.jar")];
    var contextLoader= java.lang.Thread.currentThread().getContextClassLoader();
    var tomcatLoader = new java.net.URLClassLoader(tomcatClasspath, contextLoader);
    java.lang.Thread.currentThread().setContextClassLoader(tomcatLoader);
    
    var bootstrap = tomcatLoader.loadClass("org.apache.catalina.startup.Bootstrap") ;
    instance =  bootstrap.newInstance() ;
		java.lang.System.gc() ;
    instance.init() ;
    instance.start() ;

    java.lang.Thread.currentThread().setContextClassLoader(contextLoader); 
    eXo.server.Tomcat.runningInstance_ =  instance ;
	}
	return descriptor;
}

Tomcat.prototype.StopTask = function() {
	var descriptor = new TaskDescriptor("Stop Tomcat", this.serverHome + "/bin") ;
	descriptor.execute = function() {
		if(eXo.server.Tomcat.runningInstance_ != null) {
      eXo.server.Tomcat.runningInstance_.stop() ;
      eXo.server.Tomcat.runningInstance_ = null ;
    }
	}
	return descriptor;
}

Tomcat.prototype.CleanTask = function() {
	var descriptor = new TaskDescriptor("Clean Tomcat", this.serverHome + "/bin") ;
	descriptor.execute = function() {
		eXo.core.IOUtil.emptyFolder(serverHome + "/logs");
    eXo.core.IOUtil.emptyFolder(serverHome + "/temp");
	}
	return descriptor;
}

Tomcat.prototype.preDeploy = function(product) {
	product.addDependencies(new Project("commons-logging", "commons-logging-api", "jar", "1.0.4")) ;
  product.addDependencies(new Project("commons-pool", "commons-pool", "jar", "1.2")) ;
  product.addDependencies(new Project("commons-dbcp", "commons-dbcp", "jar", "1.2.1")) ;
  product.addDependencies(new Project("org.exoplatform.portal", "exo.portal.server.tomcat.plugin", "jar", "2.0")) ;
}

Tomcat.prototype.onDeploy = function(project) {
  if("exo-portal" == project.type) {
    var context = project.artifactId.substring(project.artifactId.lastIndexOf(".") + 1) ;
    var config = 
      "<Context path='/" + context+ "' docBase='" + context + "' debug='0' reloadable='true' crossContext='true'> \n" +
      //className can be org.apache.catalina.logger.FileLogger
      "  <Logger className='org.apache.catalina.logger.SystemOutLogger' \n" +
      "          prefix='localhost_" + context + "_log.' suffix='.txt' timestamp='true'/> \n" +
      "  <Manager className='org.apache.catalina.session.PersistentManager' saveOnRestart='false'/> \n" +
      "  <Realm className='org.apache.catalina.realm.JAASRealm' \n" +
      "         appName='exo-domain' \n" +
      "         userClassNames='org.exoplatform.services.organization.auth.UserPrincipal' \n" +
      "         roleClassNames='org.exoplatform.services.organization.auth.RolePrincipal' \n" +
      "         debug='0' cache='false'/> \n" +
      "</Context> \n";
    eXo.core.IOUtil.createFile(this.serverHome + "/conf/Catalina/localhost/" + context + ".xml", config) ;
  }
}

Tomcat.prototype.postDeploy = function(product) {
	
}

eXo.server.Tomcat = Tomcat.prototype.constructor ;