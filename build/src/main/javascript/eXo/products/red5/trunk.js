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
  var kernel = Module.GetModule("kernel/trunk") ;
  var ws = Module.GetModule("ws/trunk");
  var core = Module.GetModule("core/trunk") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/trunk") ;
  var portal = Module.GetModule("portal/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });  
  var liveroom = Module.GetModule("liveroom/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal}) ;

    var red5 = Module.GetModule("red5/trunk") ;
    
    
    product.addDependencies(liveroom.videoconf.server) ;
    
    product.addServerPatch("tomcat", red5.server.tomcat.patch) ;

  product.module = red5 ;
  product.dependencyModule = [];
    
  return product ;
}
