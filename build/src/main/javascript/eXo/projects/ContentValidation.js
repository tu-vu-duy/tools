eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.projects.Project");

function ContentValidation(contentValidationName, contentValidationVersion) {  
  this.name = contentValidationName;
  this.version = contentValidationVersion;
  this.workflowVersion = "2.3-SNAPSHOT";   
}

ContentValidation.prototype.configContentValidation = function(product) {  	
	eXo.System.info("INFO", "I AM IN CONTENT VALIDATION : ");
	product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.plugin", "jar", this.version));
  product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.workflowPublication", "jar", this.version));	        
	product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.api", "jar", this.workflowVersion));
	if(this.name == "jbpm") {
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.content.backup", "jar", this.workflowVersion));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.content.validation", "jar", this.workflowVersion));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.facade", "jar", this.workflowVersion));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.engine", "jar", this.workflowVersion));
	} else if(this.name == "bonita") {
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.bonita.content.backup", "jar", this.workflowVersion));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.bonita.content.validation", "jar", this.workflowVersion));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.bonita", "jar", this.workflowVersion));
	}	  
}
eXo.projects.ContentValidation = ContentValidation.prototype.constructor;
