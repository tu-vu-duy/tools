eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "eXoWCM" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "wcm/trunk" ;
  product.useWorkflow = true;
  product.workflowVersion = "trunk" ;
  product.serverPluginVersion = "trunk" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/trunk") ;
  var ws = Module.GetModule("ws/trunk");
  var core = Module.GetModule("core/trunk") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/trunk") ;
  var portal = Module.GetModule("portal/trunk", {kernel : kernel, core : core, ws:ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr ,ws : ws, portal : portal});
  var wcm = Module.GetModule("wcm/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal,ecm : ecm});
    
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;  
	product.addDependencies(portal.eXoGadgetServer) ;
	product.addDependencies(portal.eXoGadgets) ;
	product.addDependencies(portal.web.rest);
	
	product.addDependencies(ecm.portlet.ecm);
  product.addDependencies(ecm.portlet.workflow);   
  		 
  product.addDependencies(wcm.portlet.iweb);
  product.addDependencies(wcm.portlet.webpresentation);
  product.addDependencies(wcm.portlet.websearches); 
  product.addDependencies(wcm.web.eXoWCMResources) ;
  product.addDependencies(ecm.web.eXoECMResources) ;
  product.addDependencies(wcm.web.wcmportal) ;        
  
  product.addServerPatch("tomcat", ecm.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;  
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;

  product.module = wcm ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm];
    
  return product ;
}
