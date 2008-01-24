eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.projects.Project");

function Workflow(workflowName, workflowVersion) {  
  this.name = workflowName ;
  this.version = workflowVersion;   
}

Workflow.prototype.configWorkflow = function(product) {  
	if(this.name == "jbpm") {
		product.addDependencies(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.jbpm.facade", "jar", this.version)) ;
		product.addDependencies(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.jbpm.engine", "jar", "3.0")) ;
		//For POC using 2.0, please use this	
		//product.addDependencies(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.jbpm.facade", "jar", "2.0")) ;		
	} else if(this.name = "bonita") {
		product.addDependencies(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.bonita", "jar", this.version)) ;
		product.addDependencies(new Project("org.objectweb.bonita", "bonita-client", "jar", "3.0")) ;
    product.addDependencies(new Project("org.objectweb.bonita", "bonita", "exo-ear-jar", "3.0")) ;
    product.addDependencies(new Project("org.objectweb.bonita", "config", "exo-ear-rar", "3.0")) ;
    product.addDependencies(new Project("org.objectweb.bonita", "bonita_ws", "war", "3.0")) ;
    product.addDependencies(new Project("org.objectweb.bonita", "jabber", "exo-ear-rar", "3.0")) ;
    product.addDependencies(new Project("org.objectweb.bonita", "loadclass", "exo-ear-rar", "3.0")) ;
    product.addServerPatch("jonas",new Project("org.exoplatform.ecm", "exo.ecm.server.jonas.patch", "jar", this.version)) ;
	}	  
}

eXo.projects.Workflow = Workflow.prototype.constructor ;
