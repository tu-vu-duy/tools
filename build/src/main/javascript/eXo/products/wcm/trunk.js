eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "eXoWCM" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "ecm/wcm/trunk" ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.5.2";
  product.workflowVersion = "1.0.4" ;
  product.serverPluginVersion = "2.5.6.1" ;
  
  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.8") ;
  var core = Module.GetModule("core/tags/2.1.6") ;
  var ws = Module.GetModule("ws/tags/1.3.4");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.7", {kernel : kernel, core : core}) ;    
  var eXoJcr = Module.GetModule("jcr/tags/1.10.5", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.6.1", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr});         
  var dms = Module.GetModule("ecm/dms/tags/2.5.2", {kernel : kernel, core : core,ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr , portal : portal});
  var wcm = Module.GetModule("ecm/wcm/trunk", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms});
    
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;  
	product.addDependencies(portal.eXoGadgetServer) ;
	product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(portal.web.rest);
	
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.gadgets);
  
  product.addDependencies(wcm.portlet.webpresentation);
  product.addDependencies(wcm.portlet.websearches); 
  product.addDependencies(wcm.portlet.newsletter); 
  product.addDependencies(wcm.portlet.formgenerator);
  product.addDependencies(wcm.web.eXoWCMResources) ;
  product.addDependencies(dms.web.eXoDMSResources) ;
  product.addDependencies(wcm.web.wcmportal) ;        
  
  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;  
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;

  product.module = wcm ;
  product.dependencyModule = [tool, kernel, core, ws, eXoPortletContainer, eXoJcr, portal, dms];
    
  return product ;
}
