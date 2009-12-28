eXo.require("eXo.projects.Module");
eXo.require("eXo.projects.Product");

function getModule(params) {

	var kernel = params.kernel;
	var core = params.core;
	var ws = params.ws;
	var eXoPortletContainer = params.eXoPortletContainer;
	var jcr = params.eXoJcr;
	var portal = params.portal;
	var dms = params.dms;
	var workflow = params.workflow ;
	var wcm = params.wcm ;
	var cs = params.cs ;
	var ks = params.ks ;
	var allinone = params.allinone;
	var module = new Module();

	module.version = "0.1-SNAPSHOT";
	module.relativeMavenRepo = "org/exoplatform/cp211209";
	module.relativeSRCRepo = "cp211209/trunk";
	module.name = "cp211209";
	
	module.web = {};

	module.web.portal =
		new Project("org.exoplatform.cp211209", "cp211209.web.portal", "exo-portal", module.version).
			addDependency(portal.web.eXoResources).
		    addDependency(portal.webui.portal).
		    addDependency(jcr.frameworks.command).
		    addDependency(jcr.frameworks.web).
		    addDependency(portal.web.rest).
		    addDependency(new Project("org.postgresql", "postgresql-jdbc3", "jar", "8.2-505"));
	
	module.portlet = {};
	
	module.portlet.bfpmePortlet =
		new Project("org.exoplatform.cp211209", "cp211209.portlet.bfpmePortlet", "war", module.version);

	module.exoconf = 
		new Project("org.exoplatform.cp211209", "cp211209.exo-conf", "jar", module.version);
	
	module.server = {};
	module.server.tomcat = {};
	module.server.tomcat.patch = 
		new Project("org.exoplatform.cp211209", "cp211209.server.tomcat.patch", "jar", module.version);
	
	return module;

}