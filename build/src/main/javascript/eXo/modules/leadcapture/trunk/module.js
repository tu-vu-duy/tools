eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ws = params.ws;
  var module = new Module();

  module.version =  "2.0.2-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/leadcapture" ;
  module.relativeSRCRepo =  "exo-int/delivery/lead-capture/trunk" ;
  module.name =  "leadcapture" ;
  
  module.component={}
  module.component.common = 
	new Project("org.exoplatform.leadcapture", "exo.leadcapture.common", "jar", module.version);
  module.component.client = 
	new Project("org.exoplatform.leadcapture", "exo.leadcapture.client", "jar", module.version).
    addDependency(module.component.common);
  module.component.server =
    new Project("org.exoplatform.leadcapture", "exo.leadcapture.server", "jar", module.version).
	addDependency(new Project("commons-validator", "commons-validator", "jar", "1.2.0")).
    addDependency(new Project("oro", "oro", "jar", "2.0.8")).
    addDependency(module.component.common);
  
  module.web = {}  
  module.web.clientportal = 
    new Project("org.exoplatform.leadcapture", "exo.leadcapture.web.client.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) .
    addDependency(new Project("commons-codec", "commons-codec", "jar", "1.3"));

  module.web.serverportal = 
    new Project("org.exoplatform.leadcapture", "exo.leadcapture.web.server.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) .
    addDependency(new Project("commons-codec", "commons-codec", "jar", "1.3"));
	
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.leadcapture", "exo.leadcapture.server.tomcat.patch", "jar", module.version);

  return module;
}