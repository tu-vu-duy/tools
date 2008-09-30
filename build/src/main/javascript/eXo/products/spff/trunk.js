eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "spff" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "spff/internet/trunk" ;
  product.useWorkflow = true;  
  product.workflowVersion = "2.1" ;
  product.serverPluginVersion = "2.2" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.2") ;
  var ws = Module.GetModule("ws/tags/1.2");
  var core = Module.GetModule("core/tags/2.1") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.1", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.9") ;
  var portal = Module.GetModule("portal/tags/2.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, ws : ws });  
  var ecm = Module.GetModule("ecm/tags/2.1.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/tags/1.1Beta1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ws : ws});
  var ks = Module.GetModule("ks/tags/rc3", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ws : ws}); 
  var liveroom = Module.GetModule("liveroom/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, ws : ws, portal : portal}) ;
  var spff = Module.GetModule("spff/internet/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm, cs : cs});

  // necessaire pour le batch de synchro ldap/DB  
  product.addDependencies(core.component.ldap);
    
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
  
  product.addDependencies(liveroom.eXoApplication.chat.webapp) ;
  
  product.addDependencies(spff.portlet.web) ;
  product.addDependencies(spff.web.spffResources) ;
  product.addDependencies(spff.web.spffportal) ;
  product.addDependencies(spff.component.synchro) ;
  product.addDependencies(spff.patch.loginmodule) ; // to use only with JBoss, not Tomcat
  
  product.addServerPatch("tomcat", spff.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jboss",  spff.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  product.addServerPatch("ear",  portal.server.websphere.patch) ;
  
  product.module = spff ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, cs, ks, liveroom];
    
  return product ;
}
