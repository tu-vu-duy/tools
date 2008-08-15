eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "eXoWebOS" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "webos/branches/1.2" ;
  product.useWorkflow = false;
  product.serverPluginVersion = "2.2" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.2") ;
  var core = Module.GetModule("core/tags/2.1") ;
  var ws = Module.GetModule("ws/tags/1.2.1");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.1", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.9.1") ;
  var portal = Module.GetModule("portal/branches/2.2.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var webos = Module.GetModule("webos/branches/1.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal });
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;

  product.addDependencies(webos.web.webosportal) ;
  
  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = webos ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal];
    
  return product ;
}
