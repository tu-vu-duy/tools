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
  var module = new Module();

  module.version = "2.0" ;
  module.relativeMavenRepo =  "org/exoplatform/cp040608" ;
  module.relativeSRCRepo =  "cp040608/branches/2.0" ;
  module.name =  "cp040608" ;
  
  module.portlet = {} ;
  module.portlet.web = new Project("org.exoplatform.cp040608", "cp040608.portlet.web", "exo-portlet", module.version).
  		addDependency(new Project("org.exoplatform.cp040608", "cp040608.component.rest", "jar",  module.version)).
  		addDependency(new Project("org.exoplatform.cp040608", "cp040608.component.services", "jar",  module.version));
  module.portlet.web.deployName = "cp040608PortletWeb" ;
  
  module.portlet.ecm = new Project("org.exoplatform.cp040608", "cp040608.portlet.ecm", "exo-portlet", module.version).
  		addDependency(ecm.portlet.ecm);
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

  return module;
}
