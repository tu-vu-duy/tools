eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;

  var module = new Module();
  module.version = "2.0.5.ee" ;
  module.relativeMavenRepo = "org/exoplatform/portletcontainer" ;
  module.relativeSRCRepo = "portlet-container/branches/2.0.5.ee" ;
  module.name = "pc" ;

  module.services = {} ;
  module.services.core = 
    new Project("org.exoplatform.portletcontainer", "exo.pc.component.core", "jar", module.version).
    addDependency(kernel.container).
    addDependency(kernel.commons).
    addDependency(kernel.component.common).
    addDependency(new Project("javax.portlet", "portlet-api", "jar", "2.0"));
    
  module.services.jsr168jsr286 = 
    new Project("org.exoplatform.portletcontainer", "exo.pc.component.plugins.pc", "jar", module.version).
    addDependency(module.services.core).
    addDependency(kernel.component.cache).
    addDependency(core.component.resources).
    addDependency(core.component.organization).
    addDependency(new Project("javax.ccpp", "ccpp", "jar", "1.0")).
    addDependency(new Project("javax.xml.bind", "jaxb-api", "jar", "2.1")).
    addDependency(new Project("com.sun.xml.bind", "jaxb-impl", "jar", "2.1.7"));


  module.services.axis = 
    new Project("axis", "axis", "jar", "1.4-0231").
    addDependency(new Project("org.apache.axis", "axis-jaxrpc", "jar", "1.4")).
    addDependency(new Project("org.apache.axis", "axis-saaj", "jar", "1.4")).
    addDependency(new Project("axis", "axis-wsdl4j", "jar", "1.5.1")).
    addDependency(new Project("commons-discovery", "commons-discovery", "jar", "0.2"));
    //.addDependency(new Project("jtidy", "jtidy", "jar", "4aug2000r7-dev"));
    
  module.services.wsrp1 = 
    new Project("org.exoplatform.portletcontainer", "exo.pc.component.plugins.wsrp1", "jar", module.version).
    addDependency(module.services.jsr168jsr286).
    addDependency(module.services.axis).
    addDependency(kernel.component.cache).
    addDependency(core.component.organization).
    addDependency(core.component.database);
  
  module.services.wsrp2 = 
    new Project("org.exoplatform.portletcontainer", "exo.pc.component.plugins.wsrp2", "jar", module.version).
    addDependency(module.services.jsr168jsr286).
    addDependency(module.services.axis).
    addDependency(kernel.component.cache).
    addDependency(core.component.organization).
    addDependency(core.component.database);

  module.web = {}
  module.web.wsrp = 
    new Project("org.exoplatform.portletcontainer", "exo.pc.applications.wsrp", "exopc-war", module.version).
    addDependency(module.services.wsrp1).
    addDependency(module.services.wsrp2);

  return module;
}