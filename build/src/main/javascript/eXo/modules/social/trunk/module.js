eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;

  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/social" ;
  module.relativeSRCRepo =  "social/trunk" ;
  module.name = "social" ;  
	
	module.component = {} ;
	module.component.people = 
		new Project("org.exoplatform.social", "exo.social.component.people","jar", module.version);
	
	module.component.space = 
		new Project("org.exoplatform.social", "exo.social.component.space","jar", module.version);
	
	module.web = {} ;
  module.web.portal = 
    new Project("org.exoplatform.social", "exo.social.web.portal", "exo-portal", module.version).
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web);
	
	module.web.eXoResources = new Project("org.exoplatform.social", "exo.social.web.socialResources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesSocial" ;
	
	module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.social", "exo.social.server.tomcat.patch", "jar", module.version);
	
	module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.social", "exo.social.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "socialPortletWeb" ;
	
	return module;
}