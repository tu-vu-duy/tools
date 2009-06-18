eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eXocp040608Product" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp040608/branches/2.0" ;
  product.useWorkflow = true;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.3";
  product.workflowVersion = "1.0" ;
  product.serverPluginVersion = "2.5.2" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.6") ;
  var core = Module.GetModule("core/tags/2.1.5") ;
  var ws = Module.GetModule("ws/tags/1.3.2");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.4", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.2", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.2", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/dms/tags/2.3", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var workflow = Module.GetModule("ecm/workflow/tags/1.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/tags/1.2", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var ks = Module.GetModule("ks/tags/1.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var cp040608 = Module.GetModule("cp040608/branches/2.0", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm, cs : cs});
      /* Portal dependencies */

  product.addDependencies(portal.web.rest) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;
  product.addDependencies(portal.eXoGadgetServer) ;
  product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(portal.webui.portal);
  product.addDependencies(portal.web.eXoResources);
  
  /* ECM dependencies */
  
  product.addDependencies(ecm.web.eXoDMSResources) ;
  product.addDependencies(ecm.portlet.jcr_console);
  product.addDependencies(ecm.gadgets);
  //product.addDependencies(ecm.portlet.ecm) ; now comes from cp040608
  product.addDependencies(workflow.web.eXoWorkflowResources);
  product.addDependencies(workflow.portlet.workflow) ;            
  
  /* CS dependencies */
  
  product.addDependencies(cs.eXoApplication.mail) ;
//  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;

  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;
  
  /* KS dependencies */
  
  product.addDependencies(ks.eXoApplication.forum) ;
  product.addDependencies(ks.eXoApplication.faq) ;
  product.addDependencies(ks.eXoApplication.common) ;
  
  product.addDependencies(ks.web.webservice) ;
  product.addDependencies(ks.web.ksResources) ;

  /* CP040608 dependencies */

  product.addDependencies(cp040608.web.portal) ;
  product.addDependencies(cp040608.web.eXoResources) ;
  product.addDependencies(cp040608.portlet.web) ;
  product.addDependencies(cp040608.portlet.ecm) ;
  product.addDependencies(cp040608.portlet.calendar) ;

  // */
  
  product.removeDependency(eXoPortletContainer.web.wsrp);

  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = cp040608 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, workflow, cs, ks];
  
  return product;
}
