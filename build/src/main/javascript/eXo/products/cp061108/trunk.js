eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "cp061108" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp061108/project/trunk" ;
  product.useWorkflow = true;
  product.workflowVersion = "trunk" ;
  product.serverPluginVersion = "trunk" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.5") ;
  var core = Module.GetModule("core/tags/2.1.3") ;
  var ws = Module.GetModule("ws/tags/1.3.1", {kernel : kernel, core : core});
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.4", {kernel : kernel, core : core}) ;    
  var eXoJcr = Module.GetModule("jcr/tags/1.10.1", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr});
  var ecm = Module.GetModule("ecm/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ws : ws});
  var cp061108 = Module.GetModule("cp061108/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
    
  product.addDependencies(cp061108.web.portal) ; 
  product.addDependencies(cp061108.web.eXoResources) ;
  product.addDependencies(cp061108.portlet.web) ;
  
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.content) ;
  product.addDependencies(cs.web.csResources) ;
  
//  product.addDependencies(ecm.web.rest) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
  
  product.addDependencies(portal.web.rest) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.web.eXoResources) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoGadgetServer) ;
	product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(portal.web.eXoMacSkin) ;
  product.addDependencies(portal.web.eXoVistaSkin) ;

  product.addServerPatch("tomcat", cp061108.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = cp061108 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, cs];
    
  return product ;
}
