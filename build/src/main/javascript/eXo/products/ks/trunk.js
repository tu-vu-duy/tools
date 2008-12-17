eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {

  var product = new Product();
  product.name = "eXoKS" ;
  product.portalwar = "portal.war" ;

  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.2") ;
  var ws = Module.GetModule("ws/tags/1.2.1");
  var core = Module.GetModule("core/tags/2.1.1") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.2", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.9.3") ;
  var portal = Module.GetModule("portal/tags/2.2.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });  
  var ks = Module.GetModule("ks/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  

  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.eXoWidget.web) ;
            
  product.addDependencies(ks.eXoApplication.forum) ;
  product.addDependencies(ks.eXoApplication.faq) ;
  product.addDependencies(ks.eXoApplication.common) ;
  //product.addDependencies(ks.eXoApplication.blog) ;
  //product.addDependencies(ks.eXoApplication.wiki) ;

  product.addDependencies(ks.web.ksportal) ;
  
  product.addDependencies(ks.web.ksResources) ;
  //product.addDependencies(cs.eXoApplication.contact) ;
  
  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
  product.codeRepo = "ks/trunk" ;

  product.module = ks ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal];
    
  return product ;
}
