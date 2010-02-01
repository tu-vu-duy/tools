eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "company" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "company/tags/2.2" ;
  product.contentvalidationVersion = "2.3.2";
  product.workflowVersion = "1.0";
  product.serverPluginVersion = "2.5.3" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.7") ;
  var core = Module.GetModule("core/tags/2.1.5") ;
  var ws = Module.GetModule("ws/tags/1.3.3", {kernel : kernel, core : core});
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.6", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.4", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.3", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr});
  var dms = Module.GetModule("ecm/dms/tags/2.3.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/tags/1.2", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var webos = Module.GetModule("webos/tags/1.5", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ks = Module.GetModule("ks/tags/1.1", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var workflow = Module.GetModule("ecm/workflow/tags/1.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var company = Module.GetModule("company/tags/2.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms, ws : ws});
  var leadcapture = Module.GetModule("leadcapture/tags/2.1.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms, ws : ws});

  product.addDependencies(portal.web.rest) ;
  product.addDependencies(company.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;
  product.addDependencies(portal.eXoGadgetServer) ;
  product.addDependencies(portal.eXoGadgets) ;
    
  product.addDependencies(portal.web.eXoResources);
  product.addDependencies(portal.web.eXoMacSkin);
  product.addDependencies(portal.web.eXoVistaSkin);
  
  product.addDependencies(webos.web.webosResources);

  product.addDependencies(dms.web.eXoDMSResources);
  product.addDependencies(dms.gadgets);
  
  product.addDependencies(ks.eXoApplication.forum) ;
  product.addDependencies(ks.eXoApplication.faq) ;
  product.addDependencies(ks.eXoApplication.common) ;
  product.addDependencies(ks.web.webservice) ;
  product.addDependencies(ks.web.ksResources) ;

  
  product.addDependencies(cs.eXoApplication.mail) ;
  // replaced by "company.eXoApplication.calendar"
  //product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;
  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;
  
  product.addDependencies(company.eXoApplication.calendar) ;
  
  product.addDependencies(company.portlet.dms) ;
  product.addDependencies(company.component.web) ;
  product.addDependencies(company.web.portal) ;
  product.addDependencies(company.web.companyResources) ;
  product.addDependencies(company.portlet.web) ;
  product.addDependencies(company.application.rest) ;
  product.addDependencies(company.webui.eXo) ;
  
  product.addDependencies(workflow.web.eXoWorkflowResources);
  product.addDependencies(workflow.portlet.workflow);
  
  product.addDependencies(leadcapture.component.common) ;
  product.addDependencies(leadcapture.component.server) ;
  product.removeDependency(portal.webui.eXo);
  
    product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
    product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));
    product.removeDependency(new Project("rome", "rome", "jar", "0.8"));
    product.removeDependency(new Project("javax.mail", "mail", "jar", "1.4"));
    product.removeDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3.1"));
  
  product.addServerPatch("tomcat", company.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = company ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms, cs, ws];
  
  return product ;
}


