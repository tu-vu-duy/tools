eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.server.ServerUtil") ;
eXo.require("eXo.projects.Project");

function JbossEar(jbossHome) {
  //this.exoJBoss5 = false;
  this.runningInstance_ = null ;
  this.name = "ear" ;
  this.serverHome = jbossHome ;
  this.earFile = eXo.env.workingDir + "/exoplatform.ear" ;
  this.cleanServer = java.lang.System.getProperty("clean.server") ;
  if(this.cleanServer == null || this.cleanServer.equals("") || !this.cleanServer.startsWith("ear")) this.cleanServer = "ear" ;
  this.deployLibDir = this.serverHome;
  this.deployWebappDir = this.serverHome;
  this.patchDir = this.serverHome;// + "/server/default"; //because we have to patch bin/ directory
}

JbossEar.prototype.RunTask = function() {
  var descriptor =  new TaskDescriptor("Run JbossEar", this.serverHome + "/bin") ;
  descriptor.server = this;
  descriptor.execute = function() {

  }
  return descriptor ;
};
  
JbossEar.prototype.StopTask = function() {
	var descriptor =  new TaskDescriptor("Stop JbossEar", this.serverHome + "/bin") ;
  descriptor.server = this;
  descriptor.execute = function() {

  }
  return descriptor ;
};

JbossEar.prototype.CleanTask = function() {
	var descriptor = new TaskDescriptor("Clean JbossEar", this.serverHome + "/bin") ;
  descriptor.server = this;
  descriptor.execute = function() {
    eXo.core.IOUtil.emptyFolder(this.server.serverHome + "/temp");
  }
  return descriptor ;
}

JbossEar.prototype.preDeploy = function(product) {  
  product.addDependencies(new Project("commons-pool", "commons-pool", "jar", "1.2")) ;
  product.addDependencies(new Project("commons-dbcp", "commons-dbcp", "jar", "1.2.1")) ;	 
}

JbossEar.prototype.onDeploy = function(project) { }
  
JbossEar.prototype.postDeploy = function(product) {
  ServerUtil = eXo.server.ServerUtil ;
  ServerUtil.createEarApplicationXmlForJboss(this.deployWebappDir, product) ;
  ServerUtil.addClasspathForWar(this.deployLibDir) ;
  
  //Use jboss PrefixSorter deployer
  var eXoResourcesFile = new java.io.File(this.deployWebappDir + "/eXoResources.war");
  var neweXoResourcesFile = new java.io.File(this.deployWebappDir + "/01eXoResources.war");
  eXoResourcesFile.renameTo(neweXoResourcesFile) ;
  
  var portalFile = new java.io.File(this.deployWebappDir + "/" + product.portalwar);
  var newPortalFile = new java.io.File(this.deployWebappDir + "/02portal.war");
  portalFile.renameTo(newPortalFile) ;
  product.portalwar = "02portal.war" ;
}

eXo.server.JbossEar = JbossEar.prototype.constructor ;
