eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ws = params.ws;
  var module = new Module();

  module.version =  "1.0-RC4-2" ;
  module.relativeMavenRepo =  "org/exoplatform/ks" ;
  module.relativeSRCRepo =  "ks/branches/rc4-2" ;
  module.name = "ks" ;
    
  module.eXoApplication = {};
    

  module.eXoApplication.faq = 
    new Project("org.exoplatform.ks", "exo.ks.eXoApplication.faq.webapp", "war", module.version).
      addDependency(new Project("org.exoplatform.ks", "exo.ks.eXoApplication.faq.service", "jar",  module.version));
  module.eXoApplication.faq.deployName = "faq";


  module.eXoApplication.forum = 
    new Project("org.exoplatform.ks", "exo.ks.eXoApplication.forum.webapp", "war", module.version).
      addDependency(new Project("org.exoplatform.ks", "exo.ks.eXoApplication.forum.service", "jar",  module.version).
      addDependency(new Project("org.exoplatform.ks", "exo.ks.component.providers", "jar", module.version)));
  module.eXoApplication.forum.deployName = "forum";
  
/*
  module.eXoApplication.content = 
    new Project("org.exoplatform.ks", "exo.ks.eXoApplication.content.webapp", "war", module.version).
      addDependency(new Project("org.exoplatform.ks", "exo.ks.eXoApplication.content.service", "jar",  module.version));
  module.eXoApplication.content.deployName = "content";
  */	  
  module.web = {}
  module.web.ksResources = 
    new Project("org.exoplatform.ks", "exo.ks.web.ksResources", "war", module.version) ;
  module.web.ksportal = 
    new Project("org.exoplatform.ks", "exo.ks.web.portal", "exo-portal", module.version).
      addDependency(portal.web.eXoResources) .
      addDependency(portal.web.eXoMacSkin) .
      addDependency(portal.web.eXoVistaSkin) .
	  addDependency(portal.webui.portal) .
      addDependency(jcr.frameworks.command) .
      addDependency(jcr.frameworks.web) ;
      
  return module;
}
