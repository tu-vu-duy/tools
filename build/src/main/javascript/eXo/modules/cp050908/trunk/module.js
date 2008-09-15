eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {

  var kernel = params.kernel;
  var core = params.core;
  var eXoPortletContainer = params.eXoPortletContainer;
  var jcr = params.eXoJcr;
  var portal = params.portal;
  var ecm = params.ecm ;
//  var cs = params.cs ;
//  var ws = params.ws;
  var module = new Module();

  module.version = "trunk" ;
  module.relativeMavenRepo =  "org/exoplatform/cp050908" ;
  module.relativeSRCRepo =  "cp050908/trunk" ;
  module.name =  "cp050908" ;
       
  module.portlet = {}
  module.portlet.web = new Project("org.exoplatform.cp050908", "cp050908.portlet.web", "exo-portlet", module.version);
  module.portlet.web.deployName = "cp050908PortletWeb" ;
  
  module.portlet.prope = new Project("org.exoplatform.cp050908", "cp050908.portlet.prope", "exo-portlet", module.version).
  addDependency(new Project("org.springframework", "spring-web", "jar", "2.5.3")).
  addDependency(new Project("org.jboss.portletbridge", "portletbridge-api", "jar", "1.0.0.B4")).
  addDependency(new Project("org.jboss.portletbridge", "portletbridge-impl", "jar", "1.0.0.B4")).
  addDependency(new Project("org.richfaces.framework", "richfaces-api", "jar", "3.2.2.GA")).
  addDependency(new Project("org.richfaces.ui", "richfaces-ui", "jar", "3.2.2.GA")).
  addDependency(new Project("org.richfaces.framework", "richfaces-impl", "jar", "3.2.2.GA")). 
  addDependency(new Project("com.sun.facelets", "jsf-facelets", "jar", "1.1.14"));
  module.portlet.prope.deployName = "prope" ;
  /*  
  <socle.version>2.1.0</socle.version>
  <richfaces.version></richfaces.version>
  <portletbridge.version>1.0.0.B4</portletbridge.version>
  


  <!-- Provided -->
  <dependency>
    <groupId>javax.portlet</groupId>
    <artifactId>portlet-api</artifactId>
    <version>2.0</version>
    <scope>provided</scope>
  </dependency>

  <dependency>
    <groupId>javax.el</groupId>
    <artifactId>el-api</artifactId>
    <version>1.2</version>
    <scope>provided</scope>
  </dependency>

  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
    <scope>provided</scope>
  </dependency>

  <dependency>
    <groupId>javax.faces</groupId>
    <artifactId>jsf-api</artifactId>
    <version>1.2_04-p02</version>
    <scope>provided</scope>
  </dependency>

  <dependency>
    <groupId>javax.faces</groupId>
    <artifactId>jsf-impl</artifactId>
    <version>1.2_04-p02</version>
    <scope>provided</scope>
  </dependency>
	*/
  module.web = {} ;
  module.web.eXoResources = new Project("org.exoplatform.cp050908", "cp050908.web.cp050908Resources", "war", module.version);
  module.web.eXoResources.deployName = "eXoResourcesCp050908" ;
  
  module.component = {} ;
  module.component.web=
    new Project("org.exoplatform.cp050908", "cp050908.component.web", "jar", module.version).
    addDependency(portal.component.web) ;
      
  module.server = {}
  module.server.tomcat = {}
  module.server.tomcat.patch = 
    new Project("org.exoplatform.cp050908", "cp050908.server.tomcat.patch", "jar", module.version);

  module.web.portal = 
    new Project("org.exoplatform.cp050908", "exo.cp050908.web.portal", "exo-portal", module.version).   
    addDependency(portal.web.eXoResources) .
    addDependency(portal.web.eXoMacSkin) .
    addDependency(portal.web.eXoVistaSkin) .
    addDependency(portal.webui.portal) .
//    addDependency(cs.web.csResources) .
    addDependency(jcr.frameworks.command) .
    addDependency(jcr.frameworks.web).
    addDependency(ecm.web.rest);
    

  return module;
}
