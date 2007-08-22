eXo.require("eXo.projects.Project")  ;

eXo.projects.Module = {
  tool : function(version) {
    this.version =  version ;
    this.relativeMavenRepo =  "org/exoplatform/tool" ;
    this.relativeSRCRepo =  "tools/trunk" ;
    this.name =  "tool" ;

    this.osbsh = new Project("org.exoplatform.tool", "exo.tool.build", "jar", "2.0") ;

    return this ;
  },

  kernel : function(version) {
    var kernel = {} ;
    kernel.version =  version ;
    kernel.relativeMavenRepo =  "org/exoplatform/kernel" ;
    kernel.relativeSRCRepo =  "kernel/trunk" ;
    kernel.name =  "kernel" ;
    
    kernel.commons = 
      new Project("org.exoplatform.kernel", "exo.kernel.commons", "jar", version).
      addDependency(new Project("commons-lang", "commons-lang", "jar", "2.1")).
      addDependency(new Project("xpp3", "xpp3", "jar", "1.1.3.4.O")).
      addDependency(new Project("xstream", "xstream", "jar", "1.1")).
      addDependency(new Project("dom4j", "dom4j", "jar", "1.6.1"));
    
    kernel.container = 
      new Project("org.exoplatform.kernel", "exo.kernel.container", "jar", version).
      addDependency(kernel.commons).
      addDependency(new Project("picocontainer", "picocontainer", "jar", "1.1")).
      addDependency(new Project("groovy", "groovy-all", "jar", "1.0")).
      addDependency(new Project("commons-beanutils", "commons-beanutils", "jar", "1.6")).
      addDependency(new Project("jibx", "jibx-run", "jar", "1.1.3")).
      addDependency(new Project("asm", "asm", "jar", "1.5.3")).
      addDependency(new Project("cglib", "cglib", "jar", "2.1_2"));

    kernel.misc = {} ;
    kernel.misc.drools = 
      new Project("drools", "drools-core", "jar", "2.0").
      addDependency(new Project("janino", "janino", "jar", "2.3.2")).
      addDependency(new Project("drools", "drools-base", "jar", "2.0")).
      addDependency(new Project("drools", "drools-io", "jar", "2.0")).
      addDependency(new Project("drools", "drools-java", "jar", "2.0")).
      addDependency(new Project("drools", "drools-smf", "jar", "2.0")) ;

    kernel.component = {};
    kernel.component.common = 
      new Project("org.exoplatform.kernel", "exo.kernel.component.common", "jar", version).
      addDependency(new Project("quartz", "quartz", "jar", "1.5.0-RC2")).
      addDependency(new Project("mail", "activation", "jar", "1.0")).
      addDependency(new Project("mail", "mail", "jar", "1.3.3"));

    kernel.component.command = 
      new Project("org.exoplatform.kernel", "exo.kernel.component.command", "jar", version).
      addDependency(new Project("commons-chain", "commons-chain", "jar", "1.0")).
      addDependency(new Project("commons-digester", "commons-digester", "jar", "1.7"));
      
    kernel.component.cache = 
      new Project("org.exoplatform.kernel", "exo.kernel.component.cache", "jar", version) ;

    kernel.component.remote = 
      new Project("org.exoplatform.kernel", "exo.kernel.component.remote", "jar", version). 
      addDependency(new Project("javagroups", "jgroups-all", "jar", "2.4"));
    
    return kernel; 
  },

  core : function(version) {
    var core = {} ;
    core.version = version ;
    core.relativeMavenRepo = "org/exoplatform/core" ;
    core.relativeSRCRepo = "core/trunk" ;
    core.name = "core" ;

    core.component = {}
    core.component.common = 
      new Project("org.exoplatform.core", "exo.core.component.common", "jar", version) .
      addDependency(new Project("directory-naming", "naming-core", "jar", "0.8")).
      addDependency(new Project("directory-naming", "naming-java", "jar", "0.8")).
      addDependency(new Project("jotm", "jotm", "jar", "2.0.10")).
      addDependency(new Project("javax.resource", "connector", "jar", "1.5"));

    core.component.ldap = new Project("org.exoplatform.core", "exo.core.component.ldap", "jar", version) ;

    core.component.database = 
      new Project("org.exoplatform.core", "exo.core.component.database", "jar", version) .
      addDependency(new Project("com.experlog", "xapool", "jar", "1.5.0")).
      addDependency(new Project("org.hibernate", "hibernate", "jar", "3.1.2")).
      addDependency(new Project("commons-collections", "commons-collections", "jar", "3.1")).
      addDependency(new Project("c3p0", "c3p0", "jar", "0.8.4.5")).
      addDependency(new Project("antlr", "antlr", "jar", "2.7.5")).
      addDependency(new Project("javax.transaction", "jta", "jar", "1.0.1B")).
      addDependency(new Project("jotm", "jotm_jrmp_stubs", "jar", "2.0.10")).
      addDependency(new Project("jotm", "jotm", "jar", "2.0.10")).
      addDependency(new Project("howl", "howl-logger", "jar", "0.1.11")).
      addDependency(new Project("hsqldb", "hsqldb", "jar", "1.8.0.7")).
      addDependency(new Project("javax.resource", "connector-api", "jar", "1.5"));

    core.component.documents =
      new Project("org.exoplatform.core", "exo.core.component.document", "jar", version).
      addDependency(new Project("pdfbox", "pdfbox", "jar", "0.7.2")).
      addDependency(new Project("html-parser", "html-parser", "jar", "1.6")).
      addDependency(new Project("poi", "poi", "jar", "3.0-alpha1")).
      addDependency(new Project("poi", "poi-scratchpad", "jar", "3.0-alpha1"));
      
    core.component.organization = 
      new Project("org.exoplatform.core", "exo.core.component.organization.api", "jar", version).
      addDependency(new Project("org.exoplatform.core", "exo.core.component.organization.jdbc", "jar", version));

    core.component.security = 
      new Project("org.exoplatform.core", "exo.core.component.security", "jar", version) ;

    core.component.xmlProcessing = 
      new Project("org.exoplatform.core", "exo.core.component.xml-processing", "jar", version) ;

    core.component.resources = 
      new Project("org.exoplatform.core", "exo.core.component.resources.api", "jar", version).
      addDependency(new Project("org.exoplatform.core", "exo.core.component.database", "jar", version));
    
    return core ;
  }, 
  
  eXoPortletContainer : function(version) {
    var eXoPortletContainer = {} ;
    eXoPortletContainer.versin = version ;
    eXoPortletContainer.relativeMavenRepo = "org/exoplatform/portletcontainer" ;
    eXoPortletContainer.relativeSRCRepo = "portlet-container/branches/2.0" ;
    eXoPortletContainer.name = "pc" ;

    eXoPortletContainer.services = {} ;
    eXoPortletContainer.services.jsr168 = 
      new Project("org.exoplatform.portletcontainer", "exo.pc.component.core", "jar", version).
      addDependency(new Project("org.exoplatform.portletcontainer", "exo.pc.component.plugins.pc", "jar", version)).
      addDependency(new Project("javax.portlet", "portlet-api", "jar", "2.0"));
    return eXoPortletContainer ;
  },

  eXoJcr : function(version) {
    var eXoJcr = {} ;
    eXoJcr.version =  version ;
    eXoJcr.relativeMavenRepo =  "org/exoplatform/jcr" ;
    eXoJcr.relativeSRCRepo =  "jcr/trunk" ;
    eXoJcr.name =  "jcr" ;
    
    eXoJcr.services = {}
    eXoJcr.services.jcr = 
      new Project("org.exoplatform.jcr", "exo.jcr.component.core", "jar", version).
      addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.ext", "jar", version)).
      addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.webdav", "jar", version)).
      addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.ftp", "jar", version)).
      addDependency(new Project("jcr", "jcr", "jar", "1.0")).
      addDependency(new Project("concurrent", "concurrent", "jar", "1.3.2")).
      addDependency(new Project("javagroups", "jgroups-all", "jar", "2.4")).
      addDependency(new Project("lucene", "lucene", "jar", "1.4.3"));

    eXoJcr.frameworks = {}
    eXoJcr.frameworks.web = 
      new Project("org.exoplatform.jcr", "exo.jcr.framework.web", "jar", version).
      addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.rest", "jar", version)).
      addDependency(new Project("commons-chain", "commons-chain", "jar", "1.0")).
      addDependency(new Project("log4j", "log4j", "jar", "1.2.8"));

    eXoJcr.frameworks.command = new Project("org.exoplatform.jcr", "exo.jcr.framework.command", "jar", version) ; 
    
    return eXoJcr ;
  },

  portal : function(kernel, core, eXoPortletContainer, jcr, version) {
    var portal = {}
    portal.version =  version ;
    portal.relativeMavenRepo =  "org/exoplatform/portal" ;
    portal.relativeSRCRepo =  "portal/trunk" ;
    portal.name =  "portal" ;
    
    portal.component = {}
    portal.component.jcrext = 
      new Project("org.exoplatform.portal", "exo.portal.component.jcrext", "jar", version) ;
    portal.component.portal  = 
      new Project("org.exoplatform.portal", "exo.portal.component.portal", "jar", version) ;
    portal.component.web = 
      new Project("org.exoplatform.portal", "exo.portal.component.web", "jar", version) ;
    portal.component.applicationRegistry  = 
      new Project("org.exoplatform.portal", "exo.portal.component.application-registry", "jar", version) ;
    portal.component.resources = 
      new Project("org.exoplatform.portal", "exo.portal.component.resources", "jar", version) ;
      
    portal.component.xmlParser = 
      new Project("org.exoplatform.portal", "exo.portal.component.xml-parser", "jar", version).
      addDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.0")).
      addDependency(new Project("commons-codec", "commons-codec", "jar", "1.3"));
      
    portal.component.scripting =
      new Project("org.exoplatform.portal", "exo.portal.component.scripting", "jar", version).
      addDependency(new Project("rhino", "js", "jar", "1.6R5")) ;

    portal.webui = {};
    portal.webui.core = 
      new Project("org.exoplatform.portal", "exo.portal.webui.core", "jar", version) ;
    portal.webui.eXo = 
      new Project("org.exoplatform.portal", "exo.portal.webui.eXo", "jar", version) ;

    portal.webui.portal = 
      new Project("org.exoplatform.portal", "exo.portal.webui.portal", "jar", version).
      addDependency(portal.webui.core) .
      addDependency(portal.webui.eXo) .
      addDependency(portal.component.web).
      addDependency(portal.component.jcrext) .
      addDependency(portal.component.resources) .
      addDependency(portal.component.applicationRegistry) .
      addDependency(portal.component.portal). 
      addDependency(portal.component.scripting). 
      
      addDependency(kernel.container) .
      addDependency(kernel.component.common) .
      addDependency(kernel.component.remote) .
      addDependency(kernel.component.cache) .
      addDependency(kernel.component.command) .

      addDependency(core.component.database) .
      addDependency(core.component.organization) .
      addDependency(core.component.security) .
      addDependency(core.component.xmlProcessing) .
      addDependency(core.component.documents).
      addDependency(core.component.resources).

      addDependency(jcr.services.jcr) .
      addDependency(eXoPortletContainer.services.jsr168) ;

    portal.portlet = {};
    portal.portlet.content =  
      new Project("org.exoplatform.portal", "exo.portal.portlet.content", "exo-portlet", version).
      addDependency(portal.component.xmlParser) ;

    portal.portlet.exoadmin = 
      new Project("org.exoplatform.portal", "exo.portal.portlet.exoadmin", "exo-portlet", version);
      
    portal.portlet.site = 
      new Project("org.exoplatform.portal", "exo.portal.portlet.site", "exo-portlet", version);
      
    portal.portlet.web = 
      new Project("org.exoplatform.portal", "exo.portal.portlet.web", "exo-portlet", version);
      
    portal.portlet.test = 
      new Project("org.exoplatform.portal", "exo.portal.portlet.test", "exo-portlet", version);

    
    portal.eXoApplication = {};
    portal.eXoApplication.web = 
      new Project("org.exoplatform.portal", "exo.portal.eXoApplication.web", "war", version);
    portal.eXoApplication.web.deployName = "eXoAppWeb";
      
    portal.sample = {};
    portal.sample.framework = 
      new Project("org.exoplatform.portal", "exo.portal.sample.framework", "war", version);
    portal.sample.framework.deployName = "eXoSampleFramework" ;
    
    portal.eXoWidget = {};
    portal.eXoWidget.web = 
      new Project("org.exoplatform.portal", "exo.portal.eXoWidget.web", "war", version);
    portal.eXoWidget.web.deployName = "eXoWidgetWeb" ;
    
    portal.web = {}
    portal.web.eXoResources = 
      new Project("org.exoplatform.portal", "exo.portal.web.eXoResources", "war", version);
    portal.web.eXoMacSkin = 
      new Project("org.exoplatform.portal", "exo.portal.web.eXoMacSkin", "war", version);
    portal.web.eXoVistaSkin = 
      new Project("org.exoplatform.portal", "exo.portal.web.eXoVistaSkin", "war", version);
      
    portal.web.portal = 
      new Project("org.exoplatform.portal", "exo.portal.web.portal", "exo-portal", version).
      addDependency(portal.webui.portal) .
      addDependency(portal.web.eXoResources).
      addDependency(portal.web.eXoMacSkin).
      addDependency(portal.web.eXoVistaSkin).
      addDependency(jcr.frameworks.web).
      addDependency(jcr.frameworks.command) ;
    
    portal.server = {}
      portal.server.tomcat = {}
      portal.server.tomcat.patch = 
        new Project("org.exoplatform.portal", "exo.portal.server.tomcat.patch", "jar", version);
             
      portal.server.jboss = {}
      portal.server.jboss.patch = 
        new Project("org.exoplatform.portal", "exo.portal.server.jboss.patch", "jar", version);

      portal.server.jonas = {}
      portal.server.jonas.patch = 
        new Project("org.exoplatform.portal", "exo.portal.server.jonas.patch", "jar", version);

    return portal ;
  },

  ecm : function(kernel, core, eXoPortletContainer, jcr, portal, version) {
    var ecm = {}
    ecm.version =  version ;
    ecm.relativeMavenRepo =  "org/exoplatform/ecm" ;
    ecm.relativeSRCRepo =  "ecm/trunk" ;
    ecm.name =  "ecm" ;
    
    ecm.portlet = {}
    ecm.portlet.ecm = 
      new Project("org.exoplatform.ecm", "exo.ecm.portlet.ecm", "exo-portlet", version).
      addDependency(new Project("org.exoplatform.ecm", "exo.ecm.component.cms", "jar",  version)) .      
      addDependency(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.api", "jar", version)) .
      addDependency(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.jbpm.facade", "jar", version)) .
      addDependency(new Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.jbpm.engine", "jar", "3.0")) .
      addDependency(new Project("rome", "rome", "jar", "0.8")) .
      addDependency(new Project("com.totsp.feedpod", "itunes-com-podcast", "jar", "0.2")) .
      addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) .
      addDependency(new Project("jdom", "jdom", "jar", "1.0")).
      addDependency(new Project("org.apache.ws.commons", "ws-commons-util", "jar", "1.0.1")) ;
      //addDependency(Project("org.exoplatform.ecm", "exo.ecm.component.workflow.impl.bonita", "jar", version)) ;

    ecm.portlet.workflow = 
      new Project("org.exoplatform.ecm", "exo.ecm.portlet.workflow", "exo-portlet", version);
    
    ecm.web = {}
    ecm.web.ecmportal = 
      new Project("org.exoplatform.ecm", "exo.ecm.web.portal", "exo-portal", version).
      addDependency(portal.web.eXoResources) .
      addDependency(portal.web.eXoMacSkin) .
      addDependency(portal.web.eXoVistaSkin) .
      addDependency(portal.webui.portal) .
      addDependency(jcr.frameworks.command) .
      addDependency(jcr.frameworks.web) ;
      
     return ecm ;
  },
  
  
  cs :function(kernel, core, pc, jcr, portal, version) {
    var cs = {} ;
    cs.version =  version ;
    cs.relativeMavenRepo =  "org/exoplatform/cs" ;
    cs.relativeSRCRepo =  "cs/trunk" ;
    cs.name =  "cs" ;
    
    cs.eXoApplication = {};
    cs.eXoApplication.mail = 
      new Project("org.exoplatform.cs", "exo.cs.eXoApplication.mail.webapp", "war", version).
      addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.mail.service", "jar",  version));
    cs.eXoApplication.mail.deployName = "mail";
    
    cs.eXoApplication.forum = 
      new Project("org.exoplatform.cs", "exo.cs.eXoApplication.forum.webapp", "war", version).
        addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.forum.service", "jar",  version));
    cs.eXoApplication.forum.deployName = "forum";
    
    cs.eXoApplication.calendar = 
          new Project("org.exoplatform.cs", "exo.cs.eXoApplication.calendar.webapp", "war", version).
            addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.calendar.service", "jar",  version)).
            addDependency(new Project("ical4j", "ical4j", "jar", "0.9.20")) ;
    cs.eXoApplication.calendar.deployName = "calendar";
    
    cs.eXoApplication.contact = 
              new Project("org.exoplatform.cs", "exo.cs.eXoApplication.contact.webapp", "war", version).
                addDependency(new Project("org.exoplatform.cs", "exo.cs.eXoApplication.contact.service", "jar",  version));
    cs.eXoApplication.contact.deployName = "contact";
    
    return cs ;
  },

  m6: function (kernel, core, eXoPortletContainer, jcr, portal, version) {
    var m6 ={}
    m6.version =  version ;
    m6.relativeMavenRepo =  "org/exoplatform/m6" ;
    m6.relativeSRCRepo =  "m6/trunk" ;
    m6.name =  "m6" ;
    
    m6.portlet = {}
    m6.portlet.web = new Project("org.exoplatform.m6", "m6.portlet.web", "exo-portlet", version);
    m6.portlet.web.deployName = "m6PortletWeb" ;
    
    m6.web = {}
    m6.web.m6Resources = new Project("org.exoplatform.m6", "m6.web.m6Resources", "war", version);
    m6.web.m6Resources.deployName = "m6Resources" ;

    m6.web.m6portal = 
      new Project("org.exoplatform.m6", "m6.web.portal", "exo-portal", version).
      addDependency(portal.web.eXoResources) .
      addDependency(portal.webui.portal). 
      addDependency(jcr.frameworks.command) .
      addDependency(jcr.frameworks.web) ;

    return m6 ;
  },
  	
  geneve: function (kernel, core, eXoPortletContainer, jcr, portal, version) {
    var geneve ={}
    geneve.version =  version ;
    geneve.relativeMavenRepo =  "org/exoplatform/geneve" ;
    geneve.relativeSRCRepo =  "geneve/website_poc/trunk" ;
    geneve.name =  "geneve" ;
    
    geneve.portlet = {}
    geneve.portlet.web = new Project("org.exoplatform.geneve", "geneve.portlet.web", "exo-portlet", version);
    geneve.portlet.web.deployName = "genevePortletWeb" ;
    
    geneve.web = {}
    geneve.web.geneveResources = new Project("org.exoplatform.geneve", "geneve.web.geneveResources", "war", version);
    geneve.web.geneveResources.deployName = "geneveResources" ;

    geneve.web.geneveportal = 
      new Project("org.exoplatform.geneve", "geneve.web.portal", "exo-portal", version).
      addDependency(portal.web.eXoResources) .
      addDependency(portal.webui.portal). 
      addDependency(jcr.frameworks.command) .
      addDependency(jcr.frameworks.web) ;

    return geneve ;
  },
}
