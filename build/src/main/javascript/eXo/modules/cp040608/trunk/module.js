eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ecm = params.ecm ;
  var ws = params.ws;
  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/cp040608" ;
  module.relativeSRCRepo =  "cp040608/trunk" ;
  module.name =  "cp040608" ;
       
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cp040608", "cp040608.portlet.web", "exo-portlet", module.version).
  		addDependency(new Project("org.exoplatform.cp040608", "cp040608.component.rest", "jar",  module.version)).
  		addDependency(new Project("org.exoplatform.cp040608", "cp040608.component.services", "jar",  module.version));
  module.portlet.web.deployName = "cp040608PortletWeb" ;
	
  module.web = {} ;
  module.web.eXoResources = new Project("org.exoplatform.cp040608", "cp040608.web.cp040608Resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp040608" ;
  
  module.component = {} ;
  module.component.web=
    new Project("org.exoplatform.cp040608", "cp040608.component.web", "jar", module.version).
    addDependency(portal.component.web) ;
      
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cp040608", "cp040608.server.tomcat.patch", "jar", module.version);

  module.web.portal = 
    new Project("org.exoplatform.cp040608", "cp040608.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web).
    addDependency(ecm.web.rest);
    

  return module;
}
