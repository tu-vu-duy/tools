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
  module.relativeMavenRepo =  "org/exoplatform/cp150208" ;
  module.relativeSRCRepo =  "cp150208/trunk" ;
  module.name =  "cp150208" ;  

		module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cp150208", "cp150208.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "cp150208PortletWeb" ;
	
		module.web = {} ;
		module.web.eXoResources = new Project("org.exoplatform.cp150208", "cp150208.web.cp150208Resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp150208" ;
  
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cp150208", "cp150208.server.tomcat.patch", "jar", module.version);
  
  module.web.portal = 
    new Project("org.exoplatform.cp150208", "cp150208.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  return module;
}