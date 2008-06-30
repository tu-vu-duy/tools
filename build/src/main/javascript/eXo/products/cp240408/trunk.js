eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "cp240408" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp240408/trunk" ;
  product.useWorkflow = false;
  product.serverPluginVersion = "2.0.2" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.1") ;
  var ws = Module.GetModule("ws/tags/1.1");
  var core = Module.GetModule("core/tags/2.0.2") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0rc5", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.8.3") ;
  var portal = Module.GetModule("portal/branches/2.0.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var webos = Module.GetModule("webos/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal });
  var cp240408 = Module.GetModule("cp240408/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, webos : webos});
    
//  product.addDependencies(cp240408.component.service.bonita) ;
  product.addDependencies(cp240408.component.navigation) ;
  product.addDependencies(cp240408.web.bpmportal) ;
  product.addDependencies(cp240408.web.eXoResources) ;
  
  product.addDependencies(cp240408.portlet.bonita) ;
  product.addDependencies(cp240408.portlet.orchestra) ;
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(portal.web.eXoMacSkin) ;
  product.addDependencies(portal.web.eXoVistaSkin) ;
  
  product.addDependencies(ecm.web.rest) ;
  
  product.addServerPatch("tomcat", cp240408.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = cp240408 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, webos];
    
  return product ;
}
