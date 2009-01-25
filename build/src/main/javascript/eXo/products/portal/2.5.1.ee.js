eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "eXoPortal" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "portal/branches/2.5.1.ee" ;
  product.serverPluginVersion = "2.5.1.ee" ;
  
  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/branches/2.0.6.ee") ;
  var core = Module.GetModule("core/branches/2.1.3.ee") ;
  var ws = Module.GetModule("ws/branches/1.3.1.ee", {kernel : kernel, core : core});
  var eXoPortletContainer = Module.GetModule("portlet-container/branches/2.0.5.ee", {kernel : kernel, core : core}) ;    
  var eXoJcr = Module.GetModule("jcr/branches/1.10.1.ee", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/branches/2.5.1.ee", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr});

  product.addDependencies(portal.web.rest) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;
	product.addDependencies(portal.eXoGadgetServer) ;
	product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(portal.webui.portal);
  
	product.addDependencies(portal.web.eXoResources);
	product.addDependencies(portal.web.eXoMacSkin);
	product.addDependencies(portal.web.eXoVistaSkin);

  product.addDependencies(portal.web.portal) ;

  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;

	/* cleanup duplicated lib */
  product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));

  product.module = portal ;
  product.dependencyModule = [ tool, kernel, core, eXoPortletContainer, ws, eXoJcr ];

  return product ;
}
