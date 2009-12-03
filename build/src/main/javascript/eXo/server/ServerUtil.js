eXo.require("eXo.core.IOUtil");

function ServerUtil() { }

ServerUtil.prototype.createEarApplicationXmlForJboss = function(deployEarDir, product) {
  var earDir = new java.io.File(deployEarDir) ;
  var b = new java.lang.StringBuilder();
  b.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
  b.append("<!DOCTYPE application PUBLIC \"-//Sun Microsystems, Inc.//DTD J2EE Application 1.3//EN\" \"http://java.sun.com/dtd/application_1_3.dtd\">");
  b.append("\n<application>\n");
  b.append("  <display-name>exoplatform</display-name>\n");
  var eXoResources = "eXoResources.war";
  b.append("  <module>\n");
  b.append("    <web>\n");
  b.append("      <web-uri>01").append(eXoResources).append("</web-uri>\n");
  b.append("      <context-root>").append(eXoResources.substring(0, eXoResources.indexOf('.'))).append("</context-root>\n");
  b.append("    </web>\n");
  b.append("  </module>\n");
  b.append("  <module>\n");
  b.append("    <web>\n");
  b.append("      <web-uri>02").append(product.portalwar).append("</web-uri>\n");
  b.append("      <context-root>").append(product.portalwar.substring(0, product.portalwar.indexOf('.'))).append("</context-root>\n");
  b.append("    </web>\n");
  b.append("  </module>\n");
  var file = earDir.list();
  for (var i = 0; i < file.length; i++) {
    if(file[i].endsWith("war") && file[i] != product.portalwar && file[i] != eXoResources) {
      var idx = file[i].indexOf('.');
      var context = file[i].substring(0, idx);
      b.append("  <module>\n");
      b.append("    <web>\n");
      b.append("      <web-uri>").append(file[i]).append("</web-uri>\n");
      b.append("      <context-root>").append(context).append("</context-root>\n");
      b.append("    </web>\n");
      b.append("  </module>\n");
    } else if(file[i].endsWith("jar")) {
      b.append("  <module>\n").
        append("    <ejb>").append(file[i]).append("</ejb>\n").
        append("  </module>\n");
    } else if(file[i].endsWith("rar")) {
      b.append("  <module>\n");
      b.append("    <connector>").append(file[i]).append("</connector>\n");
      b.append("  </module>\n");
    }
  }
  b.append("</application>\n");
  eXo.core.IOUtil.createFolder(deployEarDir + "/META-INF");
  var out = 
    new java.io.FileOutputStream(deployEarDir + "/META-INF/application.xml");
  out.write(b.toString().getBytes(), 0, b.length());
  out.close();
}


ServerUtil.prototype.createEarApplicationXml = function(deployEarDir, product) {
  var earDir = new java.io.File(deployEarDir) ;
  var b = new java.lang.StringBuilder();
  b.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
  b.append("<!DOCTYPE application PUBLIC \"-//Sun Microsystems, Inc.//DTD J2EE Application 1.3//EN\" \"http://java.sun.com/dtd/application_1_3.dtd\">");
  b.append("\n<application>\n");
  b.append("  <display-name>exoplatform</display-name>\n");
  var eXoResources = "eXoResources.war";
  b.append("  <module>\n");
  b.append("    <web>\n");
  b.append("      <web-uri>").append(eXoResources).append("</web-uri>\n");
  b.append("      <context-root>").append(eXoResources.substring(0, eXoResources.indexOf('.'))).append("</context-root>\n");
  b.append("    </web>\n");
  b.append("  </module>\n");
  b.append("  <module>\n");
  b.append("    <web>\n");
  b.append("      <web-uri>").append(product.portalwar).append("</web-uri>\n");
  b.append("      <context-root>").append(product.portalwar.substring(0, product.portalwar.indexOf('.'))).append("</context-root>\n");
  b.append("    </web>\n");
  b.append("  </module>\n");
  var file = earDir.list();
  for (var i = 0; i < file.length; i++) {
    if(file[i].endsWith("war") && file[i] != product.portalwar && file[i] != eXoResources) {
      var idx = file[i].indexOf('.');
      var context = file[i].substring(0, idx);
      b.append("  <module>\n");
      b.append("    <web>\n");
      b.append("      <web-uri>").append(file[i]).append("</web-uri>\n");
      b.append("      <context-root>").append(context).append("</context-root>\n");
      b.append("    </web>\n");
      b.append("  </module>\n");
    } else if(file[i].endsWith("jar")) {
      b.append("  <module>\n").
        append("    <ejb>").append(file[i]).append("</ejb>\n").
        append("  </module>\n");
    } else if(file[i].endsWith("rar")) {
      b.append("  <module>\n");
      b.append("    <connector>").append(file[i]).append("</connector>\n");
      b.append("  </module>\n");
    }
  }
  b.append("</application>\n");
  eXo.core.IOUtil.createFolder(deployEarDir + "/META-INF");
  var out = 
    new java.io.FileOutputStream(deployEarDir + "/META-INF/application.xml");
  out.write(b.toString().getBytes(), 0, b.length());
  out.close();
}

