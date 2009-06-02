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

  var module = new Module();
  module.version = "2.3" ;
  module.relativeMavenRepo = "org/exoplatform/spff" ;
  module.relativeSRCRepo = "spff/internet/branches/2.3" ;
  module.name = "spff" ;
  
  module.component = {};
  
  module.component.synchro = 
  	new Project("org.exoplatform.spff", "spff.component.synchro", "jar", module.version).
  	addDependency(core.component.organization).
    addDependency(core.component.ldap).
    addDependency(kernel.component.common).
    addDependency(kernel.container);
    
    
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.spff", "spff.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "spffWeb" ;
    
  module.portlet.spffadmin = new Project("org.exoplatform.spff", "spff.portlet.spffadmin", "exo-portlet", module.version);
  module.portlet.spffadmin.deployName = "spffadmin" ;

  module.web = {}
  module.web.spffResources = new Project("org.exoplatform.spff", "spff.web.spffResources", "war", module.version);
  module.web.spffResources.deployName = "zspffResources" ;

  module.web.spffportal = 
    new Project("org.exoplatform.spff", "spff.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  module.patch = {}
  module.patch.loginmodule  = 
    new Project("org.exoplatform.spff", "spff.patch.loginmodule", "jar", module.version) ;

  module.server = {}
  
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.spff", "spff.server.tomcat.patch", "jar", module.version);

  module.server.jboss = {}
  module.server.jboss.patch = 
    new Project("org.exoplatform.spff", "spff.server.jboss.patch", "jar", module.version);


 /****************
 Patched modules *
 *****************/
//    module.patch = {};
    
    /** Chat **/
    module.patch.chat = new Project("org.exoplatform.cs", "exo.cs.eXoApplication.chat.webapp", "war", "1.2.1.SPFF_1").
	  addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.chat.service", "jar", "1.2.1.SPFF_1").
	  addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.organization.service", "jar", "1.2.1.SPFF_1")).
  addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.organization.client.openfire", "jar", "1.2.1.SPFF_1")).
	  addDependency(new Project("org.exoplatform.ws", "exo.ws.frameworks.json", "jar", "1.3.3")).
	  addDependency(ws.frameworks.cometd).
	  addDependency(new Project("jabber.smack", "smack", "jar", "3.0.4")).
	  addDependency(new Project("jabber.smack", "smackx", "jar", "3.0.4")).
	  addDependency(new Project("org.jcrom", "jcrom", "jar", "1.2")).
  addDependency(new Project("commons-fileupload", "commons-fileupload", "jar", "1.0")).
  addDependency(new Project("commons-io", "commons-io", "jar", "1.3")).
  addDependency(new Project("log4j", "log4j", "jar", "1.2.12")).
  addDependency(new Project("org.slf4j", "slf4j-api", "jar", "1.4.3")).
  addDependency(new Project("org.slf4j", "slf4j-log4j12", "jar", "1.4.3"))
	);
	  module.patch.cswebservice = 
    new Project("org.exoplatform.cs", "exo.cs.web.webservice", "jar",  "1.2.1.SPFF_1");
	  
	  /** DMS **/
	  module.patch.dmsportlet = 
    new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.portlet.ecm", "exo-portlet", "2.3.1.SPFF_2").
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.cms", "jar",  dms.version)) .     
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.deployment", "jar",  dms.version)) .    
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.publication", "jar", dms.version)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.connector.fckeditor", "jar", dms.version)).
    addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.webui.dms", "jar", "2.3.1.SPFF_2")).
    addDependency(new Project("rome", "rome", "jar", "0.8")) .
    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")).
    addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2"));

	/** End patches **/

  return module;
}



