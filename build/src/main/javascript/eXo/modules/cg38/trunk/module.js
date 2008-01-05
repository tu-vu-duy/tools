eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ecm = params.ecm;

  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/cg38" ;
  module.relativeSRCRepo =  "cg38/trunk" ;
  module.name =  "cg38" ;  
        
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cg38", "cg38.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "cg38PortletWeb" ;
        
  module.web = {}
  module.web.cg38portal = 
    new Project("org.exoplatform.cg38", "cg38.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
//    addDependency(portal.web.eXoMacSkin) .
//    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  return module;
}