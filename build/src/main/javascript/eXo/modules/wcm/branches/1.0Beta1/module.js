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

  module.version = "1.0Beta1" ;
  module.relativeMavenRepo =  "org/exoplatform/wcm" ;
  module.relativeSRCRepo =  "wcm/branches/1.0Beta1" ;
  module.name =  "wcm" ;
  
  module.portlet = {};
  
  module.portlet.webpresentation = 
    new Project("org.exoplatform.wcm", "exo.wcm.portlet.web-presentation", "exo-portlet", module.version).    
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.connector.fckeditor", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.component.wcm", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.webui.wcm", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.component.publication", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.ecm", "exo.ecm.webui.ecm", "jar",  module.version));
    
 module.portlet.websearches = 
    new Project("org.exoplatform.wcm", "exo.wcm.portlet.web-searches", "exo-portlet", module.version).    
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.component.wcm", "jar",  module.version)).
    addDependency(new Project("org.exoplatform.wcm", "exo.wcm.component.search", "jar",  module.version));
    
  module.portlet.iweb = 
    new Project("org.exoplatform.wcm", "exo.wcm.portlet.iweb", "exo-portlet", module.version);
    
      
  module.web = {};
  module.web.eXoWCMResources = 
    new Project("org.exoplatform.wcm", "exo.wcm.web.eXoWCMResources", "war", module.version);
    
  module.web.wcmportal = 
    new Project("org.exoplatform.wcm", "exo.wcm.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  return module;
}