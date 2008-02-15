eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {

  var product = new Product();

  product.name = "eXoUltimateProduct" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "ultimate/trunk" ;
  product.useWorkflow = true;
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/trunk") ;
  var ws = Module.GetModule("ws/trunk");
  var core = Module.GetModule("core/trunk") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk") ;
  var eXoJcr = Module.GetModule("jcr/trunk") ;
  var portal = Module.GetModule("portal/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var cs = Module.GetModule("cs/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var ecm = Module.GetModule("ecm/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});  
  var ultimate = Module.GetModule("ultimate/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws :ws, eXoJcr : eXoJcr, portal : portal, cs: cs, ecm : ecm});
    
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(ultimate.web.ultimateportal) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.forum) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;

  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = ultimate ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, cs, ecm];
  
  return product;
}