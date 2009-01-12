eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.projects.Project");

function Workflow(workflowName, workflowVersion) {  
  this.name = workflowName ;
  this.version = workflowVersion;   
}

Workflow.prototype.configWorkflow = function(product) {
  print("\n\n name = " + product.name);
	if(this.name == "jbpm") {
	  //if (product.name == "eXoWorkflow") {
      product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.facade", "jar", "1.0-SNAPSHOT"));
  		product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.engine", "jar", "3.0"));
	//  } else {
	//		product.addDependencies(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.jbpm.facade", "jar", this.version));
	//		product.addDependencies(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.jbpm.engine", "jar", "3.0"));
	//  }
		//For POC using 2.0, please use this	
		//product.addDependencies(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.jbpm.facade", "jar", "2.0")) ;
    // workflow version management has been fixed. Use "product.workflowVersion" variable in your JS product descriptor	to set
    // workflow version to use (avoid problem with trunk product using branche for workflow for example)	
	} else if(this.name == "bonita") {
  	product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.bonita", "jar", "1.0-SNAPSHOT"));
		product.addDependencies(new Project("org.ow2.bonita", "bonita-api", "jar", "4.0")) ;
		product.addDependencies(new Project("org.ow2.bonita", "bonita-core", "jar", "4.0")) ;
		product.addDependencies(new Project("org.ow2.novabpm", "novaBpmIdentity", "jar", "1.0")) ;
		product.addDependencies(new Project("org.ow2.novabpm", "novaBpmUtil", "jar", "1.0")) ;
		product.addDependencies(new Project("org.jbpm", "pvm", "jar", "r2175")) ;
		
		//Add external dependencies 
		product.addDependencies(new Project("bsh", "bsh", "jar", "2.0b1")) ;
		product.addDependencies(new Project("net.sf.ehcache", "ehcache", "jar", "1.5.0")) ;
		product.addDependencies(new Project("backport-util-concurrent", "backport-util-concurrent", "jar", "3.1")) ;
		product.addDependencies(new Project("org.ow2.util.asm", "asm", "jar", "3.1"));
    //product.addServerPatch("tomcat",new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.server.tomcat.patch", "jar", this.version));
    product.addServerPatch("tomcat",new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.server.tomcat.patch", "jar", "1.0-SNAPSHOT"));
	}
}

eXo.projects.Workflow = Workflow.prototype.constructor ;
