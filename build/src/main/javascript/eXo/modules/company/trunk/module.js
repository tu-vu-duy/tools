eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var dms = params.dms;
  var module = new Module();

  module.version =  "2.0.1-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/company" ;
  module.relativeSRCRepo =  "company/trunk" ;
  module.name =  "company" ;
  
  var ksversion = "1.1-rc1" ;
  var dmsversion = "2.3" ;
    
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.company", "company.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "companyPortletWeb" ;

  module.portlet.dms = 
    new Project("org.exoplatform.company", "company.portlet.ecm", "exo-portlet", module.version).
    addDependency(new Project("org.exoplatform.company", "company.component.cms", "jar",  module.version)) .      
    addDependency(new Project("org.exoplatform.company.bp", "exo.company.bp.jbpm.contactus", "jar", module.version)) .
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.cms", "jar",  dmsversion)) .     
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.deployment", "jar",  dmsversion)) .    
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.publication", "jar", dmsversion)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.connector.fckeditor", "jar", dmsversion)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.webui.dms", "jar", dmsversion)).
    addDependency(new Project("rome", "rome", "jar", "0.8")) .
    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")).
    addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2"));
  
  module.gadgets = 
    new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.gadgets", "war", dmsversion).
    addDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3.2"));  
    module.gadgets.deployName = "eXoDMSGadgets";
  
  module.application = {}
  module.application.rest = new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.publication","jar", dmsversion).
  	addDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3.2"));
  
  module.eXoApplication = {};
  
  module.eXoApplication.faq = new Project("org.exoplatform.ks", "exo.ks.eXoApplication.faq.webapp", "war", ksversion).
   addDependency(new Project("org.exoplatform.ks", "exo.ks.eXoApplication.faq.service", "jar", ksversion));
  module.eXoApplication.faq.deployName = "faq";

  module.eXoApplication.forum = new Project("org.exoplatform.ks", "exo.ks.eXoApplication.forum.webapp", "war", ksversion).
    addDependency(new Project("org.exoplatform.ks", "exo.ks.eXoApplication.forum.service", "jar",  ksversion).
    addDependency(new Project("org.exoplatform.ks", "exo.ks.component.providers", "jar", ksversion)));
  module.eXoApplication.forum.deployName = "forum";
  
  module.component={}
  module.component.web=
    new Project("org.exoplatform.company", "company.component.web", "jar", module.version).
    addDependency(portal.component.web);
  
  portal.webui.portal = 
    new Project("org.exoplatform.portal", "exo.portal.webui.portal", "jar", portal.version).
    addDependency(portal.component.resources) .
    addDependency(portal.webui.eXo) .
    addDependency(kernel.container) .
    addDependency(kernel.component.common) .
    addDependency(kernel.component.remote) .
    addDependency(kernel.component.cache) .
    addDependency(kernel.component.command) .
    addDependency(core.component.database) .
    addDependency(core.component.organization) .
    addDependency(core.component.security.core) .
    addDependency(core.component.xmlProcessing) .
    addDependency(core.component.documents).
    addDependency(core.component.resources).
    addDependency(core.component.gifbackport).
    addDependency(jcr.services.jcr).
    addDependency(eXoPortletContainer.services.jsr168jsr286).
    addDependency(eXoPortletContainer.web.wsrp) ;
	
  module.web = {}  
  module.web.ksResources = 
    new Project("org.exoplatform.ks", "exo.ks.web.ksResources", "war", ksversion) ;  
  module.web.companyResources = 
    new Project("org.exoplatform.company", "company.web.eXoResourcesCompany", "exo-portal", module.version) ;    
  module.web.portal = 
    new Project("org.exoplatform.company", "company.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.company", "company.server.tomcat.patch", "jar", module.version);

  return module;
}