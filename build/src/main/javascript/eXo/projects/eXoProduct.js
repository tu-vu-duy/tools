eXo.require("eXo.projects.Module") ;

function Product() {
  this.name      = null ;
  this.portalwar = null ;
  this.codeRepo  = null ;
  this.dependencyCodeRepos = null ;
  this.dependenciesHolder = new java.util.HashMap() ; 
  this.serverPatches      = new java.util.HashMap() ;

  this.module = null ;
  this.dependencyModule = null ;
}

Product.prototype.addServerPatch = function (serverName, project) {
  var holders = this.serverPatches.get(serverName) ;
  if (holders == null) {
    holders = new java.util.ArrayList(3) ;
    this.serverPatches.put(serverName, holders) ;
  }
  holders.add(project) ;
}

Product.prototype.getServerPatches = function(serverName) { 
  return this.serverPatches.get(serverName) ; 
}
Product.prototype.addDependencies = function(project) {
  this.dependenciesHolder.put(project.relativePath, project) ;
  if(project.hasDependency()) {
    var list = project.dependencies ;
    for(var i = 0; i < list.size(); i++) {
//      print("dependency: " + list.get(i).relativePath) ;
      this.addDependencies(list.get(i)) ;
    }
  }
}

Product.prototype.getDependencies = function() { 
  return this.dependenciesHolder.values() ; 
}

Product.prototype.getServerPatches = function(serverName) { 
  return serverPatches.get(serverName) ; 
}

/******************************************************************************************/

eXo.projects.eXoProduct = {

  portal : function() { 
    var product = new Product();
    product.name = "eXoPortal" ;
    product.portalwar = "portal.war" ;


    var tool = eXo.projects.Module.tool("2.0") ;
    var kernel = eXo.projects.Module.kernel("2.0.3") ;

    var core = eXo.projects.Module.core("2.0.3") ;
    var eXoPortletContainer = eXo.projects.Module.eXoPortletContainer("2.0") ;
    var eXoJcr = eXo.projects.Module.eXoJcr("1.6") ;
    var portal = eXo.projects.Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");

    
    product.addDependencies(portal.web.portal) ;
    product.addDependencies(portal.portlet.content) ;
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;
    product.addDependencies(portal.portlet.site) ;
    product.addDependencies(portal.portlet.test) ;

    product.addDependencies(portal.eXoApplication.web) ;

    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;

    product.codeRepo = "portal/trunk" ;

    product.dependencyCodeRepos = "tools/trunk,kernel/trunk,core/trunk";

    product.module = portal ;
    product.dependencyModule = [ tool, kernel, core, eXoPortletContainer, eXoJcr];

    return product ;
  },
/*************************/
  eXoECMProduct : function() {
    var product = new Product();
    product.name = "eXoECM" ;
    product.portalwar = "portal.war" ;
    
        
    var tool = eXo.projects.Module.tool("2.0") ;
    var kernel = eXo.projects.Module.kernel("2.0.3") ;

    var core = eXo.projects.Module.core("2.0.3") ;
    var eXoPortletContainer = eXo.projects.Module.eXoPortletContainer("2.0") ;
    var eXoJcr = eXo.projects.Module.eXoJcr("1.6") ;
    var portal = eXo.projects.Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");

    var ecm = eXo.projects.Module.ecm(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    
    product.addDependencies(ecm.web.ecmportal) ;
    product.addDependencies(portal.portlet.content) ;
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;
    product.addDependencies(portal.portlet.site) ;
    product.addDependencies(ecm.portlet.ecm) ;
    product.addDependencies(ecm.portlet.workflow) ;

    product.addDependencies(portal.eXoApplication.web) ;
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "ecm/trunk" ;
    product.dependencyCodeRepos = "tools/trunk,kernel/trunk,core/trunk,portal/trunk";

    product.module = ecm ;
    product.dependencyModule = [tool, kernel, core, eXoPortletContainer, eXoJcr, portal];
    
    return product ;
  },

/*************************/
  eXoGroupwareProduct : function() {
    var product = new Product();
    product.name = "eXoGroupware" ;
    product.portalwar = "portal.war" ;
    
    var tool = eXo.projects.Module.tool("2.0") ;
    var kernel = eXo.projects.Module.kernel("2.0.3") ;

    var core = eXo.projects.Module.core("2.0.3") ;
    var eXoPortletContainer = eXo.projects.Module.eXoPortletContainer("2.0") ;
    var eXoJcr = eXo.projects.Module.eXoJcr("1.6") ;
    var portal = eXo.projects.Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");
   
    var groupware = eXo.projects.Module.groupware(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    
    product.addDependencies(portal.web.portal) ;
    product.addDependencies(portal.portlet.content) ;
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;
    product.addDependencies(portal.portlet.site) ;

    product.addDependencies(portal.eXoApplication.web) ;
    
    product.addDependencies(groupware.portlet.forum) ;
    product.addDependencies(groupware.portlet.mail) ;
    product.addDependencies(groupware.portlet.calendar) ;
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
   product.codeRepo = "groupware/trunk" ;
   product.dependencyCodeRepos = "tools/trunk,kernel/trunk,core/trunk,portal/trunk";

    product.module = groupware ;
    product.dependencyModule = [tool, kernel, core, eXoPortletContainer, eXoJcr, portal ];
    
    return product ;
  },

/*************************/
  eXoAllProduct: function() {
    var product = new Product();
    product.name = "eXoAllProduct" ;
    product.portalwar = "portal.war" ;
    
    
    var tool = eXo.projects.Module.tool("2.0") ;
    var kernel = eXo.projects.Module.kernel("2.0.3") ;

    var core = eXo.projects.Module.core("2.0.3") ;
    var eXoPortletContainer = eXo.projects.Module.eXoPortletContainer("2.0") ;
    var eXoJcr = eXo.projects.Module.eXoJcr("1.6") ;
    var portal = eXo.projects.Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");
    
    var ecm = eXo.projects.Module.ecm(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    var groupware = eXo.projects.Module.groupware(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    
    product.addDependencies(ecm.web.ecmportal) ;
    product.addDependencies(portal.portlet.content) ;
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;
    product.addDependencies(portal.portlet.site) ;

    product.addDependencies(ecm.portlet.ecm) ;
    product.addDependencies(ecm.portlet.workflow) ;

    product.addDependencies(portal.eXoApplication.web) ;
    
    product.addDependencies(groupware.portlet.forum) ;
    product.addDependencies(groupware.portlet.mail) ;
    product.addDependencies(groupware.portlet.calendar) ;
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "groupware/trunk" ;
    product.dependencyCodeRepos = "tools/trunk,kernel/trunk,core/trunk,portal/trunk,ecm/trunk";

    product.module = groupware  ;
    product.dependencyModule = [tool, kernel, core, eXoPortletContainer, eXoJcr, portal, ecm];
    
    return product ;
  }
}

 
var product = eXo.projects.eXoProduct.eXoAllProduct() ;

