eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "geneve" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "geneve/website_poc/trunk" ;
  product.useWorkflow = true;

  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0") ;
  var ws = Module.GetModule("ws/tags/1.0");
  var core = Module.GetModule("core/tags/2.0") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk") ;
  var eXoJcr = Module.GetModule("jcr/tags/1.7.1") ;
  var portal = Module.GetModule("portal/branches/2.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var ecm = Module.GetModule("ecm/branches/2.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var geneve = Module.GetModule("geneve/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm});
    
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
  product.addDependencies(geneve.web.geneveportal) ;
  product.addDependencies(geneve.web.geneveResources) ;
  product.addDependencies(geneve.portlet.web) ;
    
  product.addServerPatch("tomcat", geneve.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

  product.module = geneve ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm];
    
  return product ;
}
