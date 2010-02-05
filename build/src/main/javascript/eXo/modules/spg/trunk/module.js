eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var ws = params.ws;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var dms = params.dms; 
  var wcm = params.wcm; 
  
  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/spg" ;
  module.relativeSRCRepo =  "spg/trunk" ;
  module.name =  "spg" ;
  
  // module.portlet = {} ;
  // module.portlet.web = new Project("org.exoplatform.bpi", "bpi.portlet.web", "exo-portlet", module.version).
  		// addDependency(portal.portlet.web);
  // module.portlet.web.deployName = "web" ;
  
  module.web = {};
  module.web.SPGResources = 
    new Project("org.exoplatform.spg", "spg.web.SPGResources", "war", module.version);
  
  module.portlet = {};
  
  module.portlet.exoadmin = 
    new Project("org.exoplatform.portal", "exo.portal.portlet.exoadmin", "exo-portlet", "2.5.5.SPG_x");

  module.portlet.dashboard = 
  	new Project("org.exoplatform.spg", "spg.portlet.dashboard", "war", module.version).
  	addDependency(new Project("org.exoplatform.portal", "exo.portal.component.dashboard", "jar", portal.version));
  
  module.portlet.dms = 
    new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.portlet.ecm.core.web", "war", "2.5.1.SPG_x").
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.cms", "jar",  dms.version)) .     
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.deployment", "jar",  dms.version)) .    
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.publication", "jar", dms.version)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.connector.fckeditor", "jar", dms.version)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.webui.dms", "jar", dms.version)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.webui.ext", "jar", dms.version)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.portlet.ecm.ext.config", "jar", dms.version)).
    addDependency(new Project("rome", "rome", "jar", "0.9")) .
    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")).
    addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2"));
    module.portlet.dms.deployName = "ecm";  
  
  module.web.portal = 
    new Project("org.exoplatform.spg", "spg.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;
    
  return module;
}
