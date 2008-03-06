eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ecm = params.ecm;

  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo = "org/exoplatform/spff" ;
  module.relativeSRCRepo = "spff/internet/trunk" ;
  module.name = "spff" ;
    
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.spff", "spff.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "spffWeb" ;
    
  module.web = {}
  module.web.spffResources = new Project("org.exoplatform.spff", "spff.web.spffResources", "war", module.version);
  module.web.spffResources.deployName = "spffResources" ;

  module.web.spffportal = 
    new Project("org.exoplatform.spff", "spff.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
//	addDependency(portal.web.eXoVistaSkin) .
//	addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  module.server = {}
  
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.spff", "spff.server.tomcat.patch", "jar", module.version);

  return module;
}


