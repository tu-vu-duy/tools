eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var webos = params.webos;
  var dms = params.dms ;
  var workflow = params.workflow ;
//  var wcm = params.wcm ;
  var cs = params.cs ;
  var ks = params.ks ;
  var ws = params.ws;
  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/vinaworks" ;
  module.relativeSRCRepo =  "vinaworks/trunk" ;
  module.name =  "vinaworks" ;
       
  module.web = {}
  module.web.vinaworksResources = 
    new Project("org.exoplatform.vinaworks", "vinaworks.web.eXoResourcesVinaworks", "war", module.version) ;    
//    module.web.vinaworksResources.deployName = "zvinaworksResources" ;

  module.web.vinaworkswebos = 
    new Project("org.exoplatform.vinaworks", "vinaworks.web.vinaworkswebos", "war", module.version);   


  module.web.vinaworksportal = 
    new Project("org.exoplatform.vinaworks", "exo.vinaworks.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources).
    addDependency(portal.web.eXoMacSkin).
    addDependency(portal.web.eXoVistaSkin).
    addDependency(portal.webui.portal).
    addDependency(jcr.frameworks.command).
    addDependency(jcr.frameworks.web).
    addDependency(portal.web.rest);
    

  module.jcr = {}
  module.jcr.ext = 
    new Project("org.exoplatform.vinaworks", "exo.vinaworks.jcr.component.ext", "jar", module.version);
  
  return module;
}
