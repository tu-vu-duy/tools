eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "cp060508" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp060508/trunk" ;
  product.useWorkflow = true;
  product.workflowVersion = "2.0" ;
  product.serverPluginVersion = "2.1" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.1") ;
  var ws = Module.GetModule("ws/tags/1.1");
  var core = Module.GetModule("core/tags/2.0.2") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.8.3") ;
  var portal = Module.GetModule("portal/tags/2.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/branches/2.0.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/branches/1.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var cp060508 = Module.GetModule("cp060508/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
    
  product.addDependencies(cp060508.web.portal) ; 
  product.addDependencies(cp060508.web.eXoResources) ;
  product.addDependencies(cp060508.portlet.web) ;
  
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.web.csResources) ;
  
  product.addDependencies(ecm.web.rest) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.web.eXoResources) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(portal.web.eXoMacSkin) ;
  product.addDependencies(portal.web.eXoVistaSkin) ;

  product.addServerPatch("tomcat", cp060508.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = cp060508 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, cs];
    
  return product ;
}
