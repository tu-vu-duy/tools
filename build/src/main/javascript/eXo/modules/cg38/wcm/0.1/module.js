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

  module.version = "0.1" ;
  module.relativeMavenRepo =  "org/exoplatform/wcm" ;
  module.relativeSRCRepo =  "cg38/wcm/0.1" ;
  module.name =  "wcm" ;
  
  module.portlet = {};
  
  module.portlet.webpresentation = 
    new Project("org.exoplatform.cg38", "exo.wcm.portlet.web-presentation", "exo-portlet", module.version).    
    addDependency(new Project("org.exoplatform.cg38", "exo.wcm.webui.wcm", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.cg38", "exo.wcm.connector.fckeditor", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.cg38", "exo.wcm.component.wcm", "jar",  module.version));
    
 module.portlet.websearches = 
    new Project("org.exoplatform.cg38", "exo.wcm.portlet.web-searches", "exo-portlet", module.version).
    addDependency(new Project("org.exoplatform.cg38", "exo.wcm.webui.wcm", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.cg38", "exo.wcm.component.wcm", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.cg38", "exo.wcm.component.search", "jar",  module.version));
      
  module.web = {};
  module.web.wcmResources = 
    new Project("org.exoplatform.cg38", "exo.wcm.web.wcmResources", "war", module.version);
    
  module.web.wcmportal = 
    new Project("org.exoplatform.cg38", "exo.wcm.web.portal", "exo-portal", module.version).        
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  return module;
}