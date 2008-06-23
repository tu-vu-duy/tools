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
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/trunk") ;
  var portal = Module.GetModule("portal/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });  
 // var ecm = Module.GetModule("ecm/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var liveroom = Module.GetModule("liveroom/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal}) ;

  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(portal.web.rest) ;
  
  product.addDependencies(liveroom.eXoApplication.chat.webapp) ;
  product.addDependencies(liveroom.eXoApplication.videoconf.webapp) ;
  product.addDependencies(liveroom.eXoApplication.whiteboard.webapp) ;
  product.addDependencies(liveroom.web.liveroomportal) ;
  

  product.addServerPatch("tomcat",liveroom.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
  product.codeRepo = "liveroom/trunk" ;

  product.module = liveroom ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal ];
  
  return product ;
}
