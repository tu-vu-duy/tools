eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "spff" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "spff/internet/tags/2.3.0.3" ;
  product.useWorkflow = true;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.3.1";
  product.workflowVersion = "1.0.1";
  product.serverPluginVersion = "2.5.3" ;
  
  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.7") ;
  var core = Module.GetModule("core/tags/2.1.5") ;
  var ws = Module.GetModule("ws/tags/1.3.3", {kernel : kernel, core : core});
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.6", {kernel : kernel, core : core}) ;    
  var eXoJcr = Module.GetModule("jcr/tags/1.10.3", {kernel : kernel, core : core, ws : ws}) ;

  var webos = Module.GetModule("webos/tags/1.5.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var portal = Module.GetModule("portal/tags/2.5.3", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr}); 
  var dms = Module.GetModule("ecm/dms/tags/2.3.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var workflow = Module.GetModule("ecm/workflow/tags/1.0.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/tags/1.2.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var ks = Module.GetModule("ks/tags/1.1.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var spff = Module.GetModule("spff/internet/tags/2.3.0.3", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms, workflow : workflow, cs : cs, ks : ks});


  // necessaire pour le batch de synchro ldap/DB  
  product.addDependencies(core.component.ldap);

  /* PORTAL dependencies */

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

  /* KS dependencies */

// redefined in spff with locales :  product.addDependencies(ks.eXoApplication.forum) ;
// redefined in spff with locales :  product.addDependencies(ks.eXoApplication.faq) ;
  product.addDependencies(ks.eXoApplication.common) ;
  product.addDependencies(ks.web.webservice) ;
  //product.addDependencies(ks.web.ksResources) ;

  /* CS dependencies */
  
// redefined in spff with locales :  product.addDependencies(cs.eXoApplication.mail) ;
// redefined in spff with locales :  product.addDependencies(cs.eXoApplication.calendar) ;
// redefined in spff with locales :  product.addDependencies(cs.eXoApplication.contact) ;
// redefined in spff with locales :  product.addDependencies(cs.eXoApplication.content) ;
// patched : product.addDependencies(cs.eXoApplication.chat) ;

// patched : product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;

  
  /* DMS dependencies */
  product.addDependencies(dms.web.eXoDMSResources);
// patched : product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.portlet.jcr_console);
  product.addDependencies(dms.gadgets);

  product.addDependencies(workflow.web.eXoWorkflowResources);
// : redefined in spff with locales :  product.addDependencies(workflow.portlet.workflow);

  // liveroom
  //product.addDependencies(liveroom.eXoApplication.chat.webapp) ;
  //product.addDependencies(liveroom.web.webservice) ;
  //product.addDependencies(liveroom.eXoApplication.whiteboard.webapp) ;
  
  // spff
  product.addDependencies(spff.portlet.web) ;
  product.addDependencies(spff.portlet.spffadmin) ;
// with specific locales
  product.addDependencies(spff.portlet.ecm) ;
  product.addDependencies(spff.portlet.workflow) ;
  product.addDependencies(spff.portlet.calendar) ;
  product.addDependencies(spff.portlet.contact) ;
  product.addDependencies(spff.portlet.content) ;
  product.addDependencies(spff.portlet.mail) ;
  product.addDependencies(spff.portlet.faq) ;
  product.addDependencies(spff.portlet.forum) ;
  product.addDependencies(spff.portlet.forum) ;
//
  product.addDependencies(spff.web.spffResources) ;
  product.addDependencies(spff.web.spffportal) ;
  product.addDependencies(spff.web.ksResources) ;
  
  // patches are defined in the spff module.js file
// redefined in spff : product.addDependencies(spff.patch.dmsportlet);
  product.addDependencies(spff.patch.chat) ;
  product.addDependencies(spff.patch.cswebservice) ;
  product.addDependencies(spff.patch.jcr) ;
  
  
  //product.addDependencies(spff.component.synchro) ;
  //product.addDependencies(spff.tool.migration) ;
  //product.addDependencies(spff.patch.loginmodule) ; // to use only with JBoss, not Tomcat
  //product.addDependencies(spff.patch.authenticator) ; 
  
  // webos
    product.addDependencies(webos.web.webosResources);
	
	//product.addDependencies("exo.jcr.component.core");
  
  // cleanup deploy
  product.removeDependency(eXoPortletContainer.web.wsrp);
  product.removeDependency(eXoPortletContainer.services.wsrp1);
  product.removeDependency(eXoPortletContainer.services.wsrp2);
  product.removeDependencyById("exo.jcr.component.ftp");
  product.removeDependency(eXoJcr.services.jcr);
  
  
  // cleanup duplicated lib
  product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));

 /* from CS */
 
 product.preDeploy = function() {
	  eXo.System.info("INFO", "Product Pre Deploy phase in cs trunk");
	  this.removeDependency(new Project("javax.mail", "mail", "jar", "1.4"));
	  this.removeDependency(new Project("ical4j", "ical4j", "jar", "0.9.20"));
  };

  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;
 
  product.module = spff ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms, cs, ks, webos, workflow];

  return product ;
}
