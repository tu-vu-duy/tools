eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {

  var product = new Product();
  product.name = "eXoCS" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cs/branches-dev/ws-2.0-test" ;
  product.serverPluginVersion = "2.5rc2" ;

  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/trunk") ;
  var ws = Module.GetModule("ws/branches/2.0");
  var core = Module.GetModule("core/trunk") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/branches/1.11", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5rc2", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr});
  var cs = Module.GetModule("cs/branches-dev/ws-2.0-test", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});

  
  
  product.addDependencies(portal.web.rest) ;   
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;
	product.addDependencies(portal.eXoGadgetServer) ;
	product.addDependencies(portal.eXoGadgets) ;  
  
  
  //product.addDependencies(portal.portlet.dashboard) ;
  //product.addDependencies(portal.eXoGadgetServer) ;
  //product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;

  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;
  product.addDependencies(cs.web.csportal) ;
  
  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) 

  product.module = cs ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal ];
    
  return product ;
}
