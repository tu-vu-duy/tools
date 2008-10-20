eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eXoCp130608Product" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp130608/trunk" ;
  product.useWorkflow = true;
  product.workflowVersion = "2.0.4" ;
  product.serverPluginVersion = "2.1.1" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.1") ;
  var ws = Module.GetModule("ws/tags/1.1.2");
  var core = Module.GetModule("core/tags/2.0.2") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.8.3") ;
  var portal = Module.GetModule("portal/tags/2.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });  
  var ecm = Module.GetModule("ecm/branches/2.0.4", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var wcm = Module.GetModule("wcm/branches/0.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal, ecm : ecm});  
//  var cs = Module.GetModule("cs/branches/1.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
//  var ks = Module.GetModule("ks/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal}); 
//  var liveroom = Module.GetModule("liveroom/branches/1.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal}) ;
  var cp130608 = Module.GetModule("cp130608/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm});
    
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(portal.web.eXoResources);
  
  product.addDependencies(ecm.web.rest) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
            
//  product.addDependencies(cs.eXoApplication.mail) ;
//  product.addDependencies(cs.eXoApplication.calendar) ;
//  product.addDependencies(cs.eXoApplication.contact) ;
//  product.addDependencies(cs.eXoApplication.content) ;
//  product.addDependencies(cs.web.webservice) ;
//  product.addDependencies(cs.web.csResources) ;
//
//  product.addDependencies(ks.eXoApplication.forum) ;
//  product.addDependencies(ks.eXoApplication.faq) ;
//  product.addDependencies(ks.eXoApplication.wiki) ;
//  product.addDependencies(ks.eXoApplication.blog) ;  
//
//  product.addDependencies(liveroom.eXoApplication.chat.webapp) ;
//
  product.addDependencies(wcm.portlet.webpresentation);
  product.addDependencies(wcm.portlet.websearches);
//  product.addDependencies(wcm.web.wcmResources) ;

  product.addDependencies(cp130608.web.portal) ;
  product.addDependencies(cp130608.portlet.web) ;
  product.addDependencies(cp130608.portlet.Refsrc) ;
  product.addDependencies(cp130608.web.eXoResources) ;

  product.addServerPatch("tomcat", ecm.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = cp130608 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, wcm];
  
  return product;
}
