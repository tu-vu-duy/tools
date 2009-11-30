eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eXoIntranetProduct" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "intranet/tags/2.0" ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.5.2";
//  product.useWorkflow = true;
  product.workflowVersion = "1.0.4";
  product.serverPluginVersion = "2.5.6.1" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.8") ;
  var core = Module.GetModule("core/tags/2.1.6") ;
  var ws = Module.GetModule("ws/tags/1.3.4");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.7", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.5", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.6.1", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var workflow = Module.GetModule("ecm/workflow/tags/1.0.4", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var dms = Module.GetModule("ecm/dms/tags/2.5.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var intranet = Module.GetModule("intranet/tags/2.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  
  product.addDependencies(intranet.web.resources) 
  product.addDependencies(intranet.web.portal) ;
  product.addDependencies(intranet.component.ldap) ;
  product.addDependencies(intranet.component.organization) ;

  product.addDependencies(portal.web.rest);
  product.addDependencies(dms.web.dmsportal);
  product.addDependencies(dms.web.eXoDMSResources);
  product.addDependencies(portal.portlet.exoadmin);
  product.addDependencies(portal.portlet.web);
  product.addDependencies(portal.portlet.dashboard);
  product.addDependencies(portal.eXoGadgetServer);
  product.addDependencies(portal.eXoGadgets);
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.portlet.jcr_console);
  product.addDependencies(dms.gadgets);
  
  product.addDependencies(workflow.web.eXoWorkflowResources);
  product.addDependencies(workflow.portlet.workflow);
    
  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;

  product.module = intranet ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms];
  
  return product;
}
