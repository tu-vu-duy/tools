eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eXoCp301008Product" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cp301008/trunk" ;
  product.useWorkflow = true;
  product.workflowVersion = "2.1" ;
  product.serverPluginVersion = "2.2" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.2") ;
  var ws = Module.GetModule("ws/tags/1.2.1");
  var core = Module.GetModule("core/tags/2.1") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.1", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.9.3") ;
  var portal = Module.GetModule("portal/tags/2.2.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, ws : ws });  
  var ecm = Module.GetModule("ecm/tags/2.1.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cp301008 = Module.GetModule("cp301008/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm});
    
  product.addDependencies(core.component.ldap);
  product.addDependencies(core.component.organization.ldap);
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(portal.web.eXoResources);
  
  product.addDependencies(ecm.web.rest) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;

  product.addDependencies(cp301008.web.portal);
  product.addDependencies(cp301008.portlet.web);
  product.addDependencies(cp301008.web.eXoResources);
  
  product.addServerPatch("tomcat", cp301008.server.tomcat.patch) ;
  product.addServerPatch("jbossear",  portal.server.jbossear.patch) ;

  product.module = cp301008 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm];
  
  return product;
}
