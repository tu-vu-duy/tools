eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.projects.Project");

function Workflow(workflowName, workflowVersion) {  
  this.name = workflowName ;
  this.version = workflowVersion;   
}

Workflow.prototype.configWorkflow = function(product) {
  var tool =  Module.GetModule("tools/trunk") ;
  var kernel = Module.GetModule("kernel/tags/2.0.6") ;
  var core = Module.GetModule("core/tags/2.1.3") ;
  var ws = Module.GetModule("ws/tags/1.3.1");
  var eXoPortletContainer = Module.GetModule("portlet-container/tags/2.0.4", {kernel : kernel, core : core}) ;
  var eXoJcr = Module.GetModule("jcr/tags/1.10.1", {kernel : kernel, core : core, ws : ws}) ;
  var portal = Module.GetModule("portal/tags/2.5.1", {kernel : kernel, ws:ws, core : core, eXoPortletContainer : eXoPortletContainer, eXoJcr : eXoJcr });
  var workflow = Module.GetModule("ecm/workflow/trunk", {kernel : kernel, core : core, eXoPortletContainer : eXoPortletContainer, ws : ws, eXoJcr : eXoJcr, portal : portal});
    
  product.addDependencies(workflow.portlet.workflow);
  
	if(this.name == "jbpm") {
  	product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.facade", "jar", this.version));
 		product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.engine", "jar", "3.0"));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.payraise", "jar", "1.0-SNAPSHOT"));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.holiday", "jar", "1.0-SNAPSHOT"));
		if (product.useContentvalidation) {
		  product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.jbpmconfig", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.jbpm.content.validation", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.jbpm.content.backup", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.jbpm.content.publishing", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.plugin", "jar", this.version));
      product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.workflowPublication", "jar", this.version));
		}
	} else if(this.name == "bonita") {
		product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.bonita", "jar", this.version));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.bonita.holiday", "jar", this.version)) ;
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.bonita.payraise", "jar", this.version)) ;
		if (product.useContentvalidation) {
		  product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.plugin", "jar", this.version));
      product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.workflowPublication", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.bonitaconfig", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.bonita.content-publishing", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.bonita.content.backup", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.bonita.content.validation", "jar", this.version));
		}
		
		product.addDependencies(new Project("org.ow2.bonita", "bonita-api", "jar", "4.0"));
		product.addDependencies(new Project("org.ow2.bonita", "bonita-core", "jar", "4.0"));
		product.addDependencies(new Project("org.ow2.novabpm", "novaBpmIdentity", "jar", "1.0"));
		product.addDependencies(new Project("org.ow2.novabpm", "novaBpmUtil", "jar", "1.0"));
		product.addDependencies(new Project("org.jbpm", "pvm", "jar", "r2175"));
		
		//Add external dependencies 
		product.addDependencies(new Project("bsh", "bsh", "jar", "2.0b1")) ;
		product.addDependencies(new Project("net.sf.ehcache", "ehcache", "jar", "1.5.0")) ;
		product.addDependencies(new Project("backport-util-concurrent", "backport-util-concurrent", "jar", "3.1")) ;
		product.addDependencies(new Project("org.ow2.util.asm", "asm", "jar", "3.1"));
		product.addServerPatch("tomcat",new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.server.tomcat.patch", "jar", "1.0-SNAPSHOT"));
	}
}

eXo.projects.Workflow = Workflow.prototype.constructor ;
