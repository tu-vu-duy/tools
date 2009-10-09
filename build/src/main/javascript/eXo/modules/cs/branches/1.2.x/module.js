eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ws = params.ws;
  var module = new Module();

  module.version =  "1.2.3-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/cs" ;
  module.relativeSRCRepo =  "cs/branches/1.2.x" ;
  module.name = "cs" ;
    
  module.eXoApplication = {};
  module.eXoApplication.mail = 
    new Project("org.exoplatform.cs", "exo.cs.eXoApplication.mail.webapp", "war", module.version).
    addDependency(new Project("javax.mail", "mail", "jar", "1.4.1")).
    addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.mail.service", "jar",  module.version));
  module.eXoApplication.mail.deployName = "mail";
    
  module.eXoApplication.calendar = 
    new Project("org.exoplatform.cs", "exo.cs.eXoApplication.calendar.webapp", "war", module.version).
      addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.calendar.service", "jar",  module.version)).
	  addDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3.3")).
	  addDependency(ws.frameworks.cometd).
	  addDependency(new Project("rome", "rome", "jar", "0.8")).
	  addDependency(new Project("jdom", "jdom", "jar", "1.0")).
      addDependency(new Project("ical4j", "ical4j", "jar", "1.0-beta5")) ;
  module.eXoApplication.calendar.deployName = "calendar";
    
  module.eXoApplication.contact = 
    new Project("org.exoplatform.cs", "exo.cs.eXoApplication.contact.webapp", "war", module.version).
      addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.contact.service", "jar",  module.version)).
      addDependency(new Project("net.wimpi.pim", "jpim-0.1", "jar",  "1.0"));
  module.eXoApplication.contact.deployName = "contact";
  
  module.eXoApplication.content = 
    new Project("org.exoplatform.cs", "exo.cs.eXoApplication.content.webapp", "war", module.version).
      addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.content.service", "jar",  module.version));
  module.eXoApplication.content.deployName = "content";
     
  module.web = {}
  module.web.webservice = 
    new Project("org.exoplatform.cs", "exo.cs.web.webservice", "jar",  module.version);
  module.web.csResources = 
    new Project("org.exoplatform.cs", "exo.cs.web.csResources", "war", module.version) ;
 
  module.web.csportal = 
    new Project("org.exoplatform.cs", "exo.cs.web.portal", "exo-portal", module.version).
      addDependency(portal.web.eXoResources) .
      addDependency(portal.web.eXoMacSkin) .
      addDependency(portal.web.eXoVistaSkin) .
      addDependency(portal.web.rest) .  
      addDependency(ws.frameworks.servlet) .   
	  addDependency(portal.webui.portal) .
	  addDependency(portal.eXoGadgetServer).
	  addDependency(portal.eXoGadgets).
	  addDependency(portal.portlet.exoadmin) .
	  addDependency(portal.portlet.web) .
	  addDependency(portal.portlet.dashboard) .
      addDependency(jcr.frameworks.command) .
      addDependency(jcr.frameworks.web) ;
  
  
  /**
   * Configure and add server path for chat, single sign-on
   */
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cs", "exo.cs.server.tomcat.patch", "jar", module.version);
  
  module.server.jboss = {}
  module.server.jboss.patch = 
	    new Project("org.exoplatform.cs", "exo.cs.server.jboss.patch", "jar", module.version);  
   
      
  return module;
}

 