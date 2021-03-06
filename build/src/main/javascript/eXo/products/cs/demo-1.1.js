eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {

  var product = new Product();
  product.name = "eXoCS" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cs/tags/1.1RC1" ;
  product.serverPluginVersion = "2.2.2" ;

  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.2") ;
  var core = Module.GetModule("core/tags/2.1.1") ;
  var ws = Module.GetModule("ws/tags/1.2.1");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.2", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.9.3") ;
  var portal = Module.GetModule("portal/tags/2.2.2", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });  
  var cs = Module.GetModule("cs/tags/1.1RC1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});

  // portal applications
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  
  // cs applications & services          
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;
  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;  
  product.addDependencies(cs.web.rest) ;  
  
  // demo portal war
  cs.web.csdemo.deployName = "portal"; // required, otherwise the Project.js takes the artifact name suffix 
  product.addDependencies(cs.web.csdemo) ;
  
  product.addServerPatch("tomcat", cs.server.tomcat.patch) ;
  //product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  //product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = cs ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal ];
    
  return product ;
}
