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
  
  module.version = "2.3rc1" ;
  module.relativeMavenRepo =  "org/exoplatform/ecm/dms" ;
  module.relativeSRCRepo =  "ecm/dms/tags/2.3rc1" ;
  module.name =  "dms" ;
    
  module.portlet = {}
  module.portlet.dms = 
    new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.portlet.ecm", "exo-portlet", module.version).
    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.component.cms", "jar",  module.version)) .     
    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.component.deployment", "jar",  module.version)) .    
    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.component.publication", "jar", module.version)).
    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.connector.fckeditor", "jar", module.version)).
    addDependency(new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.webui.dms", "jar", module.version)).
    addDependency(new Project("rome", "rome", "jar", "0.8")) .
    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")).
    addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2")) ;
  
  
  module.portlet.jcr_console = 
    new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.portlet.jcr-console", "exo-portlet", module.version).
    addDependency(new Project("exo-weblogic", "exo-weblogic-authproviders", "jar", "1.0")).
	  addDependency(new Project("exo-weblogic", "exo-weblogic-loginmodule", "jar", "1.0")).  
	  addDependency(new Project("commons-logging", "commons-logging", "jar", "1.0.4"));
  
  module.web = {}
  module.web.eXoDMSResources = 
    new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.web.eXoDMSResources", "war", module.version) ;  
  module.web.eXoDMSResources.deployName = "eXoDMSResources" ;
      
  module.web.dmsportal = 
    new Project("org.exoplatform.ecm.dms", "exo.ecm.dms.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;   
  
  return module;
}
