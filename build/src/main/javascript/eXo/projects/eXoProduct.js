eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

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
    /*product.addDependencies(portal.portlet.content) ;*/
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;

    product.addDependencies(portal.eXoWidget.web) ;

    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;

    product.codeRepo = "portal/trunk" ;

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

    var ws = eXo.projects.Module.ws("0.1");

    var core = eXo.projects.Module.core("2.0.3") ;
    var eXoPortletContainer = eXo.projects.Module.eXoPortletContainer("2.0") ;
    var eXoJcr = eXo.projects.Module.eXoJcr("1.6") ;
    var portal = eXo.projects.Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");
                                    
    var ecm = eXo.projects.Module.ecm(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
//    var cs = eXo.projects.Module.cs(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    
    product.addDependencies(ecm.web.ecmportal) ;
    /*product.addDependencies(portal.portlet.content) ;*/
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;
    product.addDependencies(ecm.portlet.ecm) ;
    product.addDependencies(ecm.portlet.workflow) ;
    
//    product.addDependencies(cs.eXoApplication.mail) ;
//    product.addDependencies(cs.eXoApplication.forum) ;
//    product.addDependencies(cs.eXoApplication.calendar) ;
//    product.addDependencies(cs.eXoApplication.contact) ;
//    product.addDependencies(cs.eXoApplication.content) ;

    product.addDependencies(portal.eXoWidget.web) ;
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "ecm/trunk" ;

    product.module = ecm ;
    product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal];
    
    return product ;
  },

/*************************/
  eXoCSProduct : function() {
    var product = new Product();
    product.name = "eXoCS" ;
    product.portalwar = "portal.war" ;
    
    var tool = eXo.projects.Module.tool("2.0") ;
    var kernel = eXo.projects.Module.kernel("2.0.3") ;
  
    var core = eXo.projects.Module.core("2.0.3") ;
    var eXoPortletContainer = eXo.projects.Module.eXoPortletContainer("2.0") ;
    var eXoJcr = eXo.projects.Module.eXoJcr("1.6") ;
    var portal = eXo.projects.Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");
   
    var ecm = eXo.projects.Module.ecm(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    var cs = eXo.projects.Module.cs(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    var ws = eXo.projects.Module.ws("0.1");
    
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;

    product.addDependencies(portal.eXoWidget.web) ;
    
    product.addDependencies(ecm.portlet.ecm);
    product.addDependencies(ecm.portlet.workflow);
    
    product.addDependencies(cs.eXoApplication.mail) ;
    product.addDependencies(cs.eXoApplication.forum) ;
    product.addDependencies(cs.eXoApplication.calendar) ;
    product.addDependencies(cs.eXoApplication.contact) ;
    product.addDependencies(cs.eXoApplication.content) ;
    product.addDependencies(cs.eXoApplication.web.csportal) ;
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "cs/trunk" ;

    product.module = cs ;
    product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, ecm ];
    
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
    var cs = eXo.projects.Module.cs(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");    
    var ecm = eXo.projects.Module.ecm(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");    
    var ws = eXo.projects.Module.ws("0.1");
    product.addDependencies(ecm.web.ecmportal) ;
    /*product.addDependencies(portal.portlet.content) ;*/
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;

    product.addDependencies(portal.eXoWidget.web) ;

    product.addDependencies(cs.eXoApplication.mail) ;
    product.addDependencies(cs.eXoApplication.forum) ;
    product.addDependencies(cs.eXoApplication.calendar) ;
    product.addDependencies(cs.eXoApplication.contact) ;
    product.addDependencies(cs.eXoApplication.content) ;
    
    product.addDependencies(ecm.portlet.ecm) ;
    product.addDependencies(ecm.portlet.workflow) ;

    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "ecm/trunk" ;

    product.module = ecm  ;
    product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, cs];
    
    return product ;

  },
/**************************/
  geneveProduct: function() {
    var product = new Product();
    product.name = "geneve" ;
    product.portalwar = "portal.war" ;
    
    var tool = eXo.projects.Module.tool ("2.0");
    var kernel = eXo.projects.Module.kernel("2.0.3") ;
    var core = eXo.projects.Module.core("2.0.3") ;
    var eXoPortletContainer = eXo.projects.Module.eXoPortletContainer("2.0") ;
    var eXoJcr = eXo.projects.Module.eXoJcr("1.6") ;
    var eXoJcr = eXo.projects.Module.eXoJcr("1.6") ;
    var portal = eXo.projects.Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");
    var ecm = eXo.projects.Module.ecm(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    var geneve = eXo.projects.Module.geneve(kernel, core, eXoPortletContainer, eXoJcr, portal, "1.0");
    
    product.addDependencies(geneve.web.geneveportal) ;
    product.addDependencies(geneve.web.geneveResources) ;
    product.addDependencies(geneve.portlet.web) ;
    
    /*product.addDependencies(portal.portlet.content) ;*/
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;


    product.addDependencies(portal.eXoWidget.web) ;

    product.addDependencies(ecm.portlet.ecm) ;
    product.addDependencies(ecm.portlet.workflow) ;
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "geneve/website_poc/trunk" ;

    product.module = geneve ;
    product.dependencyModule = [tool, kernel, core, eXoPortletContainer, eXoJcr, portal, ecm];
    
    return product ;
  },
  
  /**************************/
  companyProduct: function() {
    var product = new Product();
    product.name = "company" ;
    product.portalwar = "portal.war" ;
    
    var tool = eXo.projects.Module.tool ("2.0");
    var kernel = eXo.projects.Module.kernel("2.0.3") ;
    var core = eXo.projects.Module.core("2.0.3") ;
    var eXoPortletContainer = eXo.projects.Module.eXoPortletContainer("2.0") ;
    var eXoJcr = eXo.projects.Module.eXoJcr("1.6") ;
    var portal = eXo.projects.Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");
    var ecm = eXo.projects.Module.ecm(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");    
    var company = eXo.projects.Module.company(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    
    product.addDependencies(company.component.web) ;
    product.addDependencies(company.web.portal) ;
    product.addDependencies(company.web.companyResources) ;    
    
    /*product.addDependencies(portal.portlet.content) ;*/
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;


    product.addDependencies(portal.eXoWidget.web) ;

    product.addDependencies(ecm.portlet.ecm) ;
    product.addDependencies(ecm.portlet.workflow) ;    
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "company/trunk" ;

    product.module = company ;
    product.dependencyModule = [tool, kernel, core, eXoPortletContainer, eXoJcr, portal, ecm];
    
    return product ;
  },
}
