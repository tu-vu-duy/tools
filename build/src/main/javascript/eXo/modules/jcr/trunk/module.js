eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {
  var module = {} ;
  
  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/jcr" ;
  module.relativeSRCRepo =  "jcr/trunk" ;
  module.name =  "jcr" ;
    
  module.services = {}
  module.services.jcr = 
    new Project("org.exoplatform.jcr", "exo.jcr.component.core", "jar", module.version).
    addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.ext", "jar", module.version)).
    addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.webdav", "jar", module.version)).
    addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.ftp", "jar", module.version)) .
    addDependency(new Project("jcr", "jcr", "jar", "1.0")).
    addDependency(new Project("concurrent", "concurrent", "jar", "1.3.4")).
    addDependency(new Project("javagroups", "jgroups-all", "jar", "2.5.2")).
    addDependency(new Project("stax", "stax-api", "jar", "1.0")).
//		addDependency(new Project("stax", "stax", "jar", "1.2.0")).
		addDependency(new Project("org.apache.ws.commons","ws-commons-util","jar","1.0.1")).		
    addDependency(new Project("org.apache.lucene", "lucene-core", "jar", "2.2.0")).
    addDependency(new Project("org.apache.lucene", "lucene-spellchecker", "jar", "2.2.0")).
    addDependency(new Project("org.apache.lucene", "lucene-memory", "jar", "2.2.0"));

  module.frameworks = {}
  module.frameworks.web = 
    new Project("org.exoplatform.jcr", "exo.jcr.framework.web", "jar", module.version).  
    addDependency(new Project("org.exoplatform.ws", "exo.ws.rest.core", "jar", module.version)).
    addDependency(new Project("org.exoplatform.ws", "exo.ws.commons", "jar", module.version)).
    addDependency(new Project("commons-chain", "commons-chain", "jar", "1.0"));

  module.frameworks.command = new Project("org.exoplatform.jcr", "exo.jcr.framework.command", "jar", module.version).
    addDependency(new Project("commons-fileupload", "commons-fileupload", "jar", "1.0")); 
    
  return module ;
}
