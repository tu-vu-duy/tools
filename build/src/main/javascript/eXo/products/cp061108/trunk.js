eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "cp061108" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp061108/project/trunk" ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.3";
//  product.useWorkflow = true;
  product.workflowVersion = "1.0" ;
  product.serverPluginVersion = "2.5.2" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.6") ;
  var core = Module.GetModule("core/tags/2.1.4") ;
  var ws = Module.GetModule("ws/tags/1.3.2", {kernel : kernel, core : core});
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.4", {kernel : kernel, core : core}) ;    
  var eXoJcr = Module.GetModule("jcr/tags/1.10.2", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.2", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr});
  var dms = Module.GetModule("ecm/dms/tags/2.3", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/tags/1.2RC1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ws : ws});
  var cp061108 = Module.GetModule("cp061108/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
   
  product.addDependencies(cp061108.web.portal) ; 
  product.addDependencies(cp061108.web.eXoResources) ;
  product.addDependencies(cp061108.portlet.web) ;
  
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.content) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  
  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;
  
//  product.addDependencies(ecm.web.rest) ;
  product.addDependencies(dms.portlet.dms);
//  product.addDependencies(ecm.portlet.workflow) ;
  product.addDependencies(dms.web.eXoDMSResources);
  
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
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms, cs];
    
  return product ;
}
