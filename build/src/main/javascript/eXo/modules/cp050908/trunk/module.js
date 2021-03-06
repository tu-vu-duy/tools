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
  module.relativeMavenRepo =  "org/exoplatform/cp050908" ;
  module.relativeSRCRepo =  "cp050908/trunk" ;
  module.name =  "cp050908" ;
       
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cp050908", "cp050908.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "cp050908PortletWeb" ;
  
  module.portlet.prope = new Project("org.exoplatform.cp050908", "cp050908.portlet.prope", "exo-portlet", module.version).
  addDependency(new Project("javax.faces", "jsf-api", "jar", "1.2_04-p02")).
  addDependency(new Project("javax.faces", "jsf-impl", "jar", "1.2_04-p02")).
  addDependency(new Project("javax.servlet", "jstl", "jar", "1.2"));
 
  module.portlet.full6 = new Project("org.exoplatform.cp050908", "cp050908.portlet.full6", "exo-portlet", module.version).
  addDependency(new Project("javax.servlet", "jstl", "jar", "1.2"));  
  
  module.web = {} ;
  module.web.eXoResources = new Project("org.exoplatform.cp050908", "cp050908.web.cp050908Resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp050908" ;
  
  module.component = {} ;
  module.component.web=
    new Project("org.exoplatform.cp050908", "cp050908.component.web", "jar", module.version).
    addDependency(portal.component.web) ;
      
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cp050908", "cp050908.server.tomcat.patch", "jar", module.version);

  module.web.portal = 
    new Project("org.exoplatform.cp050908", "exo.cp050908.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .

    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web).
    addDependency(ecm.web.rest);
    

  return module;
}
