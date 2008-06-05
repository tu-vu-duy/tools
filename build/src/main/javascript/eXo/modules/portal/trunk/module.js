eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var ws = params.ws;
  var module = new Module();

  module.version =  "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/portal" ;
  module.relativeSRCRepo =  "portal/trunk" ;
  module.name =  "portal" ;
    
  module.component = {}
  module.component.portal  = 
    new Project("org.exoplatform.portal", "exo.portal.component.portal", "jar", module.version) ;
  module.component.web = 
    new Project("org.exoplatform.portal", "exo.portal.component.web", "jar", module.version) ;
  module.component.applicationRegistry  = 
    new Project("org.exoplatform.portal", "exo.portal.component.application-registry", "jar", module.version).
  addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")) ;
  module.component.resources = 
    new Project("org.exoplatform.portal", "exo.portal.component.resources", "jar", module.version) ;
      
  module.component.xmlParser = 
    new Project("org.exoplatform.portal", "exo.portal.component.xml-parser", "jar", module.version).
    addDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0")).
    addDependency(new Project("commons-codec", "commons-codec", "jar", "1.3"));
     
  module.component.scripting =
    new Project("org.exoplatform.portal", "exo.portal.component.scripting", "jar", module.version).
    addDependency(new Project("rhino", "js", "jar", "1.6R5")) ;

  module.webui = {};
  module.webui.core = 
    new Project("org.exoplatform.portal", "exo.portal.webui.core", "jar", module.version) ;
  module.webui.eXo = 
    new Project("org.exoplatform.portal", "exo.portal.webui.eXo", "jar", module.version) ;

  module.webui.portal = 
    new Project("org.exoplatform.portal", "exo.portal.webui.portal", "jar", module.version).
    addDependency(module.webui.core) .
    addDependency(module.webui.eXo) .
    addDependency(module.component.web).
    addDependency(module.component.resources) .
    addDependency(module.component.applicationRegistry) .
    addDependency(module.component.portal).
    addDependency(module.component.xmlParser).
    addDependency(module.component.scripting). 
    
    addDependency(kernel.container) .
    addDependency(kernel.component.common) .
    addDependency(kernel.component.remote) .
    addDependency(kernel.component.cache) .
    addDependency(kernel.component.command) .
    
    addDependency(core.component.common) .
    addDependency(core.component.database) .
    addDependency(core.component.organization) .
    addDependency(core.component.security.core) .
    addDependency(core.component.xmlProcessing) .
    addDependency(core.component.documents).
    addDependency(core.component.resources).

  	addDependency(ws.frameworks.cometd).

    addDependency(jcr.services.jcr).

    addDependency(eXoPortletContainer.services.jsr168jsr286).
    addDependency(eXoPortletContainer.web.wsrp) ;
    

  module.portlet = {};
    
  module.portlet.exoadmin = 
    new Project("org.exoplatform.portal", "exo.portal.portlet.exoadmin", "exo-portlet", module.version);
        
  module.portlet.web = 
    new Project("org.exoplatform.portal", "exo.portal.portlet.web", "exo-portlet", module.version);

	module.portlet.dashboard = 
    new Project("org.exoplatform.portal", "exo.portal.portlet.dashboard", "exo-portlet", module.version);
	
  module.sample = {};
  module.sample.framework = 
    new Project("org.exoplatform.portal", "exo.portal.sample.framework", "war", module.version);
  module.sample.framework.deployName = "eXoSampleFramework" ;
    
  module.eXoWidget = {};
  module.eXoWidget.web = 
    new Project("org.exoplatform.portal", "exo.portal.eXoWidgetWeb", "war", module.version);
  module.eXoWidget.web.deployName = "eXoWidgetWeb" ;
  
  module.eXoGadgetServer = new Project("org.exoplatform.portal", "exo.portal.gadgets-server", "war", module.version).
	addDependency(new Project("commons-digester", "commons-digester", "jar", "1.7")).
	addDependency(new Project("commons-io", "commons-io", "jar", "1.4")).
	addDependency(new Project("net.oauth", "core", "jar", "20080328")).
	addDependency(new Project("com.google.code.google-collections", "google-collect", "jar", "snapshot-20080321")).
	addDependency(new Project("com.google.code.guice", "guice", "jar", "1.0")).
	addDependency(new Project("org.hamcrest", "hamcrest-all", "jar", "1.1")).
	addDependency(new Project("nu.validator.htmlparser", "htmlparser", "jar", "1.0.5")).
	addDependency(new Project("jaxen", "jaxen", "jar", "1.1.1")).
	addDependency(new Project("joda-time", "joda-time", "jar", "1.5.2")).
	addDependency(new Project("org.json", "json", "jar", "20070829")).
	addDependency(new Project("org.apache.shindig", "shindig-common", "jar", "1-SNAPSHOT")).
	addDependency(new Project("org.apache.shindig", "shindig-social-api", "jar", "1-SNAPSHOT")).
	addDependency(new Project("org.exoplatform.portal", "exo.portal.gadgets-core", "jar", "trunk")).
	addDependency(new Project("org.exoplatform.portal", "exo.portal.gadgets-features", "jar", "trunk")).
	addDependency(new Project("org.codehaus.woodstox", "wstx-asl", "jar", "3.2.1")).
	addDependency(new Project("xerces", "xercesImpl", "jar", "2.6.2")).
	addDependency(new Project("caja", "caja", "jar", "r820")).
	addDependency(new Project("xml-apis", "xml-apis", "jar", "1.0.b2"));
	
	
	
  module.eXoGadgetServer.deployName = "eXoGadgetServer" ;
  
  module.eXoGadgets = new Project("org.exoplatform.portal", "exo.portal.eXoGadgets", "war", module.version);
  module.eXoGadgets.deployName = "eXoGadgets" ;
    
  module.web = {}
  module.web.eXoResources = 
    new Project("org.exoplatform.portal", "exo.portal.web.eXoResources", "war", module.version);
  module.web.eXoMacSkin = 
    new Project("org.exoplatform.portal", "exo.portal.web.eXoSkinMac", "war", module.version);
  module.web.eXoVistaSkin = 
    new Project("org.exoplatform.portal", "exo.portal.web.eXoSkinVista", "war", module.version);
      
  module.web.portal = 
    new Project("org.exoplatform.portal", "exo.portal.web.portal", "exo-portal", module.version).
    addDependency(module.webui.portal) .
    addDependency(module.web.eXoResources).
    addDependency(module.web.eXoMacSkin).
    addDependency(module.web.eXoVistaSkin).
    addDependency(jcr.frameworks.web).
    addDependency(jcr.frameworks.command) ;
  
  module.server = {}
  
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.portal", "exo.portal.server.tomcat.patch", "jar", module.version);

  module.server.jboss = {}
  module.server.jboss.patch = 
    new Project("org.exoplatform.portal", "exo.portal.server.jboss.patch", "jar", module.version);

  module.server.jbossear = {}
  module.server.jbossear.patch = 
    new Project("org.exoplatform.portal", "exo.portal.server.jboss.patch-ear", "jar", module.version);
    
  module.server.jonas = {}
  module.server.jonas.patch = 
    new Project("org.exoplatform.portal", "exo.portal.server.jonas.patch", "jar", module.version);

  module.server.websphere = {}
  module.server.websphere.patch = 
    new Project("org.exoplatform.portal", "exo.portal.server.websphere.patch", "jar", module.version);      

  return module;
}
