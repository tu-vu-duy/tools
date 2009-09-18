eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getProduct(version) {
  var product = new Product();

  product.name = "eXoVinaworksProduct" ;
  product.portalwar = "portal.war" ;
  product.codeRepo = "vinaworks/trunk" ;
  product.useContentvalidation = true;
  product.contentvalidationVersion = "2.3.1";
  product.useWorkflow = true;
  product.workflowVersion = "1.0.1" ;
  product.serverPluginVersion = "2.5.3" ;
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.7") ;
  var ws = Module.GetModule("ws/tags/1.3.3");
  var core = Module.GetModule("core/tags/2.1.5") ;

  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.6", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.3", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.3", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, ws : ws });  
  
  //var ecm = Module.GetModule("ecm/dms/tags/2.2.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var dms = Module.GetModule("ecm/dms/tags/2.3.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  
  var workflow = Module.GetModule("ecm/workflow/tags/1.0.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  var cs = Module.GetModule("cs/tags/1.2.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
  var ks = Module.GetModule("ks/tags/1.1.1", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal});
//  var wcm = Module.GetModule("ecm/wcm/tags/1.1", {kernel : kernel, core : core, ws : ws, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, dms : dms});
  var webos = Module.GetModule("webos/tags/1.5.1", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var vinaworks = Module.GetModule("vinaworks/trunk", {kernel : kernel, ws : ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr, portal : portal, webos: webos, cs: cs, ks: ks, dms : dms,  workflow : workflow});
  
  product.addDependencies(portal.portlet.exoadmin) ;
  product.addDependencies(portal.portlet.web) ;
  product.addDependencies(portal.portlet.dashboard) ;  
  product.addDependencies(portal.eXoGadgetServer) ;
  product.addDependencies(portal.eXoGadgets) ;
  
  product.addDependencies(portal.webui.portal);
  
  product.addDependencies(portal.web.eXoResources);
  product.addDependencies(portal.web.eXoMacSkin);
  product.addDependencies(portal.web.eXoVistaSkin);

  

  
  /*product.addDependencies(ecm.portlet.ecm) ;
  product.addDependencies(ecm.portlet.workflow) ;
  product.addDependencies(ecm.web.eXoECMResources) ;*/
  
  product.addDependencies(dms.web.eXoDMSResources);
  product.addDependencies(dms.gadgets);
  product.addDependencies(dms.portlet.dms);

  
  product.addDependencies(workflow.web.eXoWorkflowResources);
  product.addDependencies(workflow.portlet.workflow);
  
//  product.addDependencies(wcm.portlet.webpresentation);
//  product.addDependencies(wcm.portlet.websearches); 
//  product.addDependencies(wcm.web.eXoWCMResources) ;
              
  product.addDependencies(cs.eXoApplication.mail) ;
  product.addDependencies(cs.eXoApplication.calendar) ;
  product.addDependencies(cs.eXoApplication.contact) ;
  product.addDependencies(cs.eXoApplication.content) ;

  product.addDependencies(cs.web.webservice) ;
  product.addDependencies(cs.web.csResources) ;
            
  product.addDependencies(ks.eXoApplication.forum) ;
  product.addDependencies(ks.eXoApplication.faq) ;
  product.addDependencies(ks.eXoApplication.common) ;

  product.addDependencies(ks.web.webservice) ;
  product.addDependencies(ks.web.ksResources) ;


  product.addDependencies(vinaworks.web.vinaworksportal) ;
//  product.addDependencies(vinaworks.web.vinaworksResources) ;//ligne ajoutee
//  product.addDependencies(vinaworks.web.webosResources) ;    //ligne ajoutee
  product.addDependencies(vinaworks.web.vinaworkswebos) ;    //ligne ajoutee
//    product.addDependencies(vinaworks.web.vinaworkswebos);

  //product.addDependencies(webos.web.webosResources);



  product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
  product.addServerPatch("jboss",  portal.server.jboss.patch) ;
  product.addServerPatch("jonas",  portal.server.jonas.patch) ;

	/* cleanup duplicated lib */
  product.removeDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3"));
  product.removeDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3.1"));
  product.removeDependency(new Project("ical4j", "ical4j", "jar", "0.9.20"));
  product.removeDependency(new Project("javax.mail", "mail", "jar", "1.4"));
  product.removeDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0"));
  product.removeDependency(new Project("commons-collections", "commons-collections", "jar", "3.1"));
  product.removeDependency(new Project("rome", "rome", "jar", "0.8"));
  
  product.module = vinaworks ;
  product.dependencyModule = [tool, kernel, core, eXoPortletContainer, ws, eXoJcr, portal, dms, cs, ks, webos, workflow];
  
  return product;
}
