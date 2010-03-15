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
	var cs = params.cs;
  var module = new Module();

  module.version = "2.0.6" ;
  module.relativeMavenRepo =  "org/exoplatform/cp040608" ;
  module.relativeSRCRepo =  "cp040608/tags/2.0.6" ;
  module.name =  "cp040608" ;
  
  module.portlet = {} ;
  module.portlet.web = new Project("org.exoplatform.cp040608", "cp040608.portlet.web", "exo-portlet", module.version).
  		addDependency(new Project("org.exoplatform.cp040608", "cp040608.component.rest", "jar",  module.version)).
  		addDependency(new Project("org.exoplatform.cp040608", "cp040608.component.services", "jar",  module.version)).
  		addDependency(new Project("org.sc.dao", "sc_dao", "jar",  "1.1")).
		addDependency(new Project("org.exoplatform.cp040608.config.ext.contentvalidation.bp", "cp040608.ext.contentvalidation.bp.jbpm.content.validation", "jar", module.version)).
		addDependency(new Project("org.exoplatform.cp040608.config.ext.contentvalidation", "cp040608.ext.contentvalidation.component.workflowValidation", "jar", module.version));
  		
  module.portlet.web.deployName = "cp040608PortletWeb" ;
  
  module.portlet.ecm = new Project("org.exoplatform.cp040608", "cp040608.portlet.ecm", "exo-portlet", module.version).
  		addDependency(ecm.portlet.dms);
  module.portlet.ecm.deployName = "ecm" ;
  
  module.portlet.calendar = new Project("org.exoplatform.cp040608", "cp040608.portlet.calendar", "exo-portlet", module.version).
     	addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.calendar.service", "jar",  cs.version)) ; 
  module.portlet.calendar.deployName = "calendar" ;
  
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

  return module;
}
