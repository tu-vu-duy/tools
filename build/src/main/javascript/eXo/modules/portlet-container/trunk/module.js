eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {
  var module = new Module();
  
  module.version = "trunk" ;
  module.relativeMavenRepo = "org/exoplatform/portletcontainer" ;
  module.relativeSRCRepo = "portlet-container/trunk" ;
  module.name = "pc" ;

  module.services = {} ;
  module.services.jsr168 = 
    new Project("org.exoplatform.portletcontainer", "exo.pc.component.core", "jar", module.version).
    addDependency(new Project("org.exoplatform.portletcontainer", "exo.pc.component.plugins.pc", "jar", module.version)).
    addDependency(new Project("javax.portlet", "portlet-api", "jar", "2.0"));
  
  return module;
}