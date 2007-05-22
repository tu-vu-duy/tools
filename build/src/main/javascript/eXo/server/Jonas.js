function Jonas(jonasHome) {
  this.runningInstance_ = null ;
  this.name = "jonas" ;
  this.serverHome = jonasHome ;
  this.cleanServer = "jonas-5.0.28" ;
  this.deployLibDir = this.serverHome + "/common/lib" ;
  this.deployWebappDir = this.serverHome + "/webapps";
  this.patchDir = this.serverHome ;
}

eXo.server.Jonas = Jonas.prototype.constructor ;