ServerUtil.prototype.createWASApplicationXml = function(deployEarDir, product) {
  eXo.System.info("INFO", "---------------------------------------------------------------");
  eXo.System.info("INFO", "Create "+deployEarDir+"/META-INF/application.xml");
  
  var earDir = new java.io.File(deployEarDir) ;
  var b = new java.lang.StringBuilder();
  /*
   * Create the application.xml file with references to all JARs and WARs that the EAR contains
   */
  b.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
  b.append("<!DOCTYPE application PUBLIC \"-//Sun Microsystems, Inc.//DTD J2EE Application 1.3//EN\" \"http://java.sun.com/dtd/application_1_3.dtd\">");
  b.append("\n<application>\n");
  b.append("  <display-name>exoplatform</display-name>\n");
  var eXoResources = "eXoResources.war";
  b.append("  <module>\n");
  b.append("    <web>\n");
  b.append("      <web-uri>").append(eXoResources).append("</web-uri>\n");
  b.append("      <context-root>").append(eXoResources.substring(0, eXoResources.indexOf('.'))).append("</context-root>\n");
  b.append("    </web>\n");
  b.append("  </module>\n");
  b.append("  <module>\n");
  b.append("    <web>\n");
  b.append("      <web-uri>").append(product.portalwar).append("</web-uri>\n");
  b.append("      <context-root>").append(product.portalwar.substring(0, product.portalwar.indexOf('.'))).append("</context-root>\n");
  b.append("    </web>\n");
  b.append("  </module>\n");
  var file = earDir.list();
  for (var i = 0; i < file.length; i++) {
    if(file[i].endsWith("war") && file[i] != product.portalwar && file[i] != eXoResources) {
      var idx = file[i].indexOf('.');
      var context = file[i].substring(0, idx);
      b.append("  <module>\n");
      b.append("    <web>\n");
      b.append("      <web-uri>").append(file[i]).append("</web-uri>\n");
      b.append("      <context-root>").append(context).append("</context-root>\n");
      b.append("    </web>\n");
      b.append("  </module>\n");
    }
  }
  /*
   * Add security-role at the end of the application.xml file
   */
  b.append("  <security-role id=\"SecurityRole_1\">\n");
	b.append("    <description>All authenticated users as a default.</description>\n");
	b.append("    <role-name>users</role-name>\n");
	b.append("  </security-role>\n");
	b.append("  <security-role id=\"SecurityRole_2\">\n");
	b.append("    <description>All authenticated users as a default.</description>\n");
	b.append("    <role-name>admin</role-name>\n");
	b.append("  </security-role>\n");
  b.append("</application>\n");
  eXo.core.IOUtil.createFolder(deployEarDir + "/META-INF");
  var out = new java.io.FileOutputStream(deployEarDir + "/META-INF/application.xml");
  out.write(b.toString().getBytes(), 0, b.length());
  out.close();
}

