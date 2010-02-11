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
  product.workflowVersion = "1.0.4" ;
  product.serverPluginVersion = "2.5.2.SC_10" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.9") ;
  var core = Module.GetModule("core/tags/2.1.7") ;
  var ws = Module.GetModule("ws/tags/1.3.5");
  var eXoPortletContainer = Module.GetModule("cp040608/patches/portlet-container/tags/2.0.4.SC_2", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("cp040608/patches/JCR/tags/1.10.6.SC_1", {kernel : kernel, core : core, ws : ws}) ;
  var webos = Module.GetModule("webos/tags/1.5", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var portal = Module.GetModule("cp040608/patches/portal/tags/2.5.2.SC_10", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("cp040608/patches/ecm/dms/tags/2.3.0.SC_17", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var workflow = Module.GetModule("ecm/workflow/tags/1.0.4", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var ks = Module.GetModule("cp040608/patches/ks/tags/KS.1.1.2.SC_11", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var cp040608 = Module.GetModule("cp040608/branches/2.0", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm, workflow : workflow});
    
  /* Portal dependencies */

  product.addDependencies(portal.web.rest) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;
  product.addDependencies(portal.eXoGadgetServer) ;
  product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(portal.webui.portal);
  product.addDependencies(portal.web.eXoResources);
  product.addDependencies(webos.web.webosResources);
  
  /* ECM dependencies */
  
  product.addDependencies(ecm.web.eXoDMSResources) ;
  product.addDependencies(ecm.portlet.jcr_console);
  product.addDependencies(ecm.gadgets);
  //product.addDependencies(ecm.portlet.ecm) ; now comes from cp040608
  product.addDependencies(workflow.web.eXoWorkflowResources);
  product.addDependencies(workflow.portlet.workflow) ;            

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
  // */
  
  product.removeDependency(eXoPortletContainer.web.wsrp);

  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));
  product.removeDependency(new Project("rome", "rome", "jar", "0.8"));
  
  product.module = cp040608 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, workflow, ks, webos];
  
  return product;
}
