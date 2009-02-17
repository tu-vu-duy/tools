eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eXocp040608Product" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp040608/branches/2.0" ;
  product.useWorkflow = true;
  product.workflowVersion = "2.2" ;
  product.serverPluginVersion = "2.5.1" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.5") ;
  var core = Module.GetModule("core/tags/2.1.3") ;
  var ws = Module.GetModule("ws/tags/1.3.1");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.4", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.1", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/dms/tags/2.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  
  var cp040608 = Module.GetModule("cp040608/branches/2.0", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm});
    
  product.addDependencies(portal.web.rest) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;
  product.addDependencies(portal.eXoGadgetServer) ;
  product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(portal.webui.portal);
  product.addDependencies(portal.web.eXoResources);
  
  //product.addDependencies(ecm.web.ecmportal) ;
  product.addDependencies(ecm.web.eXoECMResources) ;
  //product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;            
  
  product.addDependencies(cp040608.web.portal) ;
  product.addDependencies(cp040608.web.eXoResources) ;
  product.addDependencies(cp040608.portlet.web) ;
  product.addDependencies(cp040608.portlet.ecm) ;
  
  product.removeDependency(eXoPortletContainer.web.wsrp);

  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = cp040608 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm];
  
  return product;
}
