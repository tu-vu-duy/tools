eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var dms = params.dms;
  var ws = params.ws;
  var module = new Module();

  module.version =  "1.0.1" ;
  module.relativeMavenRepo =  "org/exoplatform/leadcapture" ;
  module.relativeSRCRepo =  "exo-int/delivery/lead-capture/tags/1.0.1" ;
  module.name =  "leadcapture" ;
  
  var dmsversion = "2.3.2" ;
    
  module.component={}
  module.component.client = 
	new Project("org.exoplatform.leadcapture", "exo.leadcapture.client", "jar", module.version);
  module.component.server =
    new Project("org.exoplatform.leadcapture", "exo.leadcapture.server", "jar", module.version).
	addDependency(new Project("commons-validator", "commons-validator", "jar", "1.2.0")).
    addDependency(new Project("oro", "oro", "jar", "2.0.8"));
  
  module.web = {}  
  module.web.portal = 
    new Project("org.exoplatform.leadcapture", "exo.leadcapture.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) .
    addDependency(module.component.server);

  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.leadcapture", "exo.leadcapture.server.tomcat.patch", "jar", module.version);

  return module;
}