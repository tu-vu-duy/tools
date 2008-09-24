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
  module.relativeMavenRepo =  "org/exoplatform/intranet" ;
  module.relativeSRCRepo =  "intranet/trunk" ;
  module.name =  "intranet" ;
       
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.intranet", "intranet.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "intranetPortletWeb" ;
  
  module.web = {} ;
  module.web.eXoResources = new Project("org.exoplatform.intranet", "intranet.web.intranetResources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesIntranet" ;
      
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.intranet", "intranet.server.tomcat.patch", "jar", module.version);

  module.web.portal = 
    new Project("org.exoplatform.intranet", "exo.intranet.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .

    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web).
    addDependency(ecm.web.rest);
    

  return module;
}
