eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {
  var module = new Module();
  
  module.version = "2.0rc5" ;
  module.relativeMavenRepo = "org/exoplatform/portletcontainer" ;
  module.relativeSRCRepo = "portlet-container/tags/2.0rc5" ;
  module.name = "pc" ;

  module.services = {} ;
  module.services.jsr168jsr286 = 
    new Project("org.exoplatform.portletcontainer", "exo.pc.component.core", "jar", module.version).
    addDependency(new Project("org.exoplatform.portletcontainer", "exo.pc.component.plugins.pc", "jar", module.version)).
    addDependency(new Project("javax.ccpp", "ccpp", "jar", "1.0")).
    addDependency(new Project("javax.xml.bind", "jaxb-api", "jar", "2.0")).
    addDependency(new Project("com.sun.xml.bind", "jaxb-impl", "jar", "2.0.2")).
    addDependency(new Project("javax.portlet", "portlet-api", "jar", "2.0"));
  
  return module;
}
