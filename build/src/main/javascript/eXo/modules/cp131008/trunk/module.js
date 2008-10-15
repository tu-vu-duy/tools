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
  module.relativeMavenRepo =  "org/exoplatform/cp131008" ;
  module.relativeSRCRepo =  "cp131008/trunk" ;
  module.name =  "cp131008" ;
       
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cp131008", "cp131008.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "cp131008PortletWeb" ;
  
  module.web = {} ;
  module.web.eXoResources = new Project("org.exoplatform.cp131008", "cp131008.web.cp131008Resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp131008" ;
      
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cp131008", "cp131008.server.tomcat.patch", "jar", module.version);

  module.web.portal = 
    new Project("org.exoplatform.cp131008", "exo.cp131008.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .

    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web).
    addDependency(ecm.web.rest);
    

  return module;
}
