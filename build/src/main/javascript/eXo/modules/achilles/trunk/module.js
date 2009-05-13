eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

/*  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;*/
  var jcr = params.eXoJcr;
  var portal = params.portal;
  
  var module = new Module();

  module.version =  "2.0" ;
  module.relativeMavenRepo =  "org/exoplatform/achilles" ;
  module.relativeSRCRepo =  "achilles/trunk" ;
  module.name = "achilles" ;

  module.web = {};
 
  module.web.portal = 
    new Project("org.exoplatform.achilles", "achilles.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web);


  return module;
}