ServerUtil.prototype.createWASIBMApplicationBndXmi = function(deployEarDir, product) {
  eXo.System.info("INFO", "---------------------------------------------------------------");
  eXo.System.info("INFO", "Create "+deployEarDir+"/META-INF/ibm-application-bnd.xmi");
  
  var earDir = new java.io.File(deployEarDir) ;
  var b = new java.lang.StringBuilder();
  /*
   * Create ibm-application-bnd.xmi
   */
  b.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
	b.append("<applicationbnd:ApplicationBinding \n");
	b.append(" xmi:version=\"2.0\" xmlns:xmi=\"http://www.omg.org/XMI\" \n");
	b.append(" xmlns:applicationbnd=\"applicationbnd.xmi\" \n");
	b.append(" xmi:id=\"exoplatform_ID_Bnd\"> \n");
	b.append("  <authorizationTable xmi:id=\"AuthorizationTable_1\">\n");
	b.append("    <authorizations xmi:id=\"RoleAssignment_1\">\n");
	b.append("<specialSubjects xmi:type=\"applicationbnd:AllAuthenticatedUsers\" \n");
	b.append(" xmi:id=\"AllAuthenticatedUsers_1096454398990\" \n");
	b.append(" name=\"AllAuthenticatedUsers\"/>\n");
	b.append("      <role href=\"META-INF/application.xml#SecurityRole_1\"/>\n");
	b.append("    </authorizations>\n");
	b.append("    <authorizations xmi:id=\"RoleAssignment_2\">\n");
	b.append(" <specialSubjects xmi:type=\"applicationbnd:AllAuthenticatedUsers\" \n");
	b.append(" xmi:id=\"AllAuthenticatedUsers_1096462893665\" \n");
	b.append(" name=\"AllAuthenticatedUsers\"/>\n");
	b.append("      <role href=\"META-INF/application.xml#SecurityRole_2\"/>\n");
	b.append("    </authorizations>\n");
	b.append("  </authorizationTable>\n");
	b.append("  <application href=\"META-INF/application.xml#exoplatform\"/>\n");
	b.append("</applicationbnd:ApplicationBinding>\n");

  eXo.core.IOUtil.createFolder(deployEarDir + "/META-INF");
  var out = new java.io.FileOutputStream(deployEarDir + "/META-INF/ibm-application-bnd.xmi");
  out.write(b.toString().getBytes(), 0, b.length());
  out.close();
}

