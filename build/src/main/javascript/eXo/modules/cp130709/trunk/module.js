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
  
  var module = new Module();

  module.version = "0.1-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/cp130709" ;
  module.relativeSRCRepo =  "cp130709/trunk" ;
  module.name =  "cp130709" ;
  
  module.portlet = {};
  module.portlet.strutsAlmerysPortlet = 
    new Project("org.exoplatform.cp130709", "cp130709.portlet.strutsAlmerysPortlet", "exo-portlet", module.version);
  
  module.web = {};
  module.web.resources = 
    new Project("org.exoplatform.cp130709", "cp130709.web.resources", "war", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin);
        
  module.web.portal = 
    new Project("org.exoplatform.cp130709", "cp130709.web.portal", "exo-portal", module.version);
    
    
  return module;
}
