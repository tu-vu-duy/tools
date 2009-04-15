eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "spff" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "spff/internet/branches/2.3" ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.3";
  product.workflowVersion = "1.0";
  product.serverPluginVersion = "2.5.3" ;
  
  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.7") ;
  var core = Module.GetModule("core/tags/2.1.5") ;
  var ws = Module.GetModule("ws/tags/1.3.3", {kernel : kernel, core : core});
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.6", {kernel : kernel, core : core}) ;    
  var eXoJcr = Module.GetModule("jcr/tags/1.10.3", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.3", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr}); 
  var dms = Module.GetModule("ecm/dms/tags/2.3", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/tags/1.2", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var ks = Module.GetModule("ks/tags/1.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  //var liveroom = Module.GetModule("liveroom/tags/1.0-beta1-1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, ws : ws, portal : portal}) ;
  var spff = Module.GetModule("spff/internet/branches/2.3", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms, cs : cs});


  // necessaire pour le batch de synchro ldap/DB  
  product.addDependencies(core.component.ldap);

  // portal  
  product.addDependencies(portal.web.rest) ;
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;
	product.addDependencies(portal.eXoGadgetServer) ;
	product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(portal.webui.portal);
  product.addDependencies(portal.web.eXoResources);
  
  // ecm
  product.addDependencies(dms.web.eXoDMSResources);
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.portlet.jcr_console);
  product.addDependencies(dms.gadgets);
  
  // cs
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;
  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;

  // ks
  product.addDependencies(ks.eXoApplication.forum) ;
  product.addDependencies(ks.eXoApplication.faq) ;
  product.addDependencies(ks.eXoApplication.common) ;
  product.addDependencies(ks.web.webservice) ;
  product.addDependencies(ks.web.ksResources) ;
  
  // liveroom
  //product.addDependencies(liveroom.eXoApplication.chat.webapp) ;
  //product.addDependencies(liveroom.web.webservice) ;
  //product.addDependencies(liveroom.eXoApplication.whiteboard.webapp) ;
  
  // spff
  //product.addDependencies(spff.portlet.web) ;
  //product.addDependencies(spff.web.spffResources) ;
  //product.addDependencies(spff.web.spffportal) ;
  //product.addDependencies(spff.component.synchro) ;
  //product.addDependencies(spff.tool.migration) ;
  //product.addDependencies(spff.patch.loginmodule) ; // to use only with JBoss, not Tomcat
  //product.addDependencies(spff.patch.authenticator) ; 
  
  product.addDependencies(dms.web.dmsportal);
  
  // cleanup deploy
  product.removeDependency(eXoPortletContainer.web.wsrp);
  product.removeDependency(eXoPortletContainer.services.wsrp1);
  product.removeDependency(eXoPortletContainer.services.wsrp2);
  product.removeDependencyById("exo.jcr.component.ftp");
  
  // cleanup duplicated lib
  product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));

  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  //product.addServerPatch("tomcat", spff.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  //product.addServerPatch("jboss",  spff.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;
  
  product.module = spff ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms, cs, ks];
  /*liveroom*/

  return product ;
}
