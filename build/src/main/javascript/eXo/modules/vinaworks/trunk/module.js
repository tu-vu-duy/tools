eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {
	var jcr = params.eXoJcr;
	var portal = params.portal;
	var module = new Module();
	
  module.version =  "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/vinaworks" ;
  module.relativeSRCRepo =  "vinaworks/trunk" ;
  module.name =  "vinaworks" ;
  
  module.web = {};
  module.web.portal = 
    new Project("org.exoplatform.vinaworks", "exo.vinaworks.web.portal", 
                "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web);	
	return module;
}