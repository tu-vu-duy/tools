eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "spff" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "spff/internet/trunk" ;
  product.useWorkflow = true;  
    
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0") ;
  var ws = Module.GetModule("ws/tags/1.0");
  var core = Module.GetModule("core/tags/2.0") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk") ;
  var eXoJcr = Module.GetModule("jcr/tags/1.7.1") ;
  var portal = Module.GetModule("portal/branches/2.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });  
  var ecm = Module.GetModule("ecm/branches/2.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var spff = Module.GetModule("spff/internet/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, ecm : ecm, cs : cs});
    
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
  product.addDependencies(portal.web.eXoResources);
  product.addDependencies(portal.web.eXoVistaSkin);
  product.addDependencies(portal.web.eXoMacSkin);
  
  product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
            
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.forum) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;
  product.addDependencies(cs.web.csResources) ;
  
  product.addDependencies(spff.portlet.web) ;
  product.addDependencies(spff.web.spffResources) ;
  product.addDependencies(spff.web.spffportal) ;
  
  product.addServerPatch("tomcat", spff.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
  
  product.module = spff ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm, cs];
    
  return product ;
}
