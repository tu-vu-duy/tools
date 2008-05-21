eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;

  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/webos" ;
  module.relativeSRCRepo =  "webos/trunk" ;
  module.name =  "webos" ;
                   
  module.web = {}
  module.web.webosResources = 
  	new Project("org.exoplatform.webos", "exo.webos.web.webosResources", "war", module.version) ;
  module.web.webosportal = 
    new Project("org.exoplatform.webos", "exo.webos.web.portal", "exo-portal", module.version).
    addDependency(portal.webui.portal) .
  	addDependency(portal.web.eXoResources).
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin).
    addDependency(jcr.frameworks.web).
    addDependency(jcr.frameworks.command) ;

  return module;
}