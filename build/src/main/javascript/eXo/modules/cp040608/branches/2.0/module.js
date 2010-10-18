eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
	var ws = params.ws;
	var ecm = params.ecm;
	var workflow = params.workflow;
  var module = new Module();

  module.version = "2.0.14-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/cp040608" ;
  module.relativeSRCRepo =  "cp040608/branches/2.0" ;
  module.name =  "cp040608" ;
  
  module.portlet = {} ;
  module.portlet.web = new Project("org.exoplatform.cp040608", "cp040608.portlet.web", "exo-portlet", module.version).
  		addDependency(new Project("org.exoplatform.cp040608", "cp040608.component.rest", "jar",  module.version)).
  		addDependency(new Project("org.exoplatform.cp040608", "cp040608.component.services", "jar",  module.version)).
  		addDependency(new Project("org.sc.dao", "sc_dao", "jar",  "1.1")).
		addDependency(new Project("org.exoplatform.cp040608.config.ext.contentvalidation.bp", "cp040608.ext.contentvalidation.bp.jbpm.content.validation", "jar", module.version)).
		addDependency(new Project("org.exoplatform.cp040608.config.ext.contentvalidation", "cp040608.ext.contentvalidation.component.workflowValidation", "jar", module.version)).
	addDependency(new Project("org.exoplatform.cp040608.config.ext.contentvalidation.bp", "cp040608.ext.contentvalidation.bp.jbpm.content.backup", "jar", module.version)).
	addDependency(new Project("org.exoplatform.cp040608.config.ext.contentvalidation", "cp040608.ext.contentvalidation.component.workflowBackup", "jar", module.version));
  		
  module.portlet.web.deployName = "cp040608PortletWeb" ;
  
  module.portlet.ecm = new Project("org.exoplatform.cp040608", "cp040608.portlet.ecm", "exo-portlet", module.version).
  	addDependency(ecm.portlet.dms).
	addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.facade", "jar", workflow.version)).
	addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.engine", "jar", "3.0")).
	addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.api", "jar", workflow.version)).
	addDependency(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.payraise", "jar", workflow.version)).
	addDependency(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.holiday", "jar", workflow.version)).
	addDependency(new Project("org.exoplatform.ecm.dms.ext.contentvalidation", "exo.ecm.dms.ext.contentvalidation.component.jbpmconfig", "jar", ecm.version)).
	addDependency(new Project("org.exoplatform.ecm.dms.ext.contentvalidation.bp", "exo.ecm.dms.ext.contentvalidation.bp.jbpm.content.publishing", "jar", ecm.version)).
	addDependency(new Project("org.exoplatform.ecm.dms.ext.contentvalidation", "exo.ecm.dms.ext.contentvalidation.component.plugin", "jar", ecm.version)).
    addDependency(new Project("org.exoplatform.ecm.dms.ext.contentvalidation", "exo.ecm.dms.ext.contentvalidation.component.workflowPublication", "jar", ecm.version)).
    addDependency(new Project("org.exoplatform.ecm.dms.ext.contentvalidation", "exo.ecm.dms.ext.contentvalidation.component.webui", "jar", ecm.version));
	
  module.portlet.ecm.deployName = "ecm" ;
  
  /*module.component = {} ;
  module.component.web=
    new Project("org.exoplatform.cp040608", "cp040608.component.web", "jar", module.version).
    addDependency(portal.component.web) ;
  */
  module.web = {} ;
  module.web.eXoResources = new Project("org.exoplatform.cp040608", "cp040608.web.cp040608Resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp040608" ;
       
  module.web.portal = 
    new Project("org.exoplatform.cp040608", "exo.cp040608.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web);
	
	module.ext = {} ;
  return module;
}