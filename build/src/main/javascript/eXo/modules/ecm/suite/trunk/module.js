eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var dms = params.dms ;
  var workflow = params.workflow ;
  var wcm = params.wcm ;
  var ws = params.ws;
  var module = new Module();

  module.version = "1.0.1-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/ecm/suite" ;
  module.relativeSRCRepo =  "suite/trunk" ;
  module.name =  "ecm-suite" ;
       
  module.web = {}
  module.web.ecmsuiteportal = 
    new Project("org.exoplatform.ecm.suite", "ecmsuite-portalweb", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources).
    addDependency(portal.web.eXoMacSkin).
    addDependency(portal.web.eXoVistaSkin).
    addDependency(portal.webui.portal).
    addDependency(jcr.frameworks.command).
    addDependency(jcr.frameworks.web).
    addDependency(portal.web.rest);
  module.web.ecmsuiteportal.deployName = "portal" ;

  module.tomcat = {}
  module.tomcat.patch =
    new Project("org.exoplatform.ecm.suite", "ecm-suite-tomcat-patch", "jar", module.version);
  
  return module;
}
