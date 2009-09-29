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
  var wcm = params.wcm; 
  
  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/bpi" ;
  module.relativeSRCRepo =  "bpi/trunk" ;
  module.name =  "bpi" ;
  
  module.portlet = {} ;
  module.portlet.web = new Project("org.exoplatform.bpi", "bpi.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "web" ;


  module.web = {};
  module.web.BPIResources = 
    new Project("org.exoplatform.bpi", "bpi.web.BPIResources", "war", module.version);


  module.application = {}
  module.application.statsService = new Project("org.exoplatform.bpi", "bpi.service.stats","jar", module.version);
  module.application.jcrActions = new Project("org.exoplatform.bpi", "bpi.service.actions","jar", module.version);
  module.application.ldapService = new Project("org.exoplatform.bpi", "bpi.service.ldap","jar", module.version);
  module.application.backupService = new Project("org.exoplatform.bpi", "bpi.service.backup","jar", module.version);
  module.application.publicationService = new Project("org.exoplatform.bpi", "bpi.service.publication.plugin","jar", module.version);
  module.application.fckeditor = new Project("org.exoplatform.bpi", "bpi.service.fckeditor","jar", module.version);



  // adding the portlet to the deployment profile
  module.web.content =
    new Project("org.exoplatform.bpi", "bpi.dms.content.portlets", "war", module.version);
  module.web.content.deployName = "bpi.dms.content.portlets" ;

  // adding RSS Servlet application
  module.web.rssBpi = new Project("org.exoplatform.bpi", "bpi.service.rss", "war", module.version);
  module.web.rssBpi.deployName = "bpirss" ;


  module.web.portal = 
    new Project("org.exoplatform.bpi", "bpi.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;
    
  return module;
}
