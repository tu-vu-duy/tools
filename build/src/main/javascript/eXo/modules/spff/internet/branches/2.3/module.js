eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
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
  module.web.spffResources.deployName = "spffResources" ;

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

  return module;
}



