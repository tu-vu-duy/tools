eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "eXoDMS" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "ecm/dms/trunk" ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.3-SNAPSHOT";
  product.workflowVersion = "1.0-SNAPSHOT";
  product.serverPluginVersion = "2.5.2" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.6") ;
  var core = Module.GetModule("core/tags/2.1.4") ;
  var ws = Module.GetModule("ws/tags/1.3.2");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.4", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.2", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.2", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var dms = Module.GetModule("ecm/dms/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
    
  product.addDependencies(portal.web.rest);
  product.addDependencies(dms.web.dmsportal);
  product.addDependencies(dms.web.eXoDMSResources);
  product.addDependencies(portal.portlet.exoadmin);
  product.addDependencies(portal.portlet.web);
  product.addDependencies(portal.portlet.dashboard);
	product.addDependencies(portal.eXoGadgetServer);
	product.addDependencies(portal.eXoGadgets);  
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.portlet.jcr_console);
  
  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;  
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;

  product.module = dms ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal];

  return product ;
}
