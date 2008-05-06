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
  
  module.version = "1.0" ;
  module.relativeMavenRepo = "org/exoplatform/liveroom" ;
  module.relativeSRCRepo = "liveroom/branches/1.0" ;
  module.name = "liveroom" ;
  
  module.eXoApplication = {}
  module.eXoApplication.chat = {}
  module.eXoApplication.chat.webapp = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.chat.webapp", "war", module.version).
  	  addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.chat.service", "jar", module.version).
  		addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.organization.service", "jar", module.version)).
  		addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.organization.webapp", "war", module.version)).
      addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.organization.client.openfire", "jar", module.version)).
  		addDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "trunk")).
  		addDependency(new Project("org.exoplatform.ecm", "exo.ecm.web.rest", "war", "2.0")).
  		addDependency(new Project("jabber.smack", "smack", "jar", "3.0.4")).
  		addDependency(new Project("jabber.smack", "smackx", "jar", "3.0.4")).
  		addDependency(new Project("org.jcrom", "jcrom", "jar", "1.1"))  	
  	);
  module.eXoApplication.chat.webapp.deployName = "chat";
  
  module.web = {};
  module.web.liveroomportal = 
    new Project("org.exoplatform.liveroom", "exo.liveroom.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
      addDependency(portal.web.eXoMacSkin) .
      addDependency(portal.web.eXoVistaSkin) .
	  addDependency(portal.webui.portal) .
      addDependency(jcr.frameworks.command) .
      addDependency(jcr.frameworks.web) ;
  
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.liveroom", "exo.liveroom.server.tomcat.patch", "jar", module.version);


  /**
   * Copies and configures openfire
   */
  module.configure = function(tasks, deployServers) {
  	// TODO : use less hardcoded values; create variables
  	if (deployServer!==null) {
	  	var servers = deployServers.iterator();
	    while (servers.hasNext()) {
	    	server = servers.next();
	    	tasks.add(deployServer(server));
	    	tasks.add(configServer(server));
	    }
  	}
  };

  return module ;
}

function deployServer(server) {
	var descriptor = new TaskDescriptor("Release Dependency Task", eXo.env.dependenciesDir) ;
	descriptor.description = "Copies Openfire from "+eXo.env.dependenciesDir+" to "+eXo.env.workingDir;
	descriptor.execute = function() {
		eXo.System.info("INFO", "Copying Openfire...");
		eXo.core.IOUtil.cp(eXo.env.dependenciesDir + "/openfire", server.serverHome+"/jabber");
	}
	return descriptor ;
}

function configServer(server) {
	var desc = new TaskDescriptor("Copy Openfire configuration", eXo.env.workingDir) ;
  desc.openfireJar = "exo.liveroom.eXoApplication.organization.client.openfire-1.0.jar" ;
	desc.execute = function() {
		// gets the configuration file -in a buffer - of openfire (openfire.xml) from the library jar file
		var configBuffer = eXo.core.IOUtil.getJarEntryContent(server.deployLibDir+"/"+this.openfireJar, "openfire/openfire.xml") ;
		if (configBuffer===null) { eXo.System.info("ERROR", "Error retrieving config file from jar !"); return; }
		// writes the buffer into the configuration file (openfire/conf/openfire.xml)
		eXo.System.info("INFO", "Creating config file from buffer...");
		eXo.core.IOUtil.createFile(server.serverHome+"/jabber/conf/openfire.xml", configBuffer);
		// copies the exo openfire library to openfire server
		eXo.System.info("INFO", "Copying exo openfire library file...");
		eXo.core.IOUtil.cp(server.deployLibDir+"/"+this.openfireJar, 
						           server.serverHome+"/jabber/lib/"+this.openfireJar);
	}
	return desc ;
}