ServerUtil.prototype.patchWASPortalWebXml = function(deployEarDir, product) {
  eXo.System.info("INFO", "---------------------------------------------------------------");
  eXo.System.info("INFO", "Patch web.xml within " + product.portalwar);
  
  var warFile = deployEarDir + "/" + product.portalwar;
  var file = new java.io.File(warFile);
  if (!file.exists()) {
    eXo.System.info("IO", warFile + " file not found" ) ;
    return null;
  }

//  var jar = new java.util.jar.JarFile(file) ;
  var webXmlEntry = "WEB-INF/web.xml";
  var webXML = eXo.core.IOUtil.getJarEntryAsText(warFile, webXmlEntry);

  var b = new java.lang.StringBuilder();
  /*
   * WebsphereFilter filter declaration
   */
  eXo.System.info("INFO", "\tWebsphereFilter filter declaration");
  b.append("<!-- Websphere filter -->\n");
  b.append("  <filter>\n");
  b.append("    <filter-name>WebsphereFilter</filter-name>\n");
  b.append("    <filter-class>org.exoplatform.services.security.j2ee.websphere.WebsphereFilter</filter-class>\n");
  b.append("  </filter>\n");
  b.append("\n");
  b.append("  <filter>");
  webXML = webXML.replaceFirst("<filter>", b.toString());
  
  b = new java.lang.StringBuilder();
  /*
   * WebsphereFilter mapping declaration
   */
  eXo.System.info("INFO", "\tWebsphereFilter mapping declaration");
  b.append("<!-- Websphere filter-mapping -->\n");
  b.append("  <filter-mapping>\n");
  b.append("    <filter-name>WebsphereFilter</filter-name>\n");
  b.append("    <url-pattern>/public/*</url-pattern>\n");
  b.append("  </filter-mapping>\n");
  b.append("\n");
  b.append("  <filter-mapping>");
  webXML = webXML.replaceFirst("<filter-mapping>", b.toString());

  b = new java.lang.StringBuilder();
  /*
   * Servlet mapping declaration for css files
   * because WebSphere doesn't perform filter on a resource without servlet mapping declaration
   */
  eXo.System.info("INFO", "\tServlet mapping declaration for css files");
  b.append("<!-- Websphere servlet-mapping for *.css because WAS doesn't perform filter on a resource without servlet mapping declaration -->\n");
  b.append("  <servlet-mapping>\n");
  b.append("    <servlet-name>javascript</servlet-name>\n");
  b.append("    <url-pattern>*.css</url-pattern>\n");
  b.append("  </servlet-mapping>\n");
  b.append("\n");
  b.append("  <servlet-mapping>");
  webXML = webXML.replaceFirst("<servlet-mapping>", b.toString());
  
  b = new java.lang.StringBuilder();
  /*
   * Welcome file list
   */
  eXo.System.info("INFO", "\tWelcome file list");
  b.append("<!-- The Welcome File List for IBM WebSphere -->\n");
  b.append("<welcome-file-list>\n");
  b.append("  <welcome-file>/index.jsp</welcome-file>\n");
  b.append("</welcome-file-list>\n\n");
  b.append("<security-constraint>\n");

  webXML = webXML.replaceFirst("<security-constraint>", b.toString());
  
  var replaceMap = new java.util.HashMap() ;

  replaceMap.put(webXmlEntry, webXML.getBytes()) ;               
  eXo.core.IOUtil.modifyJar(warFile, replaceMap, null) ;
    
}

ServerUtil.prototype.patchWASServletMapping = function(deployEarDir, product) {
  eXo.System.info("INFO", "---------------------------------------------------------------");
  eXo.System.info("INFO", "Patch web.xml of all WARs with JavascriptServlet declaration for CSS mapping (sic)");
//  var warFile = deployEarDir + "/" + product.portalwar;
//  var file = new java.io.File(warFile);
//  if (!file.exists()) {
//    eXo.System.info("IO", warFile + " file not found" ) ;
//    return null;
//  }
  var earDir = new java.io.File(deployEarDir) ;
  var files = earDir.list();
  for (var i = 0; i < files.length; i++) {
    /*
     * For each war file except portal.war
     */
    if(files[i].endsWith("war") && files[i] != product.portalwar) {
//   		  var jar = new java.util.jar.JarFile(file[i]) ;
        var warFile = deployEarDir + "/" + files[i];
				var webXmlEntry = "WEB-INF/web.xml";
				var webXML = eXo.core.IOUtil.getJarEntryAsText(warFile, webXmlEntry);

				var b = new java.lang.StringBuilder();
				/*
				 * Servlet declaration
				 */
				b.append("\t<servlet>\n");
				b.append("\t\t<servlet-name>javascript</servlet-name>\n");
				b.append("\t\t<servlet-class>org.exoplatform.portal.webui.javascript.JavascriptServlet</servlet-class>\n");
				b.append("\t</servlet>\n");
				b.append("\n");
				
				if (webXML.indexOf("<servlet>") != -1) {
				    // There is at least one servlet declared so we replace the first
    			  b.append("\t<servlet>");
    				webXML = webXML.replaceFirst("<servlet>", b.toString());
    		} else {
    		    // There is no servlet declared so we add the servlet at the end, just before </web-app>
    		    b.append("</web-app>");
    		    webXML = webXML.replaceFirst("</web-app>", b.toString());
    		}
		
				b = new java.lang.StringBuilder();
				/*
				 * Servlet mapping declaration for css files
				 * because WebSphere doesn't perform filter on a resource without servlet mapping declaration
				 */
				b.append("<!-- Websphere servlet-mapping for *.css -->\n");
				b.append("\t<servlet-mapping>\n");
				b.append("\t\t<servlet-name>javascript</servlet-name>\n");
				b.append("\t\t<url-pattern>*.css</url-pattern>\n");
				b.append("\t</servlet-mapping>\n");
				b.append("\n");
				
				if (webXML.indexOf("<servlet-mapping>") != -1) {
				    // There is at least one servlet-mapping declared so we replace the first
    			  b.append("\t<servlet-mapping>");
    				webXML = webXML.replaceFirst("<servlet-mapping>", b.toString());
    		} else {
    		    // There is no servlet-mapping declared so we add it at the end, just before </web-app>
    		    b.append("</web-app>");
    		    webXML = webXML.replaceFirst("</web-app>", b.toString());
    		}
		
				var replaceMap = new java.util.HashMap() ;

				replaceMap.put(webXmlEntry, webXML.getBytes()) ;               
				eXo.core.IOUtil.modifyJar(warFile, replaceMap, null) ; 	
    }
  }
    
}

