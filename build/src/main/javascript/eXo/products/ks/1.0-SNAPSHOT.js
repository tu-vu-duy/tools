eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {

  var product = new Product();
  product.name = "eXoKS" ;
  product.portalwar = "portal.war" ;

  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.2") ;
  var ws = Module.GetModule("ws/tags/1.2");
  var core = Module.GetModule("core/tags/2.1") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.1", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.9") ;
  var portal = Module.GetModule("portal/branches/2.2", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });  
  var cs = Module.GetModule("cs/branches/1.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var ks = Module.GetModule("ks/branches/1.0", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, cs: cs});
  

  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
            
  product.addDependencies(ks.eXoApplication.forum) ;
  //product.addDependencies(ks.eXoApplication.content) ;
  product.addDependencies(ks.eXoApplication.blog) ;
  product.addDependencies(ks.eXoApplication.wiki) ;
  product.addDependencies(ks.eXoApplication.faq) ;
  product.addDependencies(ks.web.ksportal) ;
  
  product.addDependencies(cs.web.csResources) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  
  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
  product.codeRepo = "ks/branches/1.0" ;

  product.module = ks ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, cs ];
    
  return product ;
}
