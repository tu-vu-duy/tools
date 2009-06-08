eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;

  var module = new Module();

  module.version = "2.0" ;
  module.relativeMavenRepo =  "org/exoplatform/cp060508" ;
  module.relativeSRCRepo =  "cp060508/branches/2.0" ;
  module.name =  "cp060508" ;  

	module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cp060508", "cp060508.portlet.web", "exo-portlet", module.version).
  	addDependency(new Project("org.exoplatform.cp060508", "cp060508.component.navigation", "jar",  module.version));
  module.portlet.web.deployName = "cp060508PortletWeb" ;
	
	module.web = {} ;
	module.web.eXoResources = new Project("org.exoplatform.cp060508", "cp060508.web.cp060508Resources", "war", module.version);
    module.web.eXoResources.deployName = "eXoResourcesCp060508" ;

/*  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cp060508", "cp060508.server.tomcat.patch", "jar", module.version);

  */

  module.web.portal = 
    new Project("org.exoplatform.cp060508", "cp060508.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  return module;
}
