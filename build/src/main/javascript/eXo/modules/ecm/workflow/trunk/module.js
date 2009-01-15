eXo.require("eXo.projects.Module");
eXo.require("eXo.projects.Product");
eXo.require("eXo.projects.Workflow");

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var ws = params.ws;
  var jcr = params.eXoJcr;
  var portal = params.portal;  
  var module = new Module();
  
  module.version = "1.0-SNAPSHOT";
  module.relativeMavenRepo =  "org/exoplatform/ecm/workflow";
  module.relativeSRCRepo =  "ecm/workflow/trunk";
  module.name =  "eXoWorkflow";
  this.getPortlet;  
  module.portlet = {}
  module.portlet.workflow = new Workflow("",module.version).getPortlet();
  module.web = {}
  module.web.eXoWorkflowResources = 
    new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.web.eXoWorkflowResources", "war", module.version) ;  
  module.web.eXoWorkflowResources.deployName = "eXoWorkflowResources" ;
  
  module.web.portal = 
    new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources).
    addDependency(portal.web.eXoMacSkin).
    addDependency(portal.web.eXoVistaSkin).
    addDependency(portal.webui.portal).
    addDependency(jcr.frameworks.command).
    addDependency(jcr.frameworks.web);  
    
  return module;
}

function getPortlet(version) {
    return new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.portlet.workflow", "exo-portlet", version).
	    addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.api", "jar", version)).
	    addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.webui.workflow", "jar", version)).
	    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.webui.dms", "jar", "2.3-SNAPSHOT")).
	    addDependency(new Project("rome", "rome", "jar", "0.8")).
	    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")).
	    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")).
	    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
	    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
	    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")).
	    addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2"));   
}