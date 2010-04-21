eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var module = new Module();

  module.version =  "1.0.0" ;
  module.relativeMavenRepo =  "org/exoplatform/companyforum" ;
  module.relativeSRCRepo =  "company-forum/trunk" ;
  module.name =  "CompanyForum" ;
      
  return module;
}
