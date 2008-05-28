eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eXoUltimateProduct" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "ultimate/branches/2.0" ;
  product.useWorkflow = true;
  product.workflowVersion = "2.0" ;
  product.serverPluginVersion = "2.0" ;
    
  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.1") ;
  var ws = Module.GetModule("ws/tags/1.1");
  var core = Module.GetModule("core/tags/2.0.2") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0rc5") ;
  var eXoJcr = Module.GetModule("jcr/tags/1.8.3") ;
  var portal = Module.GetModule("portal/tags/2.0.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var cs = Module.GetModule("cs/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var ks = Module.GetModule("ks/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var ecm = Module.GetModule("ecm/branches/2.0", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});  
  var wcm = Module.GetModule("wcm/branches/0.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal, ecm : ecm});    
  var liveroom = Module.GetModule("liveroom/branches/1.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal}) ;
  var ultimate = Module.GetModule("ultimate/branches/2.0", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, ws :ws, eXoJcr : eXoJcr, portal : portal, cs: cs, ecm : ecm, ks : ks});
    
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(ultimate.web.ultimateportal) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;
  
  product.addDependencies(ks.eXoApplication.forum) ;
  product.addDependencies(ks.eXoApplication.wiki) ;
  product.addDependencies(ks.eXoApplication.blog) ;
  product.addDependencies(ks.eXoApplication.faq) ;

  product.addDependencies(liveroom.eXoApplication.chat.webapp) ;
  
  product.addDependencies(wcm.portlet.webpresentation);
  product.addDependencies(wcm.portlet.websearches);
  product.addDependencies(wcm.web.wcmResources) ;    

  product.addServerPatch("tomcat", ecm.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = ultimate ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, cs, ks, ecm, liveroom];
  
  return product;
}
