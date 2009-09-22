eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
    
  product.name = "bpi" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "bpi/trunk" ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.5.1";
  product.workflowVersion = "1.0.2";
  product.serverPluginVersion = "2.5.5" ;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.7") ;
  var core = Module.GetModule("core/tags/2.1.5") ;
  var ws = Module.GetModule("ws/tags/1.3.3");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.7", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.4", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.5", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var dms = Module.GetModule("ecm/dms/tags/2.5.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var bpi = Module.GetModule("bpi/trunk", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms});
    
  product.addDependencies(portal.web.rest);
  product.addDependencies(portal.portlet.exoadmin);
//  product.addDependencies(portal.portlet.web);
  product.addDependencies(portal.portlet.dashboard);
	product.addDependencies(portal.eXoGadgetServer);
	product.addDependencies(portal.eXoGadgets);  

  product.addDependencies(dms.web.eXoDMSResources);
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.portlet.jcr_console);
  product.addDependencies(dms.gadgets);
    
  product.addDependencies(bpi.web.portal);
  product.addDependencies(bpi.web.BPIResources);
  product.addDependencies(bpi.portlet.web);
  product.addDependencies(bpi.web.content); // add content portlet
  product.addDependencies(bpi.web.rssBpi); // add content portlet



  product.addDependencies(bpi.application.statsService); // add stat service jar
  product.addDependencies(bpi.application.jcrActions); // add jcr service jar
  product.addDependencies(bpi.application.ldapService); // add ldap synchronization service jar
  product.addDependencies(bpi.application.backupService); // add Backup service jar
  product.addDependencies(bpi.application.publicationService); // add Publication service jar


  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;  
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;

  product.module = bpi ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms];

  return product ;
}