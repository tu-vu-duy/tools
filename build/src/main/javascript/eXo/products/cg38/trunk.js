eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "cg38" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "cg38" ;
  product.useWorkflow = true;
  product.workflowVersion = "2.0.4" ;
  product.serverPluginVersion = "2.1" ;
    
  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.1") ;
  var ws = Module.GetModule("ws/tags/1.1.2");
  var core = Module.GetModule("core/tags/2.0.2") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.8.3.1") ;
  var portal = Module.GetModule("cg38/portal/2.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("cg38/ecm/2.0.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/branches/1.0.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var wcm = Module.GetModule("wcm/branches/0.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm});
  var cg38 = Module.GetModule("cg38/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm, cs : cs});
    
  product.addDependencies(cg38.web.cg38portal) ;
  product.addDependencies(cg38.web.cg38Resources) ;
  product.addDependencies(cg38.portlet.web) ;
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;      
    
  product.addDependencies(cs.eXoApplication.content) ;
  
  product.addDependencies(ecm.web.rest) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
  product.addDependencies(wcm.portlet.webpresentation) ;
  product.addDependencies(wcm.portlet.websearches) ;       
  
  product.addServerPatch("tomcat", cg38.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = cg38 ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, cs,wcm];
    
  return product ;
}
