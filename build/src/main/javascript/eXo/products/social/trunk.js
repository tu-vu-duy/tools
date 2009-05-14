eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "social" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "social/trunk" ;
  product.serverPluginVersion = "2.6-SNAPSHOT"
  
  
  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.1.1") ;
  var core = Module.GetModule("core/trunk") ;
  var ws = Module.GetModule("ws/tags/2.0.1", {kernel : kernel, core : core});
  var eXoJcr = Module.GetModule("jcr/tags/1.11.1", {kernel : kernel, core : core, ws : ws}) ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.1.1", {kernel : kernel, core : core, ws : ws}) ;    
  var portal = Module.GetModule("portal/trunk", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr});
  var social = Module.GetModule("social/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  
  product.addDependencies(social.web.portal) ;
  product.addDependencies(social.web.eXoResources) ;
  product.addDependencies(social.component.people) ;
  product.addDependencies(social.component.space) ;
  product.addDependencies(social.portlet.space) ;
  product.addDependencies(social.portlet.profile);
  product.addDependencies(social.web.opensocial);
  product.addDependencies(social.component.opensocial);
  product.addDependencies(social.application.rest) ;
    
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

  product.removeDependency(eXoPortletContainer.web.wsrp);
  product.removeDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.ftp", "jar", eXoJcr.version));



  //upgrade lib for opensocial 
  product.removeDependency(new Project("commons-beanutils", "commons-beanutils", "jar", "1.6"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "2.1"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));
  product.removeDependency(new Project("commons-digester", "commons-digester", "jar", "1.6"));
  product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
  product.removeDependency(new Project("xstream", "xstream", "jar", "1.0.2"));

  product.addDependencies(new Project("commons-beanutils", "commons-beanutils", "jar", "1.7.0"));
  product.addDependencies(new Project("commons-beanutils", "commons-beanutils-core", "jar", "1.7.0"));
  product.addDependencies(new Project("commons-digester", "commons-digester", "jar", "1.7"));
  product.addDependencies(new Project("commons-httpclient", "commons-httpclient", "jar", "3.1"));

  product.addDependencies(new Project("findbugs", "annotations", "jar", "1.0.0"));

  
  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.module = social ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal];
    
  return product ;
}
