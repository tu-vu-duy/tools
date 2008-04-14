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
  module.eXoApplication.chat.webapp = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.chat.webapp", "war", "0.1").
  	addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.chat.service", "jar", "0.1").
  		addDependency(new Project("jabber.smack", "smack", "jar", "3.0.4")).
  		addDependency(new Project("jabber.smack", "smackx", "jar", "3.0.4")).
  		addDependency(new Project("org.jcrom", "jcrom", "jar", "1.1"))
  	
  	);
  module.eXoApplication.chat.webapp.deployName = "exomessenger";
  

  return module ;
}