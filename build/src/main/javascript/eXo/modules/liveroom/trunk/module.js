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

  module.eXoApplication.videoconf = {};
  module.eXoApplication.videoconf.webapp = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.videoconf.webapp", "war", module.version);
  module.eXoApplication.videoconf.webapp.deployName = "videoconf";

  module.eXoApplication.videoconf.service = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.videoconf.service", "war", module.version);
  module.eXoApplication.videoconf.service.deployName = "videoconf";

  module.eXoApplication.whiteboard = {};
  module.eXoApplication.whiteboard.webapp = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.whiteboard.webapp", "war", module.version);
  module.eXoApplication.whiteboard.webapp.deployName = "whiteboard";

  module.eXoApplication.whiteboard.service = new Project("org.exoplatform.liveroom", "exo.liveroom.eXoApplication.whiteboard.service", "war", module.version);
  module.eXoApplication.whiteboard.service.deployName = "whiteboard";
  
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
      tasks.add(deployRed5Server(server, this));
    }
  };

  return module ;
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
