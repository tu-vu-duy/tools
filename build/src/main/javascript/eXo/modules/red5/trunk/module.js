eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var module = new Module();
  
  module.version = "trunk" ;
  module.relativeMavenRepo = "org/exoplatform/red5" ;
  module.relativeSRCRepo = "exo-int/red5/trunk" ;
  module.name = "red5" ;
  
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.red5", "red5.server.tomcat.patch", "jar", module.version);

  return module ;
}
