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

  module.version =  "1.2-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/company" ;
  module.relativeSRCRepo =  "company/trunk" ;
  module.name =  "company" ;
  
  var ksversion = "1.0" ;
    
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.company", "company.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "companyPortletWeb" ;

  module.portlet.ecm = 
    new Project("org.exoplatform.company", "company.portlet.ecm", "exo-portlet", module.version).
    addDependency(new Project("org.exoplatform.company", "company.component.cms", "jar",  module.version)) .      
    addDependency(new Project("org.exoplatform.ecm", "exo.ecm.component.publication", "jar", ecm.version)).
    addDependency(new Project("rome", "rome", "jar", "0.8")) .
    addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
    addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0")).
    addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")).
    addDependency(new Project("com.sun.xml.stream", "sjsxp", "jar", "1.0")) ;
//  addDependency(new Project("javax.xml.stream", "stax-api", "jar", "1.0")) ;    
  
  
  module.eXoApplication = {};
  
  module.eXoApplication.faq = new Project("org.exoplatform.ks", "exo.ks.eXoApplication.faq.webapp", "war", ksversion).
   addDependency(new Project("org.exoplatform.ks", "exo.ks.eXoApplication.faq.service", "jar", ksversion));
  module.eXoApplication.faq.deployName = "faq";

  module.eXoApplication.forum = new Project("org.exoplatform.ks", "exo.ks.eXoApplication.forum.webapp", "war", ksversion).
    addDependency(new Project("org.exoplatform.ks", "exo.ks.eXoApplication.forum.service", "jar",  ksversion).
    addDependency(new Project("org.exoplatform.ks", "exo.ks.component.providers", "jar", ksversion)));
  module.eXoApplication.forum.deployName = "forum";
  
  
  module.component={}
  module.component.web=
    new Project("org.exoplatform.company", "company.component.web", "jar", module.version).
    addDependency(portal.component.web);                        
  
  module.web = {}
  module.web.ksResources = 
    new Project("org.exoplatform.ks", "exo.ks.web.ksResources", "war", ksversion) ;  
  module.web.companyResources = 
    new Project("org.exoplatform.company", "company.web.eXoResourcesCompany", "exo-portal", module.version) ;    
  module.web.portal = 
    new Project("org.exoplatform.company", "company.web.portal", "exo-portal", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.webui.portal). 
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web) ;

  module.server = {}
  
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.company", "company.server.tomcat.patch", "jar", module.version);

  return module;
}