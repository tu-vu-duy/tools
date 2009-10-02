eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {

  var product = new Product();
  product.name = "eXoCS" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cs/tags/1.2.2" ;
  product.serverPluginVersion = "2.5.3" ;

  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.7") ;
  var core = Module.GetModule("core/tags/2.1.5") ;
  var ws = Module.GetModule("ws/tags/1.3.3", {kernel : kernel, core : core});
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.6", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.3", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.3", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var webos = Module.GetModule("webos/tags/1.5", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var cs = Module.GetModule("cs/tags/1.2.2", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});

  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ; 
  product.addDependencies(cs.eXoApplication.chat) ;
  
  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;
  product.addDependencies(cs.web.csportal) ;
  
  product.addDependencies(webos.web.webosResources);	
  //product.addDependencies(webos.web.webosportal) ;
  
  product.addServerPatch("tomcat", cs.server.tomcat.patch) ;
  product.addServerPatch("jboss",  cs.server.jboss.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch)    
  

  product.module = cs ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal ];
 
  product.preDeploy = function() {
	  eXo.System.info("INFO", "Product Pre Deploy phase in cs trunk");
	  this.removeDependency(new Project("javax.mail", "mail", "jar", "1.4"));
  };
  return product ;
}
