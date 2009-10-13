eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "ecmsuite" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "ecm/suite/trunk" ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.5.1";
  product.workflowVersion = "1.0.2" ;
  product.serverPluginVersion = "2.5.5" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.7") ;
  var ws = Module.GetModule("ws/tags/1.3.3");
  var core = Module.GetModule("core/tags/2.1.5") ;

  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.7", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.4", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.5", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, ws : ws });  
  
  var dms = Module.GetModule("ecm/dms/tags/2.5.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  
  var workflow = Module.GetModule("ecm/workflow/tags/1.0.2", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var wcm = Module.GetModule("ecm/wcm/tags/1.2", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms});
  var ecmsuite = Module.GetModule("ecm/suite/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms, wcm: wcm,workflow : workflow});
  
  product.addDependencies(portal.web.rest);
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;  
  product.addDependencies(portal.eXoGadgetServer) ;
  product.addDependencies(portal.eXoGadgets) ;
  
  product.addDependencies(portal.webui.portal);
  
  product.addDependencies(portal.web.eXoResources);
  product.addDependencies(portal.web.eXoMacSkin);
  product.addDependencies(portal.web.eXoVistaSkin);
  
  product.addDependencies(dms.gadgets);
  product.addDependencies(dms.portlet.dms);
  product.addDependencies(dms.portlet.jcr_console);
  
  product.addDependencies(workflow.web.eXoWorkflowResources);
  product.addDependencies(workflow.portlet.workflow);
  
  product.addDependencies(wcm.portlet.webpresentation);
  product.addDependencies(wcm.portlet.websearches);
  product.addDependencies(wcm.portlet.newsletter); 
  product.addDependencies(wcm.portlet.formgenerator);
  product.addDependencies(wcm.web.eXoWCMResources) ;
  product.addDependencies(dms.web.eXoDMSResources);

  product.addDependencies(ecmsuite.web.ecmsuiteportal) ;

  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

	/* cleanup duplicated lib */
  product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));
  
  product.module = ecmsuite ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms, wcm, workflow];
  
  return product;
}
