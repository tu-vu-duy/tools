eXo.require("eXo.core.IOUtil") ;
eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.projects.Project");

function Workflow(workflowName, workflowVersion) {  
  this.name = workflowName;
  this.version = workflowVersion;   
}

Workflow.prototype.configWorkflow = function(product) {

  product.addDependencies(this.getPortlet());
	if(this.name == "jbpm") {
  	product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.facade", "jar", this.version));
 		product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.engine", "jar", "3.0"));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.payraise", "jar", this.version));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.holiday", "jar", this.version));
		if (product.useContentvalidation) {
		  product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.jbpmconfig", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.jbpm.content.validation", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.jbpm.content.backup", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.jbpm.content.publishing", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.plugin", "jar", this.version));
      product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.workflowPublication", "jar", this.version));
      product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.webui", "jar", this.version));
		}
	} else if(this.name == "bonita") {
		product.addDependencies(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.bonita", "jar", this.version));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.bonita.holiday", "jar", this.version));
		product.addDependencies(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.bonita.payraise", "jar", this.version));
		if (product.useContentvalidation) {
		  product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.plugin", "jar", this.version));
      product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.workflowPublication", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.bonitaconfig", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.bonita.content-publishing", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.bonita.content.backup", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation.bp", "exo.ecm.contentvalidation.bp.bonita.content.validation", "jar", this.version));
			product.addDependencies(new Project("org.exoplatform.ecm.contentvalidation", "exo.ecm.contentvalidation.component.webui", "jar", this.version));
		}
		
		product.addDependencies(new Project("org.ow2.bonita", "bonita-api", "jar", "4.0"));
		product.addDependencies(new Project("org.ow2.bonita", "bonita-core", "jar", "4.0"));
		product.addDependencies(new Project("org.ow2.novabpm", "novaBpmIdentity", "jar", "1.0"));
		product.addDependencies(new Project("org.ow2.novabpm", "novaBpmUtil", "jar", "1.0"));
		product.addDependencies(new Project("org.jbpm", "pvm", "jar", "r2175"));
		
		//Add external dependencies 
		product.addDependencies(new Project("bsh", "bsh", "jar", "2.0b1"));
		product.addDependencies(new Project("net.sf.ehcache", "ehcache", "jar", "1.5.0"));
		product.addDependencies(new Project("backport-util-concurrent", "backport-util-concurrent", "jar", "3.1"));
		product.addDependencies(new Project("org.ow2.util.asm", "asm", "jar", "3.1"));
		product.addServerPatch("tomcat",new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.server.tomcat.patch", "jar", this.version));
	}
}

Workflow.prototype.getPortlet = function() {
    return new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.portlet.workflow", "exo-portlet", this.version).
	    addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.api", "jar", this.version)).
	    addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.webui.workflow", "jar", this.version)).
	    addDependency(new Project("rome", "rome", "jar", "0.8")).
	    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")).
	    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
	    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
	    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0"));
}

eXo.projects.Workflow = Workflow.prototype.constructor ;
