eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();
  
  product.name = "eXoPortletContainer" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "portlet-container/trunk" ;
  
  print("PRODUCT " + product.name);

  var tool = Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/trunk") ;
  var core = Module.GetModule("core/trunk") ;
  var eXoPortletContainer = Module.GetModule("portlet-container/trunk", {kernel : kernel, core : core});    

  product.addDependencies(eXoPortletContainer.services.jsr168jsr286) ;
  product.addDependencies(eXoPortletContainer.web.wsrp) ;

  product.module = eXoPortletContainer ;
  product.dependencyModule = [ tool, kernel, core ];

  return product ;
}