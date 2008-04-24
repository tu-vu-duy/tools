eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;

  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/cp240408" ;
  module.relativeSRCRepo =  "cp240408/trunk" ;
  module.name =  "cp240408" ;  

	
		module.web = {} ;
		module.web.eXoResources = new Project("org.exoplatform.cp240408", "cp240408.web.cp240408Resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp240408" ;
  


  return module;
}