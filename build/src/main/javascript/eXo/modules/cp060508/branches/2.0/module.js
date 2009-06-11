eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var ws = params.ws;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var wcm = params.wcm;

  var module = new Module();

  module.version = "2.0" ;
  module.relativeMavenRepo =  "org/exoplatform/cp060508" ;
  module.relativeSRCRepo =  "cp060508/branches/2.0" ;
  module.name =  "cp060508" ;  

	module.portlet = {} ;
  module.portlet.web = new Project("org.exoplatform.cp060508", "cp060508.portlet.web", "exo-portlet", module.version).
  	addDependency(new Project("org.exoplatform.cp060508", "cp060508.component.navigation", "jar",  module.version));
  module.portlet.web.deployName = "cp060508PortletWeb" ;

	module.skin = {};
	module.skin.web = new Project("org.exoplatform.cp060508", "cp060508.skin.web", "exo-portlet", module.version).
		addDependency(new Project("org.exoplatform.portal", "exo.portal.portlet.web", "exo-portlet", portal.version));
    module.skin.web.deployName = "web" ;
	
	module.skin.webpresentation = new Project("org.exoplatform.cp060508", "cp060508.skin.webpresentation", "exo-portlet", module.version).       
   	 	addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.connector.fckeditor", "jar",  wcm.version)).
   	 	addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.component.wcm", "jar",  wcm.version)).
  	  	addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.webui.wcm", "jar",  wcm.version)).
   		addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.component.publication", "jar",  wcm.version)).    
    	addDependency(ws.frameworks.json).
    	addDependency(jcr.frameworks.command).
    	addDependency(jcr.frameworks.web).
    	addDependency(portal.webui.portal);
    module.skin.webpresentation.deployName = "web-presentation" ;

    
 	module.skin.websearches = new Project("org.exoplatform.cp060508", "cp060508.skin.websearches", "exo-portlet", module.version).    
    	addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.component.wcm", "jar",  wcm.version)).
    	addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.component.search", "jar",  wcm.version));
	module.skin.websearches.deployName = "web-searches" ;


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
