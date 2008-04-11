eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

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
  var liveroom = Module.GetModule("liveroom/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal}) ;

  product.addDependencies(portal.web.portal) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  
  product.addDependencies(liveroom.eXoApplication.chat.webapp) ;
 // product.addDependencies(liveroom.eXoApplication.chat.service) ;

  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
  product.codeRepo = "liveroom/trunk" ;

  product.module = liveroom ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal ];
    
  return product ;
}