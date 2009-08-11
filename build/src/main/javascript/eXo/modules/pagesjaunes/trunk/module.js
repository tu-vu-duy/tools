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
  module.relativeMavenRepo =  "org/exoplatform/pagesjaunes" ;
  module.relativeSRCRepo =  "pagesjaunes/trunk" ;
  module.name =  "pagesjaunes" ;
  
  // module.portlet = {} ;
  // module.portlet.web = new Project("org.exoplatform.bpi", "bpi.portlet.web", "exo-portlet", module.version).
  		// addDependency(portal.portlet.web);
  // module.portlet.web.deployName = "web" ;
  
  module.web = {};
  module.web.PagesJaunesResources = 
    new Project("org.exoplatform.pagesjaunes", "pagesjaunes.web.PagesJaunesResources", "war", module.version);
        
  module.web.portal = 
    new Project("org.exoplatform.pagesjaunes", "pagesjaunes.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;
    
  return module;
}
