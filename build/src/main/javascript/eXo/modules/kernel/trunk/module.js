eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {
  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/kernel" ;
  module.relativeSRCRepo =  "kernel/trunk" ;
  module.name = "kernel" ;
    
  module.commons = 
    new Project("org.exoplatform.kernel", "exo.kernel.commons", "jar", module.version).
    addDependency(new Project("commons-lang", "commons-lang", "jar", "2.1")).
    addDependency(new Project("xpp3", "xpp3", "jar", "1.1.3.4.O")).
    addDependency(new Project("xstream", "xstream", "jar", "1.1")).
    addDependency(new Project("dom4j", "dom4j", "jar", "1.6.1"));
    
  module.container = 
    new Project("org.exoplatform.kernel", "exo.kernel.container", "jar", module.version).
    addDependency(module.commons).
    addDependency(new Project("picocontainer", "picocontainer", "jar", "1.1")).
    addDependency(new Project("groovy", "groovy-all", "jar", "1.0")).
    addDependency(new Project("commons-beanutils", "commons-beanutils", "jar", "1.6")).
    addDependency(new Project("jibx", "jibx-run", "jar", "1.1.3")).
    addDependency(new Project("asm", "asm", "jar", "1.5.3")).
    addDependency(new Project("cglib", "cglib", "jar", "2.1_2"));

  module.misc = {} ;
  module.misc.drools = 
    new Project("drools", "drools-core", "jar", "2.0").
    addDependency(new Project("janino", "janino", "jar", "2.3.2")).
    addDependency(new Project("drools", "drools-base", "jar", "2.0")).
    addDependency(new Project("drools", "drools-io", "jar", "2.0")).
    addDependency(new Project("drools", "drools-java", "jar", "2.0")).
    addDependency(new Project("drools", "drools-smf", "jar", "2.0")) ;

  module.component = {};
  module.component.common = 
    new Project("org.exoplatform.kernel", "exo.kernel.component.common", "jar", module.version).
    addDependency(new Project("quartz", "quartz", "jar", "1.5.0-RC2")).
    addDependency(new Project("mail", "activation", "jar", "1.0")).
    addDependency(new Project("javax.mail", "mail", "jar", "1.4"));

  module.component.command = 
    new Project("org.exoplatform.kernel", "exo.kernel.component.command", "jar", module.version).
    addDependency(new Project("commons-chain", "commons-chain", "jar", "1.0")).
    addDependency(new Project("commons-digester", "commons-digester", "jar", "1.7"));
    
  module.component.cache = 
    new Project("org.exoplatform.kernel", "exo.kernel.component.cache", "jar", module.version) ;

  module.component.remote = 
    new Project("org.exoplatform.kernel", "exo.kernel.component.remote", "jar", module.version). 
    addDependency(new Project("javagroups", "jgroups-all", "jar", "2.4"));
  
  return module;
}