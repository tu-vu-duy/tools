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
  module.relativeMavenRepo =  "org/exoplatform/cp030408" ;
  module.relativeSRCRepo =  "cp030408/trunk" ;
  module.name = "cp030408" ;  

	module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cp030408", "cp030408.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "cp030408PortletWeb" ;
	
	module.web = {} ;
	module.web.eXoResources = new Project("org.exoplatform.cp030408", "cp030408.web.cp030408Resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp030408" ;
  
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cp030408", "cp030408.server.tomcat.patch", "jar", module.version);
  
  module.web.portal = 
    new Project("org.exoplatform.cp030408", "cp030408.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  return module;
}