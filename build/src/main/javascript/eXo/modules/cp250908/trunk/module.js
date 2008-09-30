eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ecm = params.ecm ;
  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/cp250908" ;
  module.relativeSRCRepo =  "cp250908/trunk" ;
  module.name =  "cp250908" ;
       
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cp250908", "cp250908.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "cp250908PortletWeb" ;
  
  module.web = {} ;
  module.web.eXoResources = new Project("org.exoplatform.cp250908", "cp250908.web.cp250908Resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp250908" ;
      
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cp250908", "cp250908.server.tomcat.patch", "jar", module.version);

  module.web.portal = 
    new Project("org.exoplatform.cp250908", "exo.cp250908.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .

    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web).
    addDependency(ecm.web.rest);
    

  return module;
}
