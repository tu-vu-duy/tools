eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "cp060508" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp060508/branches/2.0" ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.3.1";
  product.workflowVersion = "1.0.1" ;
  product.serverPluginVersion = "2.5.3" ;
  
  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.7") ;
  var core = Module.GetModule("core/tags/2.1.5") ;
  var ws = Module.GetModule("ws/tags/1.3.3");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.6", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.3", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.3", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr}); 
  var dms = Module.GetModule("ecm/dms/tags/2.3.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var wcm = Module.GetModule("ecm/wcm/tags/1.1rc3", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms});
  var cs = Module.GetModule("cs/tags/1.2.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var cp060508 = Module.GetModule("cp060508/branches/2.0", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});


  /* CG95 modules */    
  product.addDependencies(cp060508.web.portal) ; 
  product.addDependencies(cp060508.web.eXoResources) ;
  product.addDependencies(cp060508.portlet.web) ;
 
  /* CS modules */
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;    
  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;

  /* Portal modules */
  product.addDependencies(portal.web.rest) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;
  product.addDependencies(portal.eXoGadgetServer) ;
  product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(portal.webui.portal);
   
  product.addDependencies(portal.web.eXoResources);
  product.addDependencies(portal.web.eXoMacSkin) ;
  product.addDependencies(portal.web.eXoVistaSkin) ;
        
  /* DMS modules */
  product.addDependencies(dms.web.eXoDMSResources);
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.portlet.jcr_console);
  product.addDependencies(dms.gadgets);

  /* WCM modules */
  product.addDependencies(wcm.portlet.webpresentation);
  product.addDependencies(wcm.portlet.websearches);
  product.addDependencies(wcm.web.eXoWCMResources) ;

  /* Server patches */
  product.addServerPatch("tomcat",  portal.server.tomcat.patch) ; 
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = cp060508 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms, wcm, cs];
    
  return product ;
}
