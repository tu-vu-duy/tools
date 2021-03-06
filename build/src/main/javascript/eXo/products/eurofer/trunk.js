eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eurofer" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "eurofer/internet/trunk" ;
  product.useWorkflow = true;
  product.workflowVersion = "2.0" ;
  product.serverPluginVersion = "2.0" ;

  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0") ;
  var ws = Module.GetModule("ws/tags/1.1");
  var core = Module.GetModule("core/tags/2.0.1") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0rc4", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.8.1") ;
  var portal = Module.GetModule("portal/branches/2.0", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/branches/2.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var eurofer = Module.GetModule("eurofer/internet/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm});
    
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(ecm.web.rest) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
  product.addDependencies(ecm.web.rest) ;
  product.addDependencies(eurofer.web.euroferportal) ;
  product.addDependencies(eurofer.web.euroferResources) ;
  product.addDependencies(eurofer.portlet.web) ;
  product.addDependencies(core.component.ldap) ;
  product.addDependencies(core.component.organization.ldap) ;
    
  product.addServerPatch("tomcat", eurofer.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = eurofer ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm];
    
  return product ;
}
