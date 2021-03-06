eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;

  var module = new Module();

  module.version = "1.5.3.1" ;
  module.relativeMavenRepo =  "org/exoplatform/webos" ;
  module.relativeSRCRepo =  "webos/tags/1.5.3.1" ;
  module.name =  "webos" ;
                   
  module.web = {}
  module.web.webosResources = 
  	new Project("org.exoplatform.webos", "exo.webos.web.webosResources", "war", module.version) ;
  module.web.webosportal = 
    new Project("org.exoplatform.webos", "exo.webos.web.portal", "exo-portal", module.version).
    addDependency(jcr.frameworks.web).
    addDependency(jcr.frameworks.command) ;

  return module;
}