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
  		addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.organization.webapp", "war", "trunk")).
  		addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.organization.client.openfire", "jar", "trunk")).
  		addDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "trunk")).
  		addDependency(new Project("org.exoplatform.ecm", "exo.ecm.web.rest", "war", "trunk")).
  		addDependency(new Project("jabber.smack", "smack", "jar", "3.0.4")).
  		addDependency(new Project("jabber.smack", "smackx", "jar", "3.0.4")).
  		addDependency(new Project("org.jcrom", "jcrom", "jar", "1.1"))
  	
  	);
  module.eXoApplication.chat.webapp.deployName = "exomessenger";
  
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.liveroom", "exo.liveroom.server.tomcat.patch", "jar", "trunk");


  /**
   * Copies and configures openfire
   */
  module.configure = function(tasks) {
  	// TODO : use less hardcoded values; create variables
    tasks.add(deployServer());
    tasks.add(configServer());
  };

  return module ;
}

function deployServer() {
	var descriptor = new TaskDescriptor("Release Dependency Task", eXo.env.dependenciesDir) ;
	descriptor.description = "Copies Openfire from "+eXo.env.dependenciesDir+" to "+eXo.env.workingDir;
	descriptor.execute = function() {
		eXo.System.info("INFO", "Copying Openfire...");
		eXo.core.IOUtil.cp(eXo.env.dependenciesDir + "/openfire", eXo.env.workingDir+"/exo-tomcat/jabber");
	}
	return descriptor ;
}

function configServer() {
	var desc = new TaskDescriptor("Copy Openfire configuration", eXo.env.workingDir) ;
	desc.execute = function() {
		// gets the configuration file -in a buffer - of openfire (openfire.xml) from the library jar file
		var configBuffer = eXo.core.IOUtil.getJarEntryContent(eXo.env.workingDir+"/exo-tomcat/lib/exo.liveroom.eXoApplication.organization.client.openfire-trunk.jar", "openfire/openfire.xml") ;
		if (configBuffer===null) { eXo.System.info("ERROR", "Error retrieving config file from jar !"); return; }
		// writes the buffer into the configuration file (openfire/conf/openfire.xml)
		eXo.System.info("INFO", "Creating config file from buffer...");
		eXo.core.IOUtil.createFile(eXo.env.workingDir+"/exo-tomcat/jabber/conf/openfire.xml", configBuffer);
		// copies the exo openfire library to openfire server
		eXo.System.info("INFO", "Copying exo library file...");
		eXo.core.IOUtil.cp(eXo.env.workingDir+"/exo-tomcat/lib/exo.liveroom.eXoApplication.organization.client.openfire-trunk.jar", 
						eXo.env.workingDir+"/exo-tomcat/jabber/lib/exo.liveroom.eXoApplication.organization.client.openfire-trunk.jar");
	}
	return desc ;
}