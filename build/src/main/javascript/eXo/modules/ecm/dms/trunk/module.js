eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var ws = params.ws;
  var jcr = params.eXoJcr;
  var portal = params.portal;  
  var module = new Module();
  
  module.version = "2.3-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/ecm/dms" ;
  module.relativeSRCRepo =  "ecm/dms/trunk" ;
  module.name =  "dms" ;
    
  module.portlet = {}
  module.portlet.dms = 
    new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.portlet.ecm", "exo-portlet", module.version).
    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.component.cms", "jar",  module.version)) .     
    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.component.deployment", "jar",  module.version)) .    
    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.component.publication", "jar", module.version)).
    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.connector.fckeditor", "jar", module.version)).
    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.webui.ecm", "jar", module.version)).
    addDependency(new Project("rome", "rome", "jar", "0.8")) .
    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")).
    addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2")) ;
  
  module.web = {}
  module.web.eXoECMResources = 
    new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.web.eXoECMResources", "war", module.version) ;  
  module.web.eXoECMResources.deployName = "eXoECMResources" ;
      
  module.web.ecmportal = 
    new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;   
  
  return module;
}
