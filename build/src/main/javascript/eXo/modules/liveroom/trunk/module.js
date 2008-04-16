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
  
  module.version = "trunk" ;
  module.relativeMavenRepo = "org/exoplatform/liveroom" ;
  module.relativeSRCRepo = "liveroom/trunk" ;
  module.name = "liveroom" ;
  
  module.eXoApplication = {}
  module.eXoApplication.chat = {}
  module.eXoApplication.chat.webapp = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.chat.webapp", "war", "trunk").
  	addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.chat.service", "jar", "trunk").
  		addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.organization.service", "jar", "trunk")).
  		addDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "trunk")).
  		addDependency(new Project("org.exoplatform.ecm", "exo.ecm.web.rest", "war", "trunk")).
  		addDependency(new Project("jabber.smack", "smack", "jar", "3.0.4")).
  		addDependency(new Project("jabber.smack", "smackx", "jar", "3.0.4")).
  		addDependency(new Project("org.jcrom", "jcrom", "jar", "1.1"))
  	
  	);
  module.eXoApplication.chat.webapp.deployName = "exomessenger";
  

  return module ;
}