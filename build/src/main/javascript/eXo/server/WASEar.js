eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.server.ServerUtil") ;
eXo.require("eXo.projects.Project");

function WASEar(earHome) {
  this.runningInstance_ = null ;
  this.name = "ear" ;
  this.serverHome = earHome ;
  // using "[product.name]-[version].ear" in the EarTask of exobuild now;
  this.earFile = eXo.env.workingDir + "/exoplatform.ear" ;
  this.cleanServer = java.lang.System.getProperty("clean.server") ;
  if(this.cleanServer == null || this.cleanServer.equals("") || !this.cleanServer.startsWith("ear")) this.cleanServer = "ear" ;
  this.deployLibDir = this.serverHome ;
  this.deployWebappDir = this.serverHome ;
  this.patchDir = this.serverHome ;
}

WASEar.prototype.RunTask = function() {
  var descriptor =  new TaskDescriptor("Run Ear", this.serverHome + "/bin") ;
  descriptor.server = this;
  descriptor.execute = function() {

  }
  return descriptor ;
};
  
WASEar.prototype.StopTask = function() {
  var descriptor =  new TaskDescriptor("Stop Ear", this.serverHome + "/bin") ;
  descriptor.server = this;
  descriptor.execute = function() {

  }
  return descriptor ;
};

WASEar.prototype.CleanTask = function() {
  var descriptor = new TaskDescriptor("Clean Ear", this.serverHome + "/bin") ;
  descriptor.server = this;
  descriptor.execute = function() {
    eXo.core.IOUtil.emptyFolder(this.server.serverHome + "/temp");
  }
  return descriptor ;
}

WASEar.prototype.preDeploy = function(product) {
  // 1. Fix several library conflicts
  //product.removeDependency(new Project("apache-xerces", "xercesImpl", "jar", "2.9.1"));
  product.removeDependency(new Project("xerces", "xercesImpl", "jar", "2.9.1"));
  product.removeDependency(new Project("xml-apis", "xml-apis", "jar", "1.3.04"));
  product.addDependencies(new Project("javax.xml", "jaxp-api", "jar", "1.4.2")) ;
  product.addDependencies(new Project("com.sun.xml.parsers", "jaxp-ri", "jar", "1.4.2")) ;
  
  product.addDependencies(new Project("commons-pool", "commons-pool", "jar", "1.2")) ;
  product.addDependencies(new Project("commons-dbcp", "commons-dbcp", "jar", "1.2.1")) ;
}

WASEar.prototype.onDeploy = function(project) {
}
  
WASEar.prototype.postDeploy = function(product) {
  /*
   * WAR and XML files patches
   */
  ServerUtil = eXo.server.ServerUtil ;
  ServerUtil.createWASApplicationXml(this.deployWebappDir, product) ;
  ServerUtil.createWASIBMApplicationBndXmi(this.deployWebappDir, product) ;
  ServerUtil.addClasspathForWar(this.deployLibDir) ;
  ServerUtil.patchWASPortalWebXml(this.deployWebappDir, product) ;
  ServerUtil.patchWASServletMapping(this.deployWebappDir, product);
  ServerUtil.patchWASPortletDeployment(this.deployWebappDir);
  ServerUtil.patchWASWSRPStarterDefaultPort(this.deployWebappDir);
  ServerUtil.patchWASUserPortalConfigService(this.deployWebappDir, product);

}

eXo.server.WASEar = WASEar.prototype.constructor ;