ServerUtil.prototype.patchWASPortletDeployment = function(deployEarDir) {
  eXo.System.info("INFO", "---------------------------------------------------------------");
  eXo.System.info("INFO", "Patch web.xml of all portlet WARs with context param for portlet deployment");
  var earDir = new java.io.File(deployEarDir) ;
  var files = earDir.list();
  eXo.System.info("INFO", "Checking WAR files that contain portlet.xml...");
  for (var i = 0; i < files.length; i++) {
    /*
     * For each war file with portlet.xml except portal.war
     */
    if(files[i].endsWith("war") && files[i] != product.portalwar && 
       eXo.core.IOUtil.getJarEntryContent(deployEarDir + "/" + files[i], "WEB-INF/portlet.xml") != null) {
      eXo.System.info("INFO", "\tFound portlet.xml in "+files[i]);
//      var jar = new java.util.jar.JarFile(file[i]) ;
      var warFile = deployEarDir + "/" + files[i];
			var webXmlEntry = "WEB-INF/web.xml";
			var webXML = eXo.core.IOUtil.getJarEntryAsText(warFile, webXmlEntry);

			var b = new java.lang.StringBuilder();
			/*
			 * Context param to disable portlet deployment on WAS portlet container
			 */
	    b.append("</display-name>\n\n");
	    b.append("<context-param>\n");
	    b.append("  <param-name>com.ibm.websphere.portletcontainer.PortletDeploymentEnabled</param-name>\n");
	    b.append("  <param-value>false</param-value>\n");
	    b.append("</context-param>\n");

      webXML = webXML.replaceFirst("</display-name>", b.toString());
	
			var replaceMap = new java.util.HashMap() ;

			replaceMap.put(webXmlEntry, webXML.getBytes()) ;               
			eXo.core.IOUtil.modifyJar(warFile, replaceMap, null) ;
    }
  }
}

ServerUtil.prototype.patchWASWSRPStarterDefaultPort = function(deployEarDir) {
  eXo.System.info("INFO", "---------------------------------------------------------------");
  eXo.System.info("INFO", "Patch web.xml within wsrp.war with param-value http://localhost:9080/");
  var warFile = deployEarDir+"/wsrp.war";
  var wsrpWar = new java.io.File(warFile) ;
  if (!wsrpWar.exists()) {
    eXo.System.info("IO", wsrpWar.getName() + " file not found" ) ;
    return null;
  }

//  var jar = new java.util.jar.JarFile(wsrpWar) ;
  var webXmlEntry = "WEB-INF/web.xml";
  var webXML = eXo.core.IOUtil.getJarEntryAsText(warFile, webXmlEntry);

  var fromIndex=0;
  var nbStr=0;
  while(webXML.indexOf("localhost:8080", fromIndex) != -1) {
    nbStr++;
    fromIndex+=webXML.indexOf("localhost:8080", fromIndex);
  }
  eXo.System.info("INFO", "Found "+nbStr+" occurrence(s) of http://localhost:8080 in web.xml");
  
  webXML = webXML.replace("localhost:8080", "localhost:9080");
  var replaceMap = new java.util.HashMap() ;

	replaceMap.put(webXmlEntry, webXML.getBytes()) ;               
	eXo.core.IOUtil.modifyJar(warFile, replaceMap, null) ; 	
  
}

