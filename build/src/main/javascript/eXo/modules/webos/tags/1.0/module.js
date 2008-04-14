eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;

  var module = new Module();

  module.version = "1.0" ;
  module.relativeMavenRepo =  "org/exoplatform/webos" ;
  module.relativeSRCRepo =  "webos/tags/1.0" ;
  module.name =  "webos" ;
                   
  module.web = {}
  module.web.webosportal = 
    new Project("org.exoplatform.webos", "exo.webos.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  return module;
}