eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "red5" ;
  //product.portalwar = "portal.war" ;
  product.codeRepo = "exo-int/red5/trunk" ;
 // product.useWorkflow = true;
  //product.workflowVersion = "2.0" ;
  product.serverPluginVersion = "trunk" ;

  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.4") ;
  var ws = Module.GetModule("ws/tags/1.3.1");
  var core = Module.GetModule("core/tags/2.1.3") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.2", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.9.3.1", {ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.2.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });  
  var liveroom = Module.GetModule("liveroom/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal}) ;

  var red5 = Module.GetModule("red5/trunk") ;
  
  product.addDependencies(liveroom.eXoApplication.videoconf.service) ;
  product.addDependencies(liveroom.eXoApplication.whiteboard.service) ;
  
  product.addServerPatch("red5-tomcat", red5.server.tomcat.patch) ;

  product.module = red5 ;
  product.dependencyModule = [];
    
  return product ;
}
