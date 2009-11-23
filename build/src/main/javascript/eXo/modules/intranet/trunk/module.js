eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var ws = params.ws;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var module = new Module();

  module.version = "2.0-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/intranet" ;
  module.relativeSRCRepo =  "intranet/trunk" ;
  module.name =  "intranet" ;
  
  var workflowversion = "1.0.4" ;
       
  //module.portlet = {};
  /*
  module.portlet.web = new Project("org.exoplatform.intranet", "intranet.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "intranetPortletWeb" ;
  */
  module.web = {} ;
  module.web.resources = 
	  new Project("org.exoplatform.intranet", "intranet.web.resources", "war", module.version).
	  	addDependency(new Project("org.exoplatform.webos", "exo.webos.web.webosResources", "war", "1.5.2"));
  //module.web.eXoResources.deployName = "eXoResourcesIntranet" ;
  module.web.portal = 
	  new Project("org.exoplatform.intranet", "intranet.web.portal", "exo-portal", module.version).   
	    addDependency(portal.web.eXoResources) .
	    addDependency(portal.web.eXoMacSkin) .
	    addDependency(portal.web.eXoVistaSkin) .
	    addDependency(portal.webui.portal) .
	    addDependency(jcr.frameworks.command) .
	    addDependency(jcr.frameworks.web).
	    addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.facade", "jar", workflowversion)).
	    addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.impl.jbpm.engine", "jar", "3.0")).
	    addDependency(new Project("org.exoplatform.ecm.workflow", "exo.ecm.workflow.component.workflow.api", "jar", workflowversion)).
	    addDependency(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.payraise", "jar", workflowversion)).
	    addDependency(new Project("org.exoplatform.ecm.workflow.bp", "exo.ecm.workflow.bp.jbpm.holiday", "jar", workflowversion));
  
  module.component = {};
  module.component.ldap = 
	  new Project("org.exoplatform.intranet", "intranet.component.ldap", "jar", module.version).
	    addDependency(new Project("commons-codec", "commons-codec", "jar", "1.3"));
  
  module.component.organization= 
	  new Project("org.exoplatform.intranet", "intranet.component.organization.initializer", "jar", module.version);
  
/*  
  module.zoho = new Project("org.exoplatform.intranet", "zoho.webapp", "war", module.version).
  		addDependency(new Project("commons-fileupload", "commons-fileupload", "jar", "1.1")).
  		addDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0")).
  		addDependency(new Project("commons-io", "commons-io", "jar", "1.4")).
  		addDependency(new Project("org.exoplatform.intranet", "zoho.service", "jar", module.version));
  module.zoho.deployName = "zoho" ;
      
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.intranet", "intranet.server.tomcat.patch", "jar", module.version);

  
    
*/
  return module;
}
