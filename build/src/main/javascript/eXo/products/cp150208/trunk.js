eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "cp150208" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp150208/trunk" ;
  product.useWorkflow = false;
  product.serverPluginVersion = "2.1" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.1") ;
  var ws = Module.GetModule("ws/tags/1.1.2");
  var core = Module.GetModule("core/tags/2.0.2") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.8.3") ;
  var portal = Module.GetModule("portal/tags/2.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/tags/2.0", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var cp150208 = Module.GetModule("cp150208/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
    
  product.addDependencies(cp150208.web.portal) ;
  product.addDependencies(cp150208.web.eXoResources) ;
  product.addDependencies(cp150208.portlet.web) ;
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  
  product.addDependencies(ecm.web.rest) ;
  
  product.addServerPatch("tomcat", cp150208.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

	product.module = cp150208 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal];
    
  return product ;
}
