eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "company" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "company/trunk" ;
  //product.useWorkflow = true ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.3";
  product.workflowVersion = "1.0";
  product.serverPluginVersion = "2.5.2" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.6") ;
  var core = Module.GetModule("core/tags/2.1.4") ;
  var ws = Module.GetModule("ws/tags/1.3.2");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.5", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.2", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.2", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var dms = Module.GetModule("ecm/dms/tags/2.3", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var ks = Module.GetModule("ks/tags/1.1-rc1", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var company = Module.GetModule("company/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms});
  
  product.addDependencies(portal.web.rest);
  product.addDependencies(portal.portlet.exoadmin);
  product.addDependencies(portal.portlet.web);
  //product.addDependencies(portal.portlet.dashboard);
  product.addDependencies(portal.eXoGadgetServer);
  product.addDependencies(portal.eXoGadgets);  
  
  //product.addDependencies(dms.web.dmsportal);
  product.addDependencies(dms.web.eXoDMSResources);
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.portlet.jcr_console);
  product.addDependencies(dms.gadgets);
  
  product.addDependencies(ks.eXoApplication.forum) ;
  product.addDependencies(ks.eXoApplication.faq) ;
  product.addDependencies(ks.eXoApplication.common) ;
  product.addDependencies(ks.web.ksResources) ;
  
  product.addDependencies(company.portlet.dms) ;
  product.addDependencies(company.component.web) ;
  product.addDependencies(company.web.portal) ;
  product.addDependencies(company.web.companyResources) ;
  product.addDependencies(company.portlet.web) ;
  product.addDependencies(company.application.rest) ;
  
  //product.addDependencies(workflow.portlet.workflow);

  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = company ;
  //product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms];
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms, workflow];
  
  return product ;
}
