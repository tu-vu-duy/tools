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
  module.relativeMavenRepo = "org/exoplatform/eurofer2" ;
  module.relativeSRCRepo = "eurofer/extranet/trunk" ;
  module.name = "eurofer" ;
    
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.eurofer2", "eurofer2.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "euroferWeb" ;
    
  module.web = {}
  module.web.euroferResources = new Project("org.exoplatform.eurofer2", "eurofer2.web.euroferResources", "war", module.version);
  module.web.euroferResources.deployName = "euroferResources" ;

  module.web.euroferportal = 
    new Project("org.exoplatform.eurofer2", "eurofer2.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  return module;
}


