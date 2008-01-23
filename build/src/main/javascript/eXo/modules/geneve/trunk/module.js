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
  module.relativeMavenRepo = "org/exoplatform/geneve" ;
  module.relativeSRCRepo = "geneve/website_poc/trunk" ;
  module.name = "geneve" ;
    
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.geneve", "geneve.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "genevePortletWeb" ;
    
  module.web = {}
  module.web.geneveResources = new Project("org.exoplatform.geneve", "geneve.web.geneveResources", "war", module.version);
  module.web.geneveResources.deployName = "geneveResources" ;

  module.web.geneveportal = 
    new Project("org.exoplatform.geneve", "geneve.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  module.server = {}
  
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.geneve", "geneve.server.tomcat.patch", "jar", module.version);
  return module;
}