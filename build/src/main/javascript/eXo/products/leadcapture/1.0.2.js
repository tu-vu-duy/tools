eXo.require("eXo.projects.Module");
eXo.require("eXo.projects.Product");

function getProduct(version) {
  var product = new Product();
  
  product.name = "eXoLeadCapture";
  product.portalwar = "portal.war";
  product.codeRepo = "exo-int/delivery/lead-capture/tags/1.0.2";
  product.useContentvalidation = true;
  product.serverPluginVersion = "2.5.3";
    
  var tool =  Module.GetModule("tools/trunk");
  var kernel = Module.GetModule("kernel/tags/2.0.7");
  var core = Module.GetModule("core/tags/2.1.5");
  var ws = Module.GetModule("ws/tags/1.3.3");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.6", {kernel : kernel, core : core});
  var eXoJcr = Module.GetModule("jcr/tags/1.10.4", {kernel : kernel, core : core, ws : ws});
  var portal = Module.GetModule("portal/tags/2.5.3", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var dms = Module.GetModule("ecm/dms/tags/2.3.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var leadcapture = Module.GetModule("leadcapture/tags/1.0.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms, ws : ws});

  
  product.addDependencies(portal.web.rest);
  
  product.addDependencies(leadcapture.web.portal) ;
  product.addDependencies(leadcapture.component.client) ;
  
  product.addDependencies(dms.web.eXoDMSResources);
  product.addDependencies(portal.portlet.exoadmin);
  product.addDependencies(portal.portlet.web);
  product.addDependencies(portal.portlet.dashboard);
  product.addDependencies(portal.eXoGadgetServer);
  product.addDependencies(portal.eXoGadgets);
  
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.portlet.jcr_console);
  product.addDependencies(dms.gadgets);
    
  product.addServerPatch("tomcat", leadcapture.server.tomcat.patch);
  
  product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));
  product.removeDependency(new Project("rome", "rome", "jar", "0.8"));

  product.module = dms;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal];

  return product;
}