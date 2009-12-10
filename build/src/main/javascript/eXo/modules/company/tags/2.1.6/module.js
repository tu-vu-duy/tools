eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var dms = params.dms;
  var ws = params.ws;
  var module = new Module();

  module.version =  "2.1.6";
  module.relativeMavenRepo =  "org/exoplatform/company" ;
  module.relativeSRCRepo =  "company/tags/2.1.6" ;
  module.name =  "company" ;
  
  var ksversion = "1.1" ;
  var dmsversion = "2.3.2" ;
  var workflowversion = "1.0" ;
  var csversion = "1.2" ;
    
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.company", "company.portlet.web", "exo-portlet", module.version);  
  module.portlet.web.deployName = "companyPortletWeb" ;
  module.portlet.exoadmin = new Project("org.exoplatform.portal", "exo.portal.portlet.exoadmin", "war", "2.5.3.CWI_1");
  module.portlet.exoadmin.deployName = "exoadmin" ;

  module.portlet.dms = 
    new Project("org.exoplatform.company", "company.portlet.ecm", "exo-portlet", module.version).
    addDependency(new Project("org.exoplatform.company", "company.component.cms", "jar",  module.version)) .      
    addDependency(new Project("org.exoplatform.company.bp", "exo.company.bp.jbpm.contactus", "jar", module.version)) .
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.cms", "jar",  dmsversion)) .     
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.deployment", "jar",  dmsversion)) .    
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.publication", "jar", dmsversion)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.connector.fckeditor", "jar", dmsversion)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.webui.dms", "jar", dmsversion)).
  	addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.facade", "jar", workflowversion)).
	addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.engine", "jar", "3.0")).
	addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.api", "jar", workflowversion)).
	addDependency(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.payraise", "jar", "1.0.2")).
	addDependency(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.holiday", "jar", "1.0.2")).
	addDependency(new Project("org.exoplatform.ecm.dms.ext.contentvalidation", "exo.ecm.dms.ext.contentvalidation.component.jbpmconfig", "jar", dmsversion)).
	addDependency(new Project("org.exoplatform.ecm.dms.ext.contentvalidation.bp", "exo.ecm.dms.ext.contentvalidation.bp.jbpm.content.publishing", "jar", dmsversion)).
	addDependency(new Project("org.exoplatform.ecm.dms.ext.contentvalidation", "exo.ecm.dms.ext.contentvalidation.component.plugin", "jar", dmsversion)).
    addDependency(new Project("org.exoplatform.ecm.dms.ext.contentvalidation", "exo.ecm.dms.ext.contentvalidation.component.workflowPublication", "jar", dmsversion)).
    addDependency(new Project("org.exoplatform.ecm.dms.ext.contentvalidation", "exo.ecm.dms.ext.contentvalidation.component.webui", "jar", dmsversion)).
    addDependency(new Project("rome", "rome", "jar", "0.8")) .
    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")).
    addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2"));
  
  module.application = {}
  module.application.rest = new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.publication","jar", dmsversion).
  	addDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3.2"));
  
  module.component={}
  module.component.web=
    new Project("org.exoplatform.company", "company.component.web", "jar", module.version).
    addDependency(portal.component.web);
  module.webui = {}
  module.webui.eXo = new Project("org.exoplatform.portal", "exo.portal.webui.eXo", "jar", "2.5.3.CWI_1");
  //module.webui.eXo.deployName = "exoadmin" ;
  module.web = {}  
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

  module.eXoApplication = {}  
  module.eXoApplication.calendar = 
    new Project("org.exoplatform.company", "exo.company.cs.eXoApplication.calendar.webapp", "war", module.version).
      addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.calendar.service", "jar",  csversion)).
	  addDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3.2")).
	  addDependency(ws.frameworks.cometd).
	  addDependency(new Project("rome", "rome", "jar", "0.8")).
	  addDependency(new Project("jdom", "jdom", "jar", "1.0")).
      addDependency(new Project("ical4j", "ical4j", "jar", "1.0-beta5")) ;
  module.eXoApplication.calendar.deployName = "calendar";

  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.company", "company.server.tomcat.patch", "jar", module.version);

  return module;
}
