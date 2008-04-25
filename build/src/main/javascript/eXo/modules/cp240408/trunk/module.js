eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var webos = params.webos;

  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/cp240408" ;
  module.relativeSRCRepo =  "cp240408/trunk" ;
  module.name =  "cp240408" ;  

	
  module.web = {} ;
  module.web.eXoResources = new Project("org.exoplatform.cp240408", "cp240408.web.cp240408Resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp240408" ;
  module.web.bpmportal = new Project("org.ow2.novabpm.admin", "bpmportal", "war", "1.0-SNAPSHOT").
    addDependency(portal.web.eXoResources) .
    addDependency(webos.web.webosportal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;
  module.web.bpmportal.deployName = "portal" ;
  
  module.component = {} ;
  module.component.service = {} ;
  module.component.service.bonita = new Project("org.ow2.novabpm.admin", "org.ow2.novabpm.admin.service.bonita", "jar", "1.0-SNAPSHOT").
  	addDependency(new Project("org.ow2.novabpm.admin", "org.ow2.novabpm.admin.service.api", "jar", "1.0-SNAPSHOT")).
  	addDependency(new Project("org.ow2.bonita", "bonita", "jar", "4.0.snapshot")).
  	addDependency(new Project("org.ow2.bonita", "novaBpmIdentity", "jar", "4.0.snapshot")).
  	addDependency(new Project("org.ow2.bonita", "novaBpmUtil", "jar", "4.0.snapshot")).
  	addDependency(new Project("org.ow2.bonita", "pvm", "jar", "4.0.snapshot")).
  	addDependency(new Project("rome", "rome", "jar", "0.8")) .
    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
    addDependency(new Project("bsh", "bsh", "jar", "2.0b1")).
    addDependency(new Project("javax.servlet", "servlet-api", "jar", "2.4")).
    addDependency(new Project("net.wimpi.pim", "jpim-0.1", "jar", "1.0")).
    addDependency(new Project("org.hibernate", "hibernate", "jar", "3.2.5.ga")) ;
  
  module.portlet = {} ;
  module.portlet.bonita = new Project("org.ow2.novabpm.admin", "bonita.portlet", "war", "1.0-SNAPSHOT").
  		addDependency(new Project("org.ow2.novabpm.admin", "org.ow2.novabpm.admin.service.bonita", "jar", "1.0-SNAPSHOT")).
  		addDependency(new Project("org.ow2.novabpm.admin", "org.ow2.novabpm.admin.commons.webui", "jar", "1.0-SNAPSHOT")) ;
  module.portlet.orchestra = new Project("org.ow2.novabpm.admin", "orchestra.portlet", "war", "1.0-SNAPSHOT").
  	addDependency(new Project("org.ow2.novabpm.admin", "org.ow2.novabpm.admin.commons.webui", "jar", "1.0-SNAPSHOT")) ;

  module.server = {} ;
  module.server.tomcat = {} ;
  module.server.tomcat.patch = new Project("org.exoplatform.cp240408", "cp240408.server.tomcat.patch", "jar", module.version);

  return module;
}