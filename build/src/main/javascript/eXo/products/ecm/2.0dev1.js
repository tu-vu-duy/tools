eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "eXoECM" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "ecm/branches/2.0" ;
  product.useWorkflow = true;
  product.workflowVersion = "2.0" ;
  product.serverPluginVersion = "2.0" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0") ;
  var core = Module.GetModule("core/branches/2.1") ;
  var ws = Module.GetModule("ws/tags/1.1");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0rc5") ;
  var eXoJcr = Module.GetModule("jcr/branches/1.9") ;
  var portal = Module.GetModule("portal/branches/2.0.1", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/branches/2.0", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
    
  product.addDependencies(ecm.web.ecmportal) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(ecm.web.rest) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
    
  product.addDependencies(portal.eXoWidget.web) ;
  
  product.addServerPatch("tomcat", ecm.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;

  product.module = ecm ;
  product.dependencyModule = [tool, kernel, core, ws, eXoPortletContainer, eXoJcr, portal];
    
  return product ;
}