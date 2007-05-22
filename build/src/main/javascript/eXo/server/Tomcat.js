function Tomcat(tomcatHome) {
  this.runningInstance_ = null ;
  this.name = "tomcat" ;
  this.serverHome = tomcatHome ;
  this.cleanServer = "tomcat-5.0.28" ;
  this.deployLibDir = this.serverHome + "/common/lib" ;
  this.deployWebappDir = this.serverHome + "/webapps";
  this.patchDir = this.serverHome ;
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


eXo.server.Tomcat = Tomcat.prototype.constructor ;
