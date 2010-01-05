eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

	var kernel = params.kernel;
	var core = params.core;
	var eXoPortletContainer = params.eXoPortletContainer;
	var ws = params.ws;
	var jcr = params.eXoJcr;
	var portal = params.portal;
	var dms = params.dms;
	var workflow = params.workflow ;
	var wcm = params.wcm ;
	var cs = params.cs ;
	var ks = params.ks ;
	var allinone = params.allinone;
	var module = new Module();

	module.version = "2.1-SNAPSHOT" ;
	module.relativeMavenRepo =  "org/exoplatform/intranet" ;
	module.relativeSRCRepo =  "intranet/trunk" ;
	module.name =  "intranet" ;

	module.web = {} ;

	module.web.portal = 
		new Project("org.exoplatform.intranet", "intranet.web.portal", "exo-portal", module.version).   
			addDependency(portal.web.eXoResources) .
			addDependency(portal.web.eXoMacSkin) .
			addDependency(portal.web.eXoVistaSkin) .
			addDependency(portal.webui.portal) .
			addDependency(jcr.frameworks.command) .
			addDependency(jcr.frameworks.web).
			addDependency(portal.web.rest).
			addDependency(new Project("mysql", "mysql-connector-java", "jar", "5.0.5"));
  
	module.exoconf = 
		new Project("org.exoplatform.intranet", "intranet.exo-conf", "jar", module.version);
	
	module.component = {};
	module.component.ldap = 
		new Project("org.exoplatform.intranet", "intranet.component.ldap", "jar", module.version).
			addDependency(new Project("commons-codec", "commons-codec", "jar", "1.3"));
	
	module.component.webui = {};
	module.component.webui.portal= 
		new Project("org.exoplatform.intranet", "intranet.component.webui.portal", "jar", module.version).
			addDependency(new Project("org.exoplatform.intranet", "intranet.component.ldap", "jar", module.version));
	
	module.server = {};
	module.server.tomcat = {};
	module.server.tomcat.patch = 
		new Project("org.exoplatform.intranet", "intranet.server.tomcat.patch", "jar", module.version);

	return module;
}
