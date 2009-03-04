eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "cg38" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cg38/branches/2.0" ;
  product.useWorkflow = true;
  product.workflowVersion = "2.2" ;
  product.serverPluginVersion = "2.5.1" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.6") ;
  var core = Module.GetModule("core/tags/2.1.3") ;
  var ws = Module.GetModule("ws/tags/1.3.1");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.4", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.1", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/dms/tags/2.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  //var cs = Module.GetModule("cs/tags/1.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var wcm = Module.GetModule("ecm/wcm/tags/1.0", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm});
  var cg38 = Module.GetModule("cg38/branches/2.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm, wcm : wcm});
    
  product.addDependencies(cg38.web.cg38portal) ;
  product.addDependencies(cg38.web.cg38Resources) ;
  product.addDependencies(cg38.portlet.web) ;
  product.addDependencies(cg38.component.jcraction);
  product.addDependencies(cg38.component.cg38CategoriesService);
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;  
	product.addDependencies(portal.eXoGadgetServer) ;
	product.addDependencies(portal.eXoGadgets) ;
	product.addDependencies(portal.web.rest);
	
	product.addDependencies(ecm.portlet.ecm);
  product.addDependencies(ecm.portlet.workflow);   
  		 
  product.addDependencies(wcm.portlet.webpresentation);
  product.addDependencies(wcm.portlet.websearches); 
  product.addDependencies(wcm.web.eXoWCMResources) ;
  product.addDependencies(ecm.web.eXoECMResources) ;
  //product.addDependencies(wcm.web.wcmportal) ; 
    
  //product.addDependencies(cs.eXoApplication.content) ;   
  
  product.addServerPatch("tomcat", cg38.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = cg38 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, wcm];
    
  return product ;
}
