eXo.require("eXo.projects.Project")  ;

function Tools(version) {
  this.version =  version ;
  this.relativeMavenRepo =  "org/exoplatform/tool" ;
  this.relativeSRCRepo =  "tools/trunk" ;
  this.name =  "tool" ;

  this.build = new Project("org.exoplatform.tool", "exo.tool.build", "jar", version) ;
}

eXo.module.tools = new Tools('2.0.0') ;
