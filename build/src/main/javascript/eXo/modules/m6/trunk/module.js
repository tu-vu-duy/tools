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
  module.relativeMavenRepo = "org/exoplatform/m6" ;
  module.relativeSRCRepo = "M6/trunk" ;
  module.name = "m6" ;
  
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.m6", "m6.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "m6PortletWeb" ;
  
  module.web = {}
  module.web.m6Resources = new Project("org.exoplatform.m6", "m6.web.m6Resources", "war", module.version);
  module.web.m6Resources.deployName = "m6Resources" ;

  module.web.m6portal = 
    new Project("org.exoplatform.m6", "m6.web.portal", "exo-portal", version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  return module ;
}