ServerUtil.prototype.patchWASUserPortalConfigService = function(deployEarDir) {
  eXo.System.info("INFO", "---------------------------------------------------------------");
  eXo.System.info("INFO", "Patch UserPortalConfigService with specific component key:");
  eXo.System.info("INFO", "-> 0.org.exoplatform.portal.config.UserPortalConfigService");
  var warFile = deployEarDir+"/portal.war";
  var jarFileProject = product.getDependencyById("exo.portal.component.portal");
  var jarFile = deployEarDir+"/"+jarFileProject.artifactId+"-"+jarFileProject.version+".jar";
  var portalWar = new java.io.File(warFile) ;
  var portalJar = new java.io.File(jarFile) ;
  if (!portalWar.exists() || !portalJar.exists()) {
    eXo.System.info("IO",portalWar.getName()+" or "+portalJar.getName()+" not found!" ) ;
    return null;
  }
  //  Replace in portal WAR
  eXo.System.info("INFO", "Patch portal-configuration.xml within portal WAR");
  var xmlEntry = "WEB-INF/conf/portal/portal-configuration.xml";
  var portalConfXml = eXo.core.IOUtil.getJarEntryAsText(warFile, xmlEntry);
  
  /*
   * Leave replaceFirst because only the <key> tag, that appears 1st, must be replaced.
   * The <type> tag, that appears 2nd, must be the full name of the class.
   */
  portalConfXml = portalConfXml.replaceFirst("org.exoplatform.portal.config.UserPortalConfigService", 
                                             "0.org.exoplatform.portal.config.UserPortalConfigService");
  var replaceMap = new java.util.HashMap() ;

	replaceMap.put(xmlEntry, portalConfXml.getBytes()) ;               
	eXo.core.IOUtil.modifyJar(warFile, replaceMap, null) ;
	
	// Replace in exo.portal.component.portal JAR
	eXo.System.info("INFO", "Patch configuration.xml within exo.portal.component.portal JAR");
  var xmlEntry = "conf/portal/configuration.xml";
  var portalConfXml = eXo.core.IOUtil.getJarEntryAsText(jarFile, xmlEntry);
  
  /*
   * Leave replaceFirst because only the <key> tag, that appears 1st, must be replaced.
   * The <type> tag, that appears 2nd, must be the full name of the class.
   */
  portalConfXml = portalConfXml.replaceFirst("org.exoplatform.portal.config.UserPortalConfigService", 
                                             "0.org.exoplatform.portal.config.UserPortalConfigService");
  var replaceMap = new java.util.HashMap() ;

	replaceMap.put(xmlEntry, portalConfXml.getBytes()) ;               
	eXo.core.IOUtil.modifyJar(jarFile, replaceMap, null) ;
}

ServerUtil.prototype.addClasspathForWar = function(earPath) {
  var earDir = new java.io.File(earPath) ;
  var files = earDir.listFiles() ;
  var b  = new java.lang.StringBuilder() ;
  for(var i = 0; i< files.length; i++) {
    var file =  files[i] ;
    if (file.getName().endsWith(".jar")) {
      b.append(file.getName()).append(' ');
    }
  }
  var classpath = b.toString() ;
  for(var i = 0; i< files.length; i++) {
    var file =  files[i] ;
    if (file.getName().endsWith(".war")) {
      manifestAttributes = new java.util.HashMap() ;
      manifestAttributes.put("Class-Path", classpath) ;
      if (file.isFile()) {
        eXo.core.IOUtil.modifyJar(file.getAbsolutePath(), null, manifestAttributes);
      }
    }
  }
}
  
eXo.server.ServerUtil = new ServerUtil();
