eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var ws = params.ws;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ecm = params.ecm;  
  
  var module = new Module();

  module.version = "1.0" ;
  module.relativeMavenRepo =  "org/exoplatform/wcm" ;
  module.relativeSRCRepo =  "ecm/wcm/tags/1.0" ;
  module.name =  "wcm" ;
  
  module.portlet = {};
  
  module.portlet.webpresentation = 
    new Project("org.exoplatform.wcm", "exo.wcm.portlet.web-presentation", "exo-portlet", module.version).       
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.connector.fckeditor", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.component.wcm", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.webui.wcm", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.component.publication", "jar",  module.version)).    
    addDependency(ws.frameworks.json) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web).
    addDependency(portal.webui.portal);
    
 module.portlet.websearches = 
    new Project("org.exoplatform.wcm", "exo.wcm.portlet.web-searches", "exo-portlet", module.version).    
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.component.wcm", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.component.search", "jar",  module.version));
    
  module.web = {};
  module.web.eXoWCMResources = 
    new Project("org.exoplatform.wcm", "exo.wcm.web.eXoWCMResources", "war", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin);
        
  module.web.wcmportal = 
    new Project("org.exoplatform.wcm", "exo.wcm.web.portal", "exo-portal", module.version);
    
  return module;
}