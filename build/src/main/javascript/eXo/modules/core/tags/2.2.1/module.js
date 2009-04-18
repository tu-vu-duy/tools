eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var module = new Module();
  
  module.version = "2.2.1" ;
  module.relativeMavenRepo = "org/exoplatform/core" ;
  module.relativeSRCRepo = "core/tags/2.2.1" ;
  module.name = "core" ;

  module.component = {}
     
  module.component.ldap = new Project("org.exoplatform.core", "exo.core.component.ldap", "jar", module.version) ;

  module.component.database = 
    new Project("org.exoplatform.core", "exo.core.component.database", "jar", module.version) .
    addDependency(new Project("com.experlog", "xapool", "jar", "1.5.0")).
    addDependency(new Project("org.hibernate", "hibernate", "jar", "3.1.2")).
    addDependency(new Project("commons-collections", "commons-collections", "jar", "3.1")).
    addDependency(new Project("c3p0", "c3p0", "jar", "0.9.1.2")).
    addDependency(new Project("antlr", "antlr", "jar", "2.7.6rc1")).
    addDependency(new Project("javax.transaction", "jta", "jar", "1.0.1B")).
    addDependency(new Project("jotm", "jotm_jrmp_stubs", "jar", "2.0.10")).
    addDependency(new Project("jotm", "jotm", "jar", "2.0.10")).
    addDependency(new Project("howl", "howl-logger", "jar", "0.1.11")).
    addDependency(new Project("hsqldb", "hsqldb", "jar", "1.8.0.7")).
    addDependency(new Project("javax.resource", "connector-api", "jar", "1.5"));

  module.component.documents =
    new Project("org.exoplatform.core", "exo.core.component.document", "jar", module.version).
    addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2")).
    addDependency(new Project("com.lowagie", "itext", "jar", "2.1.0")).
    addDependency(new Project("bouncycastle", "bcmail-jdk14", "jar", "136")).
    addDependency(new Project("bouncycastle", "bcprov-jdk14", "jar", "136")).
    addDependency(new Project("html-parser", "html-parser", "jar", "1.6")).
    addDependency(new Project("org.apache.poi", "poi", "jar", "3.0.2-FINAL")).
    addDependency(new Project("org.apache.poi", "poi-scratchpad", "jar", "3.0.2-FINAL"));
    
  module.component.organization = 
    new Project("org.exoplatform.core", "exo.core.component.organization.api", "jar", module.version).
    addDependency(new Project("org.exoplatform.core", "exo.core.component.organization.jdbc", "jar", module.version));
	
  module.component.organization.ldap =
	new Project("org.exoplatform.core", "exo.core.component.organization.ldap", "jar", module.version);
	
  module.component.security = {}
  module.component.security.core = 
    new Project("org.exoplatform.core", "exo.core.component.security.core", "jar", module.version) ;

  module.component.xmlProcessing = 
    new Project("org.exoplatform.core", "exo.core.component.xml-processing", "jar", module.version) ;

  module.component.resources = 
    new Project("org.exoplatform.core", "exo.core.component.resources.api", "jar", module.version).
    addDependency(new Project("org.exoplatform.core", "exo.core.component.gifbackport", "jar", module.version)).
    addDependency(new Project("org.exoplatform.core", "exo.core.component.database", "jar", module.version));
    module.component.gifbackport = 
    new Project("org.exoplatform.core", "exo.core.component.gifbackport", "jar", module.version);
    
  module.component.scriptGroovy = new Project("org.exoplatform.core", "exo.core.component.script.groovy", "jar", module.version) ;
  return module;
}
