eXo.require("eXo.projects.Module");
eXo.require("eXo.projects.Product");

function getProduct(version) {
  var product = new Product();
  
  product.name = "eXoLeadCapture-Server";
  product.portalwar = "portal.war";
  product.codeRepo = "exo-int/delivery/lead-capture/tags/2.1.1";
  product.useContentvalidation = true;
  product.serverPluginVersion = "2.5.6.1";
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.8") ;
  var core = Module.GetModule("core/tags/2.1.6") ;
  var ws = Module.GetModule("ws/tags/1.3.4");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.7", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.5", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.6.1", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var dms = Module.GetModule("ecm/dms/tags/2.5.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var leadcapture = Module.GetModule("leadcapture/tags/2.1.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ws : ws});

  
  product.addDependencies(portal.portlet.exoadmin);
  product.addDependencies(portal.portlet.web);
  product.addDependencies(portal.portlet.dashboard);
  product.addDependencies(portal.eXoGadgetServer);
  product.addDependencies(portal.web.rest);
  product.addDependencies(dms.web.eXoDMSResources);
  product.addDependencies(portal.portlet.exoadmin);
  product.addDependencies(portal.portlet.web);
  product.addDependencies(portal.portlet.dashboard);
  product.addDependencies(portal.eXoGadgetServer);
  product.addDependencies(portal.eXoGadgets);  
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.portlet.jcr_console);
  product.addDependencies(dms.gadgets);

  product.addDependencies(leadcapture.component.common) ;
  product.addDependencies(leadcapture.component.server) ;
  product.addDependencies(leadcapture.web.serverportal) ;

  product.addServerPatch("tomcat", leadcapture.server.tomcat.patch);

  product.module = leadcapture;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal];

  return product;
}