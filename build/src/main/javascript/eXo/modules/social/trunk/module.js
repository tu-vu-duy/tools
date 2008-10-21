eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;

  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/social" ;
  module.relativeSRCRepo =  "social/trunk" ;
  module.name = "social" ;  
	
	module.component = {} ;
	module.component.people = 
		new Project("org.exoplatform.social", "exo.social.component.people","jar", module.version);
	
	module.component.space = 
		new Project("org.exoplatform.social", "exo.social.component.space","jar", module.version);

	module.component.opensocial = 
		new Project("org.exoplatform.social", "exo.social.component.opensocial","jar", module.version);
	
	module.web = {} ;
  module.web.portal = 
    new Project("org.exoplatform.social", "exo.social.web.portal", "exo-portal", module.version).
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web);
	
	module.web.eXoResources = new Project("org.exoplatform.social", "exo.social.web.socialResources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesSocial" ;
	
	module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.social", "exo.social.server.tomcat.patch", "jar", module.version);
	
	module.portlet = {}
  module.portlet.space = new Project("org.exoplatform.social", "exo.social.portlet.space", "exo-portlet", module.version);
  module.portlet.space.deployName = "space" ;

  module.portlet.profile = new Project("org.exoplatform.social", "exo.social.portlet.profile", "exo-portlet", module.version);
  module.portlet.profile.deployName = "profile" ;


  module.web.opensocial =new Project("org.exoplatform.social", "exo.social.web.opensocial", "war", module.version).
		addDependency(new Project("commons-betwixt", "commons-betwixt", "jar", "0.8")).
		addDependency(new Project("net.sf.json-lib", "json-lib", "jar", "2.2")).
		addDependency(new Project("org.apache.geronimo.specs", "geronimo-stax-api_1.0_spec", "jar", "1.0.1"));

  module.web.opensocial.deployName = "social" ;
/*  module.gadgets = {}
  module.gadgets.server = new Project("org.exoplatform.social", "exo.social.gadgets-server", "war", module.version).
		addDependency(new Project("commons-betwixt", "commons-betwixt", "jar", "0.8")).
		addDependency(new Project("commons-digester", "commons-digester", "jar", "1.7")).
		addDependency(new Project("commons-io", "commons-io", "jar", "1.4")).
		addDependency(new Project("com.google.code.google-collections", "google-collect", "jar", "snapshot-20080321")).
		addDependency(new Project("com.google.code.guice", "guice", "jar", "1.0")).
		addDependency(new Project("net.oauth", "core", "jar", "20080328")).
		addDependency(new Project("net.sf.json-lib", "json-lib", "jar", "2.2")).
		addDependency(new Project("nu.validator.htmlparser", "htmlparser", "jar", "1.0.5")).
		addDependency(new Project("jaxen", "jaxen", "jar", "1.1.1")).
		addDependency(new Project("joda-time", "joda-time", "jar", "1.5.2")).
		addDependency(new Project("org.json", "json", "jar", "20070829")).
		addDependency(new Project("org.apache.geronimo.specs", "geronimo-stax-api_1.0_spec", "jar", "1.0.1")).
		addDependency(new Project("org.apache.shindig", "shindig-common", "jar", "1-SNAPSHOT")).
		addDependency(new Project("org.apache.shindig", "shindig-social-api", "jar", "1-SNAPSHOT")).
		addDependency(new Project("org.exoplatform.portal", "exo.portal.gadgets-core", "jar", "trunk")).
		addDependency(new Project("org.apache.shindig", "shindig-features", "jar", "1-SNAPSHOT")).
		addDependency(new Project("org.codehaus.woodstox", "wstx-asl", "jar", "3.2.1")).
		addDependency(new Project("org.hamcrest", "hamcrest-all", "jar", "1.1")).
		addDependency(new Project("com.ibm.icu", "icu4j", "jar", "3.8")).
		addDependency(new Project("caja", "caja", "jar", "r820"));
  module.gadgets.server.deployName = "eXoGadgetServer" ;*/
	
	return module;
}