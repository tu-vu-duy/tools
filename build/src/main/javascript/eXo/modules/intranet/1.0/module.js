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

  module.version = "1.0" ;
  module.relativeMavenRepo =  "org/exoplatform/intranet" ;
  module.relativeSRCRepo =  "intranet/tags/1.0" ;
  module.name =  "intranet" ;
       
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.intranet", "intranet.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "intranetPortletWeb" ;
  
  module.web = {} ;
  module.web.eXoResources = new Project("org.exoplatform.intranet", "intranet.web.intranetResources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesIntranet" ;
  
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
