eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eXoIntranetProduct" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "intranet/trunk" ;
  product.useWorkflow = true;
  product.workflowVersion = "2.1.1" ;
  product.serverPluginVersion = "2.2" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.2") ;
  var ws = Module.GetModule("ws/tags/1.2.1");
  var core = Module.GetModule("core/tags/2.1") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.1", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.9.1") ;
  var portal = Module.GetModule("portal/tags/2.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, ws : ws });  
  var ecm = Module.GetModule("ecm/tags/2.1.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/tags/1.1Beta1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ws : ws});
  var ks = Module.GetModule("ks/tags/rc3", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ws : ws});
  var webos = Module.GetModule("webos/branches/1.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal });
  var intranet = Module.GetModule("intranet/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm});
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(portal.web.eXoResources);
  
  product.addDependencies(ecm.web.rest) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
  
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;
  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;

  product.addDependencies(ks.eXoApplication.forum) ;
  product.addDependencies(ks.eXoApplication.faq) ;

  product.addDependencies(intranet.web.portal);
  product.addDependencies(intranet.portlet.web);
  product.addDependencies(intranet.web.eXoResources);
  product.addDependencies(intranet.zoho);
  
  product.addDependencies(webos.web.webosportal) ;
  
  product.addServerPatch("tomcat", intranet.server.tomcat.patch) ;
//  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;

  product.module = intranet ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, cs, ks, webos];
  
  return product;
}
