eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.core.IOUtil") ;

function getProduct(version) {

  var product = new Product();
  product.name = "liveroom" ;
  product.portalwar = "portal.war" ;

  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.4") ;
  var ws = Module.GetModule("ws/branches/1.3.3");
  var core = Module.GetModule("core/tags/2.1.3") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.2", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.9.3.1", {ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.2.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });  
  var liveroom = Module.GetModule("liveroom/branches/1.0.x", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal}) ;

  product.serverPluginVersion = portal.version;

  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(portal.web.rest) ;
  
  product.addDependencies(liveroom.eXoApplication.chat.webapp) ;
  product.addDependencies(liveroom.eXoApplication.videoconf.webapp) ;
  product.addDependencies(liveroom.eXoApplication.whiteboard.webapp) ;
  product.addDependencies(liveroom.web.liveroomportal) ;
  product.addDependencies(liveroom.web.webservice) ;
  product.addDependencies(liveroom.web.liveroomResources) ;
  

  product.addServerPatch("tomcat",liveroom.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
  product.codeRepo = "liveroom/branches/1.0.x" ;

  product.module = liveroom ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal ];
  
  return product ;
}
