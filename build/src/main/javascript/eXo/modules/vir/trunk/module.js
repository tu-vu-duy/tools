eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var ws = params.ws;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var dms = params.dms; 
  var wcm = params.wcm; 
  
  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/vir" ;
  module.relativeSRCRepo =  "vir/source/trunk" ;
  module.name =  "vir" ;
  
  module.web = {};
  
  module.web.VIRResources = 
    new Project("org.exoplatform.vir", "vir.web.VIRResources", "war", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin);
        
  module.web.portal = 
    new Project("org.exoplatform.vir", "vir.web.portal", "exo-portal", module.version);
    
  return module;
}
