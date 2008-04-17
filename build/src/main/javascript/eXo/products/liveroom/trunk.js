eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.core.IOUtil") ;

function getProduct(version) {

  var product = new Product();
  product.name = "liveroom" ;
  product.portalwar = "portal.war" ;

  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/trunk") ;
  var ws = Module.GetModule("ws/trunk");
  var core = Module.GetModule("core/trunk") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk") ;
  var eXoJcr = Module.GetModule("jcr/trunk") ;
  var portal = Module.GetModule("portal/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });  
  var ecm = Module.GetModule("ecm/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var liveroom = Module.GetModule("liveroom/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal}) ;

  product.addDependencies(portal.web.portal) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  
  product.addDependencies(liveroom.eXoApplication.chat.webapp) ;

  product.addServerPatch("tomcat", ecm.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
  product.codeRepo = "liveroom/trunk" ;

  product.module = liveroom ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal ];
  
  /**
   * Copies and configures openfire for the specified servers
   */
  product.configure = function(tasks) {
  	if (deployServers===null) return;
  	print("Copies Openfire into Tomcat.");
    tasks.add(deployServer());
    tasks.add(configServer());
  };
    
  return product ;
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
		var configBuffer = eXo.core.IOUtil.getJarEntryContent(eXo.env.workingDir+"/exo-tomcat/lib/exo.liveroom.eXoApplication.organization.client.openfire-trunk.jar", "openfire/openfire.xml") ;
		if (configBuffer===null) { eXo.System.info("ERROR", "Error retrieving config file from jar !"); return; }
		eXo.System.info("INFO", "Creating config file from buffer...");
		eXo.core.IOUtil.createFile(eXo.env.workingDir+"/openfire.xml", configBuffer);
		eXo.System.info("INFO", "Copying config file...");
		eXo.core.IOUtil.cp(eXo.env.workingDir+"/openfire.xml", eXo.env.workingDir+"/exo-tomcat/jabber/conf");
		eXo.System.info("INFO", "Copying exo library file...");
		eXo.core.IOUtil.cp(eXo.env.workingDir+"/exo-tomcat/lib/exo.liveroom.eXoApplication.organization.client.openfire-trunk.jar", 
							eXo.env.workingDir+"/exo-tomcat/jabber/lib/exo.liveroom.eXoApplication.organization.client.openfire-trunk.jar");
	}
	return desc ;
}