eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var ws = params.ws;
  var portal = params.portal;

  var module = new Module();

  module.version = "2.0" ;
  module.relativeMavenRepo =  "org/exoplatform/cg38" ;
  module.relativeSRCRepo =  "cg38/ecm/2.0" ;
  module.name =  "ecm" ;
    
  module.connector = {};
  module.connector.fckeditor = 
     new Project("org.exoplatform.cg38", "exo.ecm.connector.fckeditor", "jar", module.version);
    
  module.portlet = {}
  module.portlet.ecm = 
    new Project("org.exoplatform.cg38", "exo.ecm.portlet.ecm", "exo-portlet", module.version).
    addDependency(new Project("org.exoplatform.cg38", "exo.ecm.component.cms", "jar",  module.version)) . 
    addDependency(new Project("rome", "rome", "jar", "0.8")) .
    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")) ;
//    addDependency(new Project("javax.xml.stream", "stax-api", "jar", "1.0")) ;    

  module.portlet.workflow = 
    new Project("org.exoplatform.cg38", "exo.ecm.portlet.workflow", "exo-portlet", module.version).
    addDependency(new Project("org.exoplatform.cg38", "exo.ecm.component.workflow.api", "jar", module.version));     
        
  module.web = {};
  
  module.web.rest = 
    new Project("org.exoplatform.cg38", "exo.ecm.web.rest", "war", module.version).
    addDependency(ws.frameworks.servlet);
    
  module.web.ecmportal = 
    new Project("org.exoplatform.cg38", "exo.ecm.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  module.webui = {};
  module.webui.ecm = 
    new Project("org.exoplatform.cg38", "exo.ecm.webui.ecm", "jar", module.version).
    addDependency(module.connector.fckeditor);

  module.server = {}
  
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cg38", "exo.ecm.server.tomcat.patch", "jar", module.version);
    
  return module;
}
