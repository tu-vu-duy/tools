eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ecm = params.ecm ;
  var cs = params.cs ;
  var ws = params.ws;
  var module = new Module();

  module.version = "2.0" ;
  module.relativeMavenRepo =  "org/exoplatform/ultimate" ;
  module.relativeSRCRepo =  "ultimate/branches/2.0" ;
  module.name =  "ultimate" ;
       
  module.web = {}
  module.web.ultimateportal = 
    new Project("org.exoplatform.ultimate", "exo.ultimate.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(cs.web.csResources) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web).
    addDependency(ecm.web.rest);
    

  return module;
}
