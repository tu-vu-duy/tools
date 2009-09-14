eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var jcr = params.eXoJcr;
  var portal = params.portal;
  var module = new Module();

  module.version = "1.4.x" ;
  module.relativeMavenRepo =  "org/exoplatform/allinone" ;
  module.relativeSRCRepo =  "allinone/branches/1.4.x" ;
  module.name =  "allinone" ;
       
  module.web = {}
  module.web.allinoneportal = 
    new Project("org.exoplatform.allinone", "exo.allinone.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources).
    addDependency(portal.web.eXoMacSkin).
    addDependency(portal.web.eXoVistaSkin).
    addDependency(portal.webui.portal).
    addDependency(jcr.frameworks.command).
    addDependency(jcr.frameworks.web).
    addDependency(portal.web.rest);
  
  return module;
}
