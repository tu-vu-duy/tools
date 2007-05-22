import  java.util.HashMap ;
import  java.util.ArrayList ; 

eXoProduct() {
  Product() {
    String name  = null ;
    String portalwar = null ;
    dependenciesHolder = new HashMap() ;
    serverPatches = new HashMap() ;
    codeRepo = null ;
    dependencyCodeRepos = null ;

    module = null ;
    dependencyModule = null ;
    
    addServerPatch(serverName, project) {
      holders = serverPatches.get(serverName) ;
      if(holders == null) {
        holders = new ArrayList(3) ;
        serverPatches.put(serverName, holders) ;
      }
      holders.add(project) ;
    }
    
    getServerPatches(serverName) { return serverPatches.get(serverName) ; }
    
    addDependencies(project) {
      dependenciesHolder.put(project.relativePath, project) ;
      if(project.hasDependency()) {
        list = project.dependencies ;
        for(int i = 0; i < list.size(); i++) {
          addDependencies(list.get(i)) ;
        }
      }
    }
    
    getDependencies() { return dependenciesHolder.values() ; }
    
    DeployTask(Object product, Object server, String[] repos) {
      descriptor =  TaskDescriptor("Deploy Product", server.serverHome) ;
      execute() {
        eXo.System.info("DELETE", "Delete " + server.serverHome);
        eXo.IOUtil.delete(server.serverHome) ;
        eXo.System.info("COPY", "Copy a clean server " + server.cleanServer);
        eXo.IOUtil.copyFolder(eXo.env.dependenciesDir + "/" + server.cleanServer, server.serverHome) ;
        server.preDeploy(product) ;
        patches = getServerPatches(server.name) ;
        for(i = 0; i <  patches.size(); i++) {
          project = patches.get(i) ;
          String message = "Patch the server " + server.name + 
                           " with project " +  project.artifactId + " " + project.version ;
          eXo.System.info("INFO", message);
          new File(server.patchDir).mkdirs();
          project.extractTo(repos, server.patchDir, "META-INF/maven.*") ;
        }
        Iterator i = getDependencies().iterator();
        counter = 0 ;
        while(i.hasNext()) {
          project = i.next();
          project.deployTo(repos, server) ;
          server.onDeploy(project) ;
          counter++ ;
        }
        eXo.System.info("INFO", "Deploy total " +  counter + " files");
        server.postDeploy(product) ;
      }
      return this ;
    }
    
    return this ;
  }
  
  eXoPortalProduct() {
    product = Product();
    product.name = "eXoPortal" ;
    product.portalwar = "portal.war" ;
    
    Module = Module();
    
    kernel = Module.kernel("2.0.3") ;
    core = Module.core("2.0.3") ;
    eXoPortletContainer = Module.eXoPortletContainer("2.0") ;
    eXoJcr = Module.eXoJcr("1.6") ;
    portal = Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");
    
    product.addDependencies(portal.web.portal) ;
    product.addDependencies(portal.portlet.content) ;
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;
    product.addDependencies(portal.portlet.site) ;
    product.addDependencies(portal.portlet.test) ;

    product.addDependencies(portal.eXoApplication.framework) ;
    product.addDependencies(portal.eXoApplication.web) ;
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "portal/trunk" ;
    product.dependencyCodeRepos = "tools/trunk,kernel/trunk,core/trunk";

    product.module = portal ;
    product.dependencyModule = new Object[] { Module.tool("2.0.3"), kernel, core, eXoPortletContainer, eXoJcr };

    return product ;
  }
  
  eXoECMProduct() {
    product = Product();
    product.name = "eXoECM" ;
    product.portalwar = "portal.war" ;
    
    Module = Module();
    
    kernel = Module.kernel("2.0.3") ;
    core = Module.core("2.0.3") ;
    eXoPortletContainer = Module.eXoPortletContainer("2.0") ;
    eXoJcr = Module.eXoJcr("1.6") ;
    portal = Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");
    ecm = Module.ecm(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    
    product.addDependencies(ecm.web.ecmportal) ;
    product.addDependencies(portal.portlet.content) ;
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;
    product.addDependencies(portal.portlet.site) ;
    product.addDependencies(ecm.portlet.ecm) ;
    product.addDependencies(ecm.portlet.workflow) ;

    product.addDependencies(portal.eXoApplication.framework) ;
    product.addDependencies(portal.eXoApplication.web) ;
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "ecm/trunk" ;
    product.dependencyCodeRepos = "tools/trunk,kernel/trunk,core/trunk,portal/trunk";

    product.module = ecm ;
    product.dependencyModule = new Object[] { Module.tool("2.0.3"), kernel, core, eXoPortletContainer, eXoJcr, portal };
    return product ;
  }

  eXoGroupwareProduct() {
    product = Product();
    product.name = "eXoGroupware" ;
    product.portalwar = "portal.war" ;
    
    Module = Module();
    
    kernel = Module.kernel("2.0.3") ;
    core = Module.core("2.0.3") ;
    eXoPortletContainer = Module.eXoPortletContainer("2.0") ;
    eXoJcr = Module.eXoJcr("1.6") ;
    portal = Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");
    groupware = Module.groupware(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    
    product.addDependencies(portal.web.portal) ;
    product.addDependencies(portal.portlet.content) ;
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;
    product.addDependencies(portal.portlet.site) ;

    product.addDependencies(portal.eXoApplication.framework) ;
    product.addDependencies(portal.eXoApplication.web) ;
    
    product.addDependencies(groupware.portlet.forum) ;
    product.addDependencies(groupware.portlet.mail) ;
    product.addDependencies(groupware.portlet.calendar) ;
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "groupware/trunk" ;
    product.dependencyCodeRepos = "tools/trunk,kernel/trunk,core/trunk,portal/trunk";

    product.module = groupware ;
    product.dependencyModule = new Object[] { Module.tool("2.0.3"), kernel, core, eXoPortletContainer, eXoJcr, portal };
    return product ;
  }

  eXoAllProduct() {
    product = Product();
    product.name = "eXoAllProduct" ;
    product.portalwar = "portal.war" ;
    
    Module = Module();
    
    kernel = Module.kernel("2.0.3") ;
    core = Module.core("2.0.3") ;
    eXoPortletContainer = Module.eXoPortletContainer("2.0") ;
    eXoJcr = Module.eXoJcr("1.6") ;
    portal = Module.portal(kernel, core, eXoPortletContainer, eXoJcr, "2.0");
    ecm = Module.ecm(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    groupware = Module.groupware(kernel, core, eXoPortletContainer, eXoJcr, portal, "2.0");
    
    product.addDependencies(ecm.web.ecmportal) ;
    product.addDependencies(portal.portlet.content) ;
    product.addDependencies(portal.portlet.exoadmin) ;
    product.addDependencies(portal.portlet.web) ;
    product.addDependencies(portal.portlet.site) ;

    product.addDependencies(ecm.portlet.ecm) ;
    product.addDependencies(ecm.portlet.workflow) ;

    product.addDependencies(portal.eXoApplication.framework) ;
    product.addDependencies(portal.eXoApplication.web) ;
    
    product.addDependencies(groupware.portlet.forum) ;
    product.addDependencies(groupware.portlet.mail) ;
    product.addDependencies(groupware.portlet.calendar) ;
    
    product.addServerPatch("tomcat", portal.server.tomcat.patch) ;
    product.addServerPatch("jboss",  portal.server.jboss.patch) ;
    product.addServerPatch("jonas",  portal.server.jonas.patch) ;
    
    product.codeRepo = "groupware/trunk" ;
    product.dependencyCodeRepos = "tools/trunk,kernel/trunk,core/trunk,portal/trunk,ecm/trunk";

    product.module = groupware  ;
    product.dependencyModule = new Object[] { Module.tool("2.0.3"), kernel, core, eXoPortletContainer, eXoJcr, portal, ecm };
    return product ;
  }
  return this ;
}
