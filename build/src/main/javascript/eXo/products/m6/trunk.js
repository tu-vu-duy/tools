eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "m6" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "m6/trunk" ;
  product.useWorkflow = true;
  product.serverPluginVersion = "2.0" ;
  
  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0") ;
  var ws = Module.GetModule("ws/tags/1.0");
  var core = Module.GetModule("core/tags/2.0") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk") ;    
  var eXoJcr = Module.GetModule("jcr/tags/1.7.1") ;
  var portal = Module.GetModule("portal/branches/2.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/branches/2.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var m6 = Module.GetModule("m6/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm});
  
  product.addDependencies(m6.web.m6portal) ;
  product.addDependencies(m6.web.m6Resources) ;
  product.addDependencies(m6.portlet.web) ;
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;


  product.addDependencies(portal.eXoWidget.web) ;

  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
  
  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  
  product.codeRepo = "m6/trunk" ;

  product.module = m6 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm];
  
  return product ;
}
