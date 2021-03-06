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
  
  var module = new Module();

  module.version = "0.10-SNAPSHOT" ;
  module.relativeMavenRepo =  "org/exoplatform/cp130709" ;
  module.relativeSRCRepo =  "cp130709/trunk" ;
  module.name =  "cp130709" ;
  
  module.portlet = {};
  module.portlet.strutsAlmerysPortlet = 
    new Project("org.exoplatform.cp130709", "cp130709.portlet.strutsAlmerysPortlet", "exo-portlet", module.version).
	addDependency(new Project("org.exoplatform.portletcontainer", "exo.pc.util-bridge", "jar","2.0.6" )).
	addDependency(new Project("struts", "struts", "jar", "1.2.9")).
	addDependency(new Project("log4j", "log4j", "jar", "1.2.14")).
	addDependency(new Project("commons-validator", "commons-validator", "jar", "1.3.1")).
	addDependency(new Project("org.apache.portals.bridges", "portals-bridges-common", "jar", "1.0.4")).
	addDependency(new Project("org.apache.portals.bridges", "portals-bridges-struts-1.2.7", "jar", "1.0.4")).
	addDependency(new Project("oro", "oro", "jar", "2.0.8")).
	addDependency(new Project("org.exoplatform.cp130709", "cp130709.webservice.WSIndividu", "jar", module.version)).
	addDependency(new Project("org.exoplatform.cp130709", "cp130709.webservice.WSSection", "jar", module.version)).
	addDependency(new Project("com.almerys.exo", "exo-account-commons", "jar", "1.0.0.0.1")).
	addDependency(new Project("com.almerys.lmg", "lmg-individu", "jar", "0.0.5.0.0")).
	addDependency(new Project("com.almerys.lmg", "lmg-individu-ws-client", "jar", "0.0.4.0.0")).
	addDependency(new Project("com.almerys.portal", "portal-filters", "jar", "1.3.0.0.0")).
	addDependency(new Project("javax.xml.soap", "saaj-api", "jar", "1.3")).
	addDependency(new Project("javax.jws", "jsr181-api", "jar", "1.0-MR1")).
	addDependency(new Project("com.almerys.emut.lmgv2", "lmgv2-portal-filters", "jar", "0.3.1.0.0")).
	addDependency(new Project("com.almerys.emut.lmgv2", "lmgv2-adherent-common-model", "jar", "0.5.4.0.0")).
	addDependency(new Project("com.almerys.emut.lmgv2", "lmgv2-contact-manager", "jar", "0.1.6.0.0")).	
	addDependency(new Project("com.almerys.emut", "health-guarantee-description", "jar", "0.1.5.0.0")).
	addDependency(new Project("com.almerys", "commun-agaps", "jar", "1.4.2.0.0")).	
	addDependency(new Project("com.almerys.lmg","AlmerysHeader", "war", "1.0.0.0.0")).
	addDependency(new Project("com.almerys.lmg","LMGv2AccountManagerWeb", "war", "1.0.0.0.0")).	
	addDependency(new Project("com.almerys.lmg","LMGv2OnlineStatementsWeb", "war", "1.0.0.0.0")).		
	addDependency(new Project("org.exoplatform.cp130709", "cp130709.tools.core", "jar", module.version));
	
  module.portlet.comptePortlet = 
    new Project("org.exoplatform.cp130709", "cp130709.portlet.comptePortlet", "exo-portlet", module.version).
	 addDependency(new Project("org.exoplatform.cp130709", "cp130709.tools.core", "jar", module.version));
 
 module.portlet.contactPortlet = 
    new Project("org.exoplatform.cp130709", "cp130709.portlet.contactPortlet", "exo-portlet", module.version).
	 addDependency(new Project("org.exoplatform.cp130709", "cp130709.tools.core", "jar", module.version));
	 
 module.portlet.genericPortlet = 
    new Project("org.exoplatform.cp130709", "cp130709.portlet.genericPortlet", "exo-portlet", module.version).
	 addDependency(new Project("org.exoplatform.cp130709", "cp130709.tools.core", "jar", module.version));
	
  module.web = {};
  module.web.resources = 
    new Project("org.exoplatform.cp130709", "cp130709.web.resources", "war", module.version).
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin);
        
  module.web.portal = 
    new Project("org.exoplatform.cp130709", "cp130709.web.portal", "exo-portal", module.version).
	addDependency(new Project("com.almerys", "commun-core", "jar", "1.0.0.9.2")).
	addDependency(new Project("com.almerys.sso", "sso-token", "jar", "1.0.0.0.7")).
	addDependency(new Project("org.jasig.cas", "cas-client-core", "jar", "3.1.3"));
	
  module.webservice = {};
  module.webservice.WSIndividu = 
    new Project("org.exoplatform.cp130709", "cp130709.webservice.WSIndividu", "jar", module.version).
	addDependency(new Project("axis", "axis", "jar", "1.4"));
	
  module.webservice.WSSection = 
    new Project("org.exoplatform.cp130709", "cp130709.webservice.WSSection", "jar", module.version).
	addDependency(new Project("axis", "axis", "jar", "1.4"));
 module.tools = {};
 module.tools.joomla = 
    new Project("org.exoplatform.cp130709", "cp130709.tools.joomla", "jar", module.version);
 module.tools.core = 
    new Project("org.exoplatform.cp130709", "cp130709.tools.core", "jar", module.version);
 
 return module;
}
