eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {
  var module = new Module();

  module.version = "0.1" ;
  module.relativeMavenRepo =  "org/exoplatform/ws" ;
  module.relativeSRCRepo =  "ws/trunk" ;
  module.name =  "ws" ;

  module.commons = 
    new Project("org.exoplatform.ws.commons", "exo.ws.commons", "jar", module.version);

  module.rest = 
    new Project("org.exoplatform.ws.rest", "exo.rest.core", "jar", module.version).      
    addDependency(new Project("commons-chain", "commons-chain", "jar", "1.0")) .
    addDependency(new Project("javax.xml.parsers", "jaxp-api", "jar", "1.4")) .
    addDependency(new Project("javax.xml.bind", "jaxp-api", "jar", "2.0")) .
    addDependency(new Project("com.sun.xml.bind", "jaxb-impl", "jar", "2.0.2")) .
    addDependency(new Project("com.sun.xml.parsers", "jaxp-ri", "jar", "1.4")) .
    addDependency(new Project("org.jvnet.jaxb2.maven2", "maven-jaxb2-plugin", "jar", "0.1"));
      
  module.soap = {};
  module.soap.jsr181 =
    new Project("org.exoplatform.ws.soap", "exo.soap.xfire.jsr181", "jar", module.version).
    addDependency(new Project("picocontainer", "picocontainer", "jar", "1.1")) .
    addDependency(new Project("org.codehaus.xfire", "xfire-jsr181-api", "jar", "1.0")) .
    addDependency(new Project("org.codehaus.xfire", "xfire-all", "jar", "1.2.6")) .
    addDependency(new Project("stax", "stax-api", "jar", "1.0.1")) .
    addDependency(new Project("wsdl4j", "wsdl4j", "jar", "1.6.1")) .
    addDependency(new Project("jdom", "jdom", "jar", "1.0"));  
  
  return module;
}