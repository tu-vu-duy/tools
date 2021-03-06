eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eXoCp131008Product" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp131008/trunk" ;
  product.useWorkflow = true;
  product.workflowVersion = "trunk" ;
  product.serverPluginVersion = "trunk" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.3") ;
  var ws = Module.GetModule("ws/tags/1.2.1");
  var core = Module.GetModule("core/tags/2.1.2") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.3", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.9.3") ;
  var portal = Module.GetModule("portal/trunk", {kernel : kernel, core : core, ws:ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr ,ws : ws, portal : portal});
  var wcm = Module.GetModule("wcm/branches/1.0Beta1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal,ecm : ecm});
  var cp131008 = Module.GetModule("cp131008/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm});
    
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;
  //product.addDependencies(portal.eXoWidget.web) ;
	product.addDependencies(portal.eXoGadgetServer) ;
	product.addDependencies(portal.eXoGadgets) ;
	product.addDependencies(portal.web.rest);
  
  //product.addDependencies(ecm.web.rest) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;

  product.addDependencies(wcm.portlet.iweb);
  product.addDependencies(wcm.portlet.webpresentation);
  product.addDependencies(wcm.portlet.websearches); 
  product.addDependencies(wcm.web.eXoWCMResources) ;
  product.addDependencies(ecm.web.eXoECMResources) ;
  product.addDependencies(wcm.web.wcmportal) ;  

  product.addDependencies(cp131008.web.portal);
  product.addDependencies(cp131008.portlet.web);
  product.addDependencies(cp131008.web.eXoResources);
  
  product.removeDependency(eXoPortletContainer.web.wsrp);
  product.removeDependency(eXoPortletContainer.services.wsrp1);
  product.removeDependency(eXoPortletContainer.services.wsrp2);
  
  product.addServerPatch("tomcat", ecm.server.tomcat.patch) ;
//  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;

  product.module = cp131008 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, wcm];
  
  return product;
}
