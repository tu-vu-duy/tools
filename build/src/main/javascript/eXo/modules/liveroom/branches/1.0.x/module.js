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
  
  module.version = "1.0.x" ;
  module.relativeMavenRepo = "org/exoplatform/liveroom" ;
  module.relativeSRCRepo = "liveroom/branches/1.0.x" ;
  module.name = "liveroom" ;
  
  module.eXoApplication = {}
  module.eXoApplication.chat = {}
  module.eXoApplication.chat.webapp = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.chat.webapp", "war", module.version).
  	  addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.chat.service", "jar", module.version).
  		addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.organization.service", "jar", module.version)).
  		addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.organization.webapp", "war", module.version)).
      addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.organization.client.openfire", "jar", module.version)).
  		addDependency(new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.organization.webapp", "war", module.version)).
  		addDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3.1")).
  		addDependency(ws.frameworks.cometd).
  		addDependency(new Project("org.exoplatform.portal", "exo.portal.web.rest", "war", "2.2.1")).
  		addDependency(new Project("jabber.smack", "smack", "jar", "3.0.4")).
  		addDependency(new Project("jabber.smack", "smackx", "jar", "3.0.4")).
  		addDependency(new Project("org.jcrom", "jcrom", "jar", "1.2")).
      addDependency(new Project("commons-fileupload", "commons-fileupload", "jar", "1.0")).
	    addDependency(new Project("commons-io", "commons-io", "jar", "1.3")).
	    addDependency(new Project("log4j", "log4j", "jar", "1.2.12")).
		  addDependency(new Project("org.slf4j", "slf4j-api", "jar", "1.4.3")).
		  addDependency(new Project("org.slf4j", "slf4j-log4j12", "jar", "1.4.3"))
		  	
  	);
  module.eXoApplication.chat.webapp.deployName = "chat";

  module.eXoApplication.videoconf = {};
  module.eXoApplication.videoconf.webapp = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.videoconf.webapp", "war", module.version);
  module.eXoApplication.videoconf.webapp.deployName = "videoconf";

  module.eXoApplication.whiteboard = {};
  module.eXoApplication.whiteboard.webapp = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.whiteboard.webapp", "war", module.version);
  module.eXoApplication.whiteboard.webapp.deployName = "whiteboard";
  
  module.web = {};
  module.web.liveroomportal = 
    new Project("org.exoplatform.liveroom", "exo.liveroom.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
      addDependency(portal.web.eXoMacSkin) .
      addDependency(portal.web.eXoVistaSkin) .
      addDependency(portal.web.rest) .
	  addDependency(portal.webui.portal) .
      addDependency(jcr.frameworks.command) .
      addDependency(jcr.frameworks.web) ;
  module.web.webservice = new Project("org.exoplatform.liveroom", "exo.liveroom.web.webservice", "jar", module.version);
  module.web.liveroomResources = new Project("org.exoplatform.liveroom", "exo.liveroom.web.liveroomResources", "war", module.version);
  
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.liveroom", "exo.liveroom.server.tomcat.patch", "jar", module.version);

  /**
   * Configure and deploy Openfire, Red5 servers
   */
  module.configure = function(tasks, deployServers, serverMap) {
  	if (deployServers!==null) {
      var server = serverMap.get("tomcat");
      tasks.add(deployOpenfireServer(server, this));
      tasks.add(deployRed5Server(server, this));
    }
  };

  return module ;
}

function deployOpenfireServer(mainServer, module) {
	var deployServerTask = new TaskDescriptor("Release Dependency Task", eXo.env.dependenciesDir) ;
  var server = {};
  server.cleanServer = "openfire-3.4.5";
  server.name = "exo-openfire";
  server.serverHome = eXo.env.workingDir + "/" + server.name;
  server.deployLibDir = server.serverHome + "/lib";
  server.openfireJar = "exo.liveroom.eXoApplication.organization.client.openfire-" + module.version + ".jar" ;
  deployServerTask.description = "Deploy " + server.name + " ";
	deployServerTask.execute = function() {
    eXo.System.info("DELETE", "Delete " + server.serverHome);
    eXo.core.IOUtil.remove(server.serverHome);
		eXo.System.info("COPY", "Copy a clean server " + server.name);
		eXo.core.IOUtil.cp(eXo.env.dependenciesDir + "/" + server.cleanServer, server.serverHome);
    eXo.System.info("Gets the configuration file -in a buffer - of openfire (openfire.xml) from the library jar file");
		var configBuffer = eXo.core.IOUtil.getJarEntryContent(mainServer.deployLibDir+"/"+server.openfireJar, "openfire/openfire.xml") ;
		if (configBuffer===null) { eXo.System.info("ERROR", "Error retrieving config file from jar !"); return; }
		// writes the buffer into the configuration file (openfire/conf/openfire.xml)
		eXo.System.info("INFO", "Creating config file from buffer...");
		eXo.core.IOUtil.createFile(server.serverHome+"/conf/openfire.xml", configBuffer);
		// copies the exo openfire library to openfire server
		eXo.System.info("INFO", "Copying exo openfire library file...");
		eXo.core.IOUtil.cp(mainServer.deployLibDir + "/" + server.openfireJar, 
						           server.deployLibDir + "/" + server.openfireJar);
	}
	return deployServerTask ;
}

function deployRed5Server(mainServer, module) {
	var deployServerTask = new TaskDescriptor("Release Dependency Task", eXo.env.dependenciesDir) ;
  var server = {};
  server.name = "exo-red5";
  server.cleanServer = "red5-0.7.0";
  server.serverHome = eXo.env.workingDir + "/" + server.name;
  server.deployWebappDir = server.serverHome + "/webapps";
  deployServerTask.description = "Deploy " + server.name + " ";
	deployServerTask.execute = function() {
    eXo.System.info("DELETE", "Delete " + server.serverHome);
    eXo.core.IOUtil.remove(server.serverHome);
		eXo.System.info("COPY", "Copy a clean server " + server.name);
		eXo.core.IOUtil.cp(eXo.env.dependenciesDir + "/" + server.cleanServer, server.serverHome);
		eXo.System.info("eXo " + server.name + " applications file...");
    var whiteboard = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.whiteboard.service", "war", module.version);
    whiteboard.deployName = "whiteboard";
    whiteboard.deployTo(eXo.env.m2Repos, server);

    var videoconf = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.videoconf.service", "war", module.version);
    videoconf.deployName = "videoconf";
    videoconf.deployTo(eXo.env.m2Repos, server);
	}
	return deployServerTask ;
}
