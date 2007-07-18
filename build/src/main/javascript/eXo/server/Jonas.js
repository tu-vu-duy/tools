eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.projects.Project");

function Jonas(jonasHome) {
  this.runningInstance_ = null ;
  this.name = "jonas" ;
  this.serverHome = jonasHome ;
  this.cleanServer = "JONAS_4_8_5" ;
  this.deployLibDir = this.serverHome + "/lib/apps" ;
  this.deployWebappDir = this.serverHome + "/apps/autoload/exoplatform.ear";
  this.patchDir = this.serverHome ;
}

Jonas.prototype.RunTask = function() {
  descriptor =  new TaskDescriptor("Run Jonas", this.serverHome + "/bin") ;
  descriptor.execute = function() {
    eXo.System.info("RunTask() has not been implemented.") ;
  }
  return descriptor ;
};

Jonas.prototype.StopTask = function() {
  descriptor =  new TaskDescriptor("Stop Jonas", this.serverHome + "/bin") ;
  descriptor.execute = function() {
    eXo.System.info("StopTask() has not been implemented.") ;
  }
  return descriptor ;
};

Jonas.prototype.CleanTask = function() {
  descriptor =  new TaskDescriptor("Clean Jonas", this.serverHome + "/bin") ;
  descriptor.server = this;
  descriptor.execute = function() {
    eXo.core.IOUtil.emptyFolder(this.server.serverHome + "/logs");
    eXo.core.IOUtil.emptyFolder(this.server.serverHome + "/temp");
    eXo.core.IOUtil.emptyFolder(this.server.serverHome + "/work");
  }
  return descriptor ;
}

Jonas.prototype.preDeploy = function(product) {
  eXo.core.IOUtil.createFolder(this.deployWebappDir + "/META-INF");
  product.addDependencies(new Project("commons-dbcp", "commons-dbcp", "jar", "1.2.1")) ;
  product.addDependencies(new Project("commons-pool", "commons-pool", "jar", "1.2")) ;
}

Jonas.prototype.onDeploy = function(project) { }

Jonas.prototype.postDeploy = function(product) {
  ServerUtil = eXo.server.ServerUtil ;
  ServerUtil.createEarApplicationXml(this.deployWebappDir) ;
  ServerUtil.addClasspathForWar(this.deployLibDir) ;
}

eXo.server.Jonas = Jonas.prototype.constructor ;