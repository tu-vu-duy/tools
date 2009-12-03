eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eXoAllInOneProduct" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "allinone/branches/1.6.x" ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.5.3-SNAPSHOT";
  product.useWorkflow = true;
  product.workflowVersion = "1.0.5-SNAPSHOT" ;
  product.serverPluginVersion = "2.5.7-SNAPSHOT" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.8") ;
  var ws = Module.GetModule("ws/tags/1.3.4");
  var core = Module.GetModule("core/tags/2.1.6") ;

  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.7", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.5.1", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/branches/2.5.x", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, ws : ws });  
  
  var dms = Module.GetModule("ecm/dms/branches/2.5.x", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  
  var workflow = Module.GetModule("ecm/workflow/branches/1.0.x", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/branches/1.3.x", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var ks = Module.GetModule("ks/branches/1.2.x", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var wcm = Module.GetModule("ecm/wcm/branches/1.2.x", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms});
  
  var webos = Module.GetModule("webos/branches/1.5.x", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var allinone = Module.GetModule("allinone/branches/1.6.x", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, cs: cs, ks: ks, dms : dms, wcm: wcm,workflow : workflow});
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;  
  product.addDependencies(portal.eXoGadgetServer) ;
  product.addDependencies(portal.eXoGadgets) ;
  product.addDependencies(portal.webui.portal);
  product.addDependencies(portal.web.eXoResources);
	
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.gadgets);
  
  product.addDependencies(wcm.portlet.webpresentation);
  product.addDependencies(wcm.portlet.websearches); 
  product.addDependencies(wcm.portlet.newsletter); 
  product.addDependencies(wcm.portlet.formgenerator);
  product.addDependencies(wcm.web.eXoWCMResources) ;
  product.addDependencies(dms.web.eXoDMSResources) ;
  product.addDependencies(allinone.web.allinoneportal) ;
  
  
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;
  product.addDependencies(cs.eXoApplication.chat) ;
// Patched in AIO to display chatbar entirely in WCM layout (add css right:0; to UIChatBarPortlet)
//  product.addDependencies(cs.eXoApplication.chatbar) ;
  product.addDependencies(allinone.patches.chatbar) ;

  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;
  
  /* KS */  
  product.addDependencies(ks.eXoApplication.forum) ;
  product.addDependencies(ks.eXoApplication.faq) ;
  product.addDependencies(ks.eXoApplication.common) ;

  product.addDependencies(ks.web.webservice) ;
  product.addDependencies(ks.web.ksResources) ;
  
  /* WEBOS */
  product.addDependencies(webos.web.webosResources);

  /* WORKFLOW */
  product.addDependencies(workflow.portlet.workflow);
  product.addDependencies(workflow.web.eXoWorkflowResources);
  
  
  /* cleanup duplicated lib*/
  product.removeDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3"));
  product.removeDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3.1"));
  product.removeDependency(new Project("ical4j", "ical4j", "jar", "0.9.20"));
  product.removeDependency(new Project("javax.mail", "mail", "jar", "1.4"));
  product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));
  product.removeDependency(new Project("rome", "rome", "jar", "0.8"));
  product.removeDependency(new Project("javax.mail", "mail", "jar", "1.4"));
   
  product.addServerPatch("tomcat", cs.server.tomcat.patch) ; 
  product.addServerPatch("tomcat", allinone.patches.tomcat) ;
  product.addServerPatch("jbossear",  cs.server.jboss.patch) ;
  product.addServerPatch("jbossear",  allinone.patches.jboss) ;
//  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;  
//  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
//  product.addServerPatch("ear",  portal.server.websphere.patch) ;

  product.module = allinone ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms, cs, ks, wcm, webos, workflow];
  return product;
}
