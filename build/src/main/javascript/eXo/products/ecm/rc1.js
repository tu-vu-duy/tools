eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "eXoECM" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "ecm/dms/tags/rc1" ;
  product.useWorkflow = true;
  product.workflowVersion = "rc1" ;
  product.serverPluginVersion = "rc1" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0") ;
  var ws = Module.GetModule("ws/tags/1.1");
  var core = Module.GetModule("core/tags/2.0.1") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.8") ;
  var portal = Module.GetModule("portal/tags/rc1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/tags/rc1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
    
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

  product.module = ecm ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal];
    
  return product ;
}
