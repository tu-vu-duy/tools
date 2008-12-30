eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.projects.Project");

function ContentValidation(contentValidationName, contentValidationVersion) {  
  this.name = contentValidationName;
  this.version = contentValidationVersion;   
}

ContentValidation.prototype.configContentValidation = function(product) {  	
	eXo.System.info("INFO", "I AM IN CONTENT VALIDATION : ");
	product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.plugin", "jar", this.version));
	        
	if(this.name == "jbpm") {
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.content.backup", "jar", this.version));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.content.publishing", "jar", this.version));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.content.validation", "jar", this.version));
		
	} else if(this.name == "bonita") {
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.bonita.content.backup", "jar", this.version));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.bonita.content.validation", "jar", this.version));
    product.addServerPatch("jonas",new Project("org.exoplatform.ecm", "exo.ecm.server.jonas.patch", "jar", this.version));
	}	  
}
eXo.projects.ContentValidation = ContentValidation.prototype.constructor;
