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
	
	
	var bullDevVersion = "1.0-SNAPSHOT";

	module.version = "1.1-SNAPSHOT";
	module.relativeMavenRepo = "org/exoplatform/cp040110";
	module.relativeSRCRepo = "cp040110/trunk";
	module.name = "cp040110";
	
	module.web = {};

	module.web.portal =
		new Project("org.exoplatform.cp040110", "cp040110.web.portal", "exo-portal", module.version).
			addDependency(portal.web.eXoResources).
		    addDependency(portal.webui.portal).
		    addDependency(jcr.frameworks.command).
		    addDependency(jcr.frameworks.web).
		    addDependency(portal.web.rest).
		    addDependency(new Project("org.postgresql", "postgresql-jdbc3", "jar", "8.2-505"));
	module.web.AladinngResources = new Project("org.exoplatform.cp040110", "cp040110.web.AladinngResources", "war", module.version)
	module.portlet = {};
	
	module.portlet.MesInfosPortlets =
		new Project("org.exoplatform.cp040110", "cp040110.portlet.mesInfos", "war", module.version);

	module.portlet.dms =
		new Project("org.exoplatform.cp040110", "cp040110.portlet.ecm", "war", module.version).
		addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.cms", "jar",  dms.version)) .     
		addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.deployment", "jar",  dms.version)) .    
		addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.component.publication", "jar", dms.version)).
		addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.connector.fckeditor", "jar", dms.version)).
		addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.webui.dms", "jar", dms.version)).
		addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.webui.ext", "jar", dms.version)).
		addDependency(new Project("org.exoplatform.ecm.dms.core", "exo.ecm.dms.core.portlet.ecm.ext.config", "jar", dms.version)).
		addDependency(new Project("org.exoplatform.cp040110", "cp040110.dmsextension", "jar", module.version)).
		addDependency(new Project("rome", "rome", "jar", "0.9")) .
		addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
		addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
		addDependency(new Project("jdom", "jdom", "jar", "1.0")).
		addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
		addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")).
		addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2"));
		module.portlet.dms.deployName = "ecm";

		
	module.portlet.bullPortlets =
		new Project("org.exoplatform.cp040110", "cp040110.portlet.bullPortlets", "war","1.1-SNAPSHOT").
			addDependency(new Project("fr.bull.aladinng.dev-bull", "common", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.services.startup", "content-publication-initialization-service", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.event-listeners", "groups-listeners", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.services.management", "groups-management-service", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.event-listeners", "memberships-listeners", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.services.management", "memberships-management-service", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull", "resources", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.services.REST", "REST-groups-service", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.services.REST", "REST-memberships-service", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.services.REST", "REST-users-service", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.services.startup", "symlink-publication-initialization-service", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.event-listeners", "users-listeners", "jar", bullDevVersion)).
			addDependency(new Project("fr.bull.aladinng.dev-bull.services.management", "users-management-service", "jar", bullDevVersion));

	module.exoconf = 
		new Project("org.exoplatform.cp040110", "cp040110.config", "jar", module.version);
	
	module.server = {};
	module.server.tomcat = {};
	module.server.tomcat.patch = 
		new Project("org.exoplatform.cp040110", "cp040110.server.tomcat.patch", "jar", module.version);
	
	return module;

}