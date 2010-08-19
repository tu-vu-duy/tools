eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ecm = params.ecm;
  //var cs = params.cs;
  var wcm = params.wcm;
  var ws = params.ws;

  var module = new Module();

  module.version = "2.2" ;
  module.relativeMavenRepo =  "org/exoplatform/cg38" ;
  module.relativeSRCRepo =  "cg38/tags/2.2" ;
  module.name =  "cg38" ;  

  module.component = {}
  module.component.jcraction = new Project("org.exoplatform.cg38", "cg38.component.jcraction", "jar", module.version);
//	addDependency(kernel.container).
 //	addDependency(jcr.component.core).
//	addDependency(jcr.component.ext).
//	addDependency(ecm.component.cms);

  module.component.cg38CategoriesService = new Project("org.exoplatform.cg38", "cg38.component.categories", "jar", module.version);
  module.component.cg38Indexation = new Project("org.exoplatform.cg38", "cg38.component.indexation", "jar", module.version);
  //module.component.search = new Project("org.exoplatform.cg38", "cg38.component.search", "jar", module.version);
  
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cg38", "cg38.portlet.web", "exo-portlet", module.version).
  	addDependency(new Project("org.exoplatform.cg38", "cg38.component.rss", "jar",  module.version)).
  	addDependency(new Project("org.exoplatform.cg38", "cg38.component.search", "jar",  module.version)).
	addDependency(new Project("org.exoplatform.cg38", "cg38.component.authentication", "jar",  module.version)).
  	addDependency(new Project("org.exoplatform.cg38", "taxonomy.cg38.component", "jar",  module.version));
  module.portlet.web.deployName = "cg38PortletWeb" ;
  module.web = {}
  module.web.cg38Resources = new Project("org.exoplatform.cg38", "cg38.web.cg38Resources", "war", module.version);
  module.web.cg38Resources.deployName = "eXoResourcesCG38" ;
        

  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cg38", "cg38.server.tomcat.patch", "jar", module.version);



  module.web.cg38portal = 
    new Project("org.exoplatform.cg38", "cg38.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web);

  return module;
}
