eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {

  var product = new Product();
  product.name = "eXoKS" ;
  product.portalwar = "portal.war" ;
  product.serverPluginVersion = "2.5.3"

  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.7") ;
  var core = Module.GetModule("core/tags/2.1.5") ;
  var ws = Module.GetModule("ws/tags/1.3.3", {kernel : kernel, core : core});
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.6", {kernel : kernel, core : core}) ;    
  var eXoJcr = Module.GetModule("jcr/tags/1.10.3", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.3", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr});  
  var ks = Module.GetModule("ks/branches/1.2-crm", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});

  product.addDependencies(portal.web.rest) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;
	product.addDependencies(portal.eXoGadgetServer) ;
//	product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(portal.webui.portal);
  
	product.addDependencies(portal.web.eXoResources);
	product.addDependencies(portal.web.eXoMacSkin);
	product.addDependencies(portal.web.eXoVistaSkin);
            
  product.addDependencies(ks.eXoApplication.forum) ;
  product.addDependencies(ks.eXoApplication.faq) ;
  product.addDependencies(ks.eXoApplication.common) ;
  //product.addDependencies(ks.eXoApplication.blog) ;
  //product.addDependencies(ks.eXoApplication.wiki) ;

  product.addDependencies(ks.web.ksportal) ;
  product.addDependencies(ks.web.webservice) ;
  product.addDependencies(ks.web.ksResources) ;
  //product.addDependencies(cs.eXoApplication.contact) ;
  
  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;

  var chromeversion="1.0.0-beta1";
  product.addDependencies(new Project("org.exoplatform.chrome", "core", "jar", chromeversion));
  product.addDependencies(new Project("org.exoplatform.chrome", "api", "jar", chromeversion));
  product.addDependencies(new Project("org.exoplatform.chrome", "spi", "jar", chromeversion));
  product.addDependencies(new Project("org.exoplatform.chrome", "common", "jar", chromeversion));
  product.addDependencies(new Project("org.slf4j", "slf4j-api", "jar", "1.5.8"));
  product.addDependencies(new Project("org.slf4j", "slf4j-log4j12", "jar", "1.5.8"));
  product.addDependencies(new Project("org.exoplatform.chrome", "cglib", "jar", chromeversion));
  product.addDependencies(new Project("org.exoplatform.chrome", "exo", "jar", chromeversion));
  //product.addDependencies(new Project("cglib", "cglib", "jar", "2.1.3"));
  
  
  var reflextversion="1.0.0-beta1";
  product.addDependencies(new Project("org.reflext", "reflext.api", "jar", reflextversion));
  product.addDependencies(new Project("org.reflext", "reflext.core", "jar", reflextversion));
  product.addDependencies(new Project("org.reflext", "reflext.spi", "jar", reflextversion));
  product.addDependencies(new Project("org.reflext", "reflext.jlr", "jar", reflextversion));

  
	/* cleanup duplicated lib */
  product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));
  product.removeDependency(new Project("org.slf4j", "slf4j-api", "jar", "1.5.6"));
  product.removeDependency(new Project("org.slf4j", "slf4j-jdk14", "jar", "1.5.6")); 
  
  
  
  product.codeRepo = "ks/branches/1.2-crm" ;

  product.module = ks ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal];
    
  return product ;
}
