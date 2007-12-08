eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ecm = params.ecm;

  var module = new Module();

  module.version =  "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/company" ;
  module.relativeSRCRepo =  "company/trunk" ;
  module.name =  "company" ;
    
  module.component={}
  module.component.web=
    new Project("org.exoplatform.company", "company.component.web", "jar", module.version).
    addDependency(portal.component.web).          
    addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.mail.service", "jar","trunk"));                        
  module.web = {}
  module.web.companyResources = 
    new Project("org.exoplatform.company", "company.web.companyResources", "exo-portal", module.version) ;    
  module.web.portal = 
    new Project("org.exoplatform.company", "company.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  return module;
}