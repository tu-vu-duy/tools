eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ecm = params.ecm ;
 // var cs = params.cs ;
  var ws = params.ws;
  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/cp130608" ;
  module.relativeSRCRepo =  "cp130608/trunk" ;
  module.name =  "cp130608" ;
       
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cp130608", "cp130608.portlet.web", "exo-portlet", module.version).
  addDependency(new Project("org.exoplatform.cp130608", "be.wallonie.refsrc.component.manageselectbox", "jar", module.version)).
  addDependency(new Project("org.exoplatform.cp130608", "be.wallonie.refsrc.component.grouplistener", "jar", module.version));
  module.portlet.web.deployName = "cp130608PortletWeb" ;
  
  module.portlet.Refsrc = new Project("org.exoplatform.cp130608", "cp130608.portlet.Refsrc", "exo-portlet", module.version);
  module.portlet.Refsrc.deployName = "cp130608PortletRefsrc" ;
  
  module.component = {} ;
  module.component.web=
    new Project("org.exoplatform.cp130608", "cp130608.component.web", "jar", module.version).
    addDependency(portal.component.web) ;
      
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cp130608", "cp130608.server.tomcat.patch", "jar", module.version);

  module.web = {}
  module.web.portal = 
    new Project("org.exoplatform.cp130608", "exo.cp130608.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
  //  addDependency(cs.web.csResources) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web).
    addDependency(ecm.web.rest);
    
  module.web.eXoResources = new Project("org.exoplatform.cp130608", "cp130608.web.resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp130608" ;

  return module;
}
