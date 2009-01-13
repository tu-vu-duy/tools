eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.projects.Project");

function WorkflowPlugin(workflowName, workflowVersion) {  
  this.name = workflowName ;
  this.version = workflowVersion;   
}

WorkflowPlugin.prototype.configWorkflowPlugin = function(product) {
  
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.6") ;
  var core = Module.GetModule("core/tags/2.1.3") ;
  var ws = Module.GetModule("ws/tags/1.3.1");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.4", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.1", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var workflow = Module.GetModule("ecm/workflow/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
  
  product.addDependencies(workflow.portlet.workflow);
  product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.plugin", "jar", "1.0-SNAPSHOT"));
  product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.workflowPublication", "jar", "1.0-SNAPSHOT"));	
  product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.webui.workflow", "jar", "1.0-SNAPSHOT"));
  
	if(this.name == "jbpm") {
	  product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.jbpmconfig", "jar", "1.0-SNAPSHOT"));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.payraise", "jar", "1.0-SNAPSHOT"));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.holiday", "jar", "1.0-SNAPSHOT"));
		product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.jbpm.content.validation", "jar", "1.0-SNAPSHOT"));
		product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.jbpm.content.backup", "jar", "1.0-SNAPSHOT"));
		//For POC using 2.0, please use this	
		//product.addDependencies(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.jbpm.facade", "jar", "2.0")) ;
    // workflow version management has been fixed. Use "product.workflowVersion" variable in your JS product descriptor	to set
    // workflow version to use (avoid problem with trunk product using branche for workflow for example)	
	} else if(this.name == "bonita") {
		product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.bonitaconfig", "jar", "1.0-SNAPSHOT"));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.bonita", "jar", "1.0-SNAPSHOT"));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.bonita.holiday", "jar", "1.0-SNAPSHOT")) ;
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.bonita.payraise", "jar", "1.0-SNAPSHOT")) ;
	}
}

eXo.projects.WorkflowPlugin = WorkflowPlugin.prototype.constructor ;
