function Jboss(jbossHome) {
  this.runningInstance_ = null ;
  this.name = "jboss" ;
  this.serverHome = jbossHome ;
  this.cleanServer = "jboss-5.0.28" ;
  this.deployLibDir = this.serverHome + "/common/lib" ;
  this.deployWebappDir = this.serverHome + "/webapps";
  this.patchDir = this.serverHome ;
}

eXo.server.Jboss = Jboss.prototype.constructor ;
