eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var webos = params.webos;
  var dms = params.dms ;
  var workflow = params.workflow ;
  var wcm = params.wcm ;
  var cs = params.cs ;
  var ks = params.ks ;
  var ws = params.ws;
  var module = new Module();

  module.version = "1.5-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/allinone" ;
  module.relativeSRCRepo =  "allinone/branches/2.5.x" ;
  module.name =  "allinone" ;
       
  module.web = {}
  module.web.allinoneportal = 
    new Project("org.exoplatform.allinone", "exo.allinone.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources).
    addDependency(portal.web.eXoMacSkin).
    addDependency(portal.web.eXoVistaSkin).
    addDependency(portal.webui.portal).
    addDependency(jcr.frameworks.command).
    addDependency(jcr.frameworks.web).
    addDependency(portal.web.rest);

  module.tomcat = {}
  module.tomcat.patch =
    new Project("org.exoplatform.allinone", "aio-tomcat-patch", "jar", module.version);

  
  return module;
}
