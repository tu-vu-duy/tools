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

  module.version = "1.0.x" ;
  module.relativeMavenRepo =  "org/exoplatform/vir" ;
  module.relativeSRCRepo =  "vir/source/branches/1.0.x" ;
  module.name =  "vir" ;

  module.services = {};
  module.services.jcr = 
    new Project("org.exoplatform.jcr", "exo.jcr.component.core", "jar", "1.10.3.VIR_x").
    addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.ext", "jar", "1.10.3")).
    addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.webdav", "jar", "1.10.3")).
    addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.ftp", "jar", "1.10.3")) .
    addDependency(core.component.documents) .
    addDependency(new Project("jcr", "jcr", "jar", "1.0")).
    addDependency(new Project("concurrent", "concurrent", "jar", "1.3.4")).
    addDependency(new Project("javagroups", "jgroups-all", "jar", "2.5.2")).
    addDependency(new Project("stax", "stax-api", "jar", "1.0")).
	addDependency(new Project("org.apache.ws.commons","ws-commons-util","jar","1.0.1")).		
    addDependency(new Project("org.apache.lucene", "lucene-core", "jar", "2.2.0")).
    addDependency(new Project("org.apache.lucene", "lucene-spellchecker", "jar", "2.2.0")).
    addDependency(new Project("org.apache.lucene", "lucene-memory", "jar", "2.2.0"));
  
  module.component = {};
  
  module.component.resources = 
    new Project("org.exoplatform.portal", "exo.portal.component.resources", "jar", "2.5.3.VIR_x") ;
    
  module.component.xmlParser = 
    new Project("org.exoplatform.portal", "exo.portal.component.xml-parser", "jar", "2.5.3.VIR_x").
    addDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0")).
    addDependency(new Project("commons-codec", "commons-codec", "jar", "1.3"));
      
  module.component.scripting =
    new Project("org.exoplatform.portal", "exo.portal.component.scripting", "jar", "2.5.3.VIR_x").
    addDependency(module.component.xmlParser).
    addDependency(new Project("rhino", "js", "jar", "1.6R5")).
    addDependency(new Project("org.codehaus.groovy", "groovy-all", "jar", "1.5.7")) ;
    
  module.component.web = 
    new Project("org.exoplatform.portal", "exo.portal.component.web", "jar", "2.5.3.VIR_x").
    addDependency(module.component.scripting) ;

  module.component.portal  = 
    new Project("org.exoplatform.portal", "exo.portal.component.portal", "jar", "2.5.3.VIR_x").
    addDependency(module.component.web) ;

  module.component.applicationRegistry  = 
    new Project("org.exoplatform.portal", "exo.portal.component.application-registry", "jar", "2.5.3.VIR_x").
    addDependency(module.component.portal).
  	addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")) ;

  module.webui = {} ;
  
  module.webui.core = 
    new Project("org.exoplatform.portal", "exo.portal.webui.core", "jar", "2.5.3.VIR_x").
    addDependency(module.component.web) ;

  module.webui.eXo = 
    new Project("org.exoplatform.portal", "exo.portal.webui.eXo", "jar", "2.5.3.VIR_x").
    addDependency(module.component.applicationRegistry).
    addDependency(module.webui.core) ;
    
  module.webui.portal = 
    new Project("org.exoplatform.portal", "exo.portal.webui.portal", "jar", "2.5.3.VIR_x").
    addDependency(module.component.resources) .
    addDependency(module.webui.eXo) .    
    addDependency(kernel.container) .
    addDependency(kernel.component.common) .
    addDependency(kernel.component.remote) .
    addDependency(kernel.component.cache) .
    addDependency(kernel.component.command) .
    addDependency(core.component.database) .
    addDependency(core.component.organization) .
    addDependency(core.component.organization.ldap) .
    addDependency(core.component.ldap) .
    addDependency(core.component.security.core) .
    addDependency(core.component.xmlProcessing) .
    addDependency(core.component.documents).
    addDependency(core.component.resources).
    addDependency(core.component.gifbackport).
    addDependency(module.services.jcr).
    addDependency(eXoPortletContainer.services.jsr168jsr286).
    addDependency(eXoPortletContainer.web.wsrp) ;
  
  module.web = {};
  module.web.VIRResources = 
    new Project("org.exoplatform.vir", "vir.web.VIRResources", "war", module.version).
    addDependency(new Project("org.exoplatform.portal", "exo.portal.web.eXoResources", "war", "2.5.3.VIR_x")).
    addDependency(portal.web.eXoMacSkin).
    addDependency(portal.web.eXoVistaSkin);
           
  module.web.portal = 
    new Project("org.exoplatform.vir", "vir.web.portal", "exo-portal", module.version);
    
  module.web.eXoWCMResources = 
    new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.web.eXoWCMResources", "war", "1.1.0.VIR_x");
  module.web.eXoWCMResources.deployName = "eXoWCMResources" ;
  
  module.portlet = {};
  
  module.portlet.report = 
    new Project("org.exoplatform.vir", "vir.portlet.report", "exo-portlet", module.version);
  
  module.portlet.webpresentation = 
    new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.portlet.web-presentation", "exo-portlet", "1.1.0.VIR_x").       
    addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.connector.fckeditor", "jar",  wcm.version)).
    addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.component.wcm", "jar",  "1.1.0.VIR_x")).
    addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.webui.wcm", "jar",  "1.1.0.VIR_x")).
    addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.component.publication", "jar",  "1.1.0.VIR_x")).    
    addDependency(ws.frameworks.json) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web).
    addDependency(module.webui.portal);
  module.portlet.webpresentation.deployName = "web-presentation" ;  
  
  module.portlet.websearches = 
    new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.portlet.web-searches", "exo-portlet", "1.1.0.VIR_x").    
    addDependency(new Project("org.exoplatform.ecm.wcm", "exo.ecm.wcm.component.search", "jar",  "1.1.0.VIR_x"));
  module.portlet.websearches.deployName = "web-searches" ;  

  module.portlet.dms = 
    new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.portlet.ecm", "exo-portlet", "2.3.1.VIR_x").
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.cms", "jar",  "2.3.1.VIR_x")) .     
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.deployment", "jar",  "2.3.1.VIR_x")) .    
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.publication", "jar", "2.3.1.VIR_x")).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.connector.fckeditor", "jar", dms.version)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.webui.dms", "jar", "2.3.1.VIR_x")).
    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")).
    addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2"));
  module.portlet.dms.deployName = "ecm" ;
    
       
  return module;
}