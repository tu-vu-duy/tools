eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(version) {

  var module = new Module();
  
  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/tool" ;
  module.relativeSRCRepo =  "tools/trunk" ;
  module.name =  "tool" ;

  module.osbsh = new Project("org.exoplatform.tool", "exo.tool.build", "jar", "2.0") ;
  
  return module;
}