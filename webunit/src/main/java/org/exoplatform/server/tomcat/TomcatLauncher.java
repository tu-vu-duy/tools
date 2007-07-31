/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.server.tomcat;

import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jul 19, 2007  
 */
public class TomcatLauncher {
  private Object tomcatInstance_ ;
  
  public TomcatLauncher(String javaHome, String tomcatHome, String sysPropertiesText) throws Exception {
    Map<String, String>  sysProps = parseProperties(sysPropertiesText) ;
//    for(Map.Entry<String, String> entry : sysProps.entrySet()) {
//      System.setProperty(entry.getKey(), entry.getValue()) ;
//    }
    //System.setProperty("user.dir", ".") ;
    System.setProperty("catalina.base", tomcatHome) ;
    System.setProperty("catalina.home", tomcatHome) ;
    System.setProperty("java.io.tmpdir", tomcatHome + "/temp") ;
    
    System.setProperty("org.apache.commons.logging.Log","org.apache.commons.logging.impl.SimpleLog") ;
    System.setProperty("java.security.auth.login.config", tomcatHome + "/conf/jaas.conf");
    
    URL[] sysClasspath = {
      new URL("file:" + javaHome + "/lib/tools.jar"),
      new URL("file:" + tomcatHome + "/bin/commons-logging-api.jar")
    };
    
    addSystemClasspath(sysClasspath);
    URL[] tomcatClasspath = { new URL("file:" + tomcatHome + "/bin/bootstrap.jar")};
    ClassLoader contextLoader= Thread.currentThread().getContextClassLoader();
    ClassLoader tomcatLoader = new URLClassLoader(tomcatClasspath, contextLoader);
    Thread.currentThread().setContextClassLoader(tomcatLoader);
    
    Class bootstrap = tomcatLoader.loadClass("org.apache.catalina.startup.Bootstrap") ;
    tomcatInstance_ =  bootstrap.newInstance() ;
    java.lang.Thread.currentThread().setContextClassLoader(contextLoader); 

  }
  
  public void init() throws Exception {
    Method method = tomcatInstance_.getClass().getDeclaredMethod("init", (Class[])null);
    method.invoke(tomcatInstance_, (Object[])null);
  }
  
  public void start() throws Exception {
    Method method = tomcatInstance_.getClass().getDeclaredMethod("start", (Class[])null);
    method.invoke(tomcatInstance_, (Object[])null);
  }
  
  public void stop() throws Exception {
    Method method = tomcatInstance_.getClass().getDeclaredMethod("stop", (Class[])null);
    method.invoke(tomcatInstance_, (Object[])null);
  }
  
  private Map<String, String>  parseProperties(String text) throws Exception { 
    Map<String, String>  properties = new HashMap<String, String>() ;
    String[]  lines =  text.split("\n") ;
    for(String line : lines) {
      String[] token = line.trim().split("=") ;
      if(token.length != 2) {
        throw new Exception("Incorrect properties format \n" + text) ;
      }
      properties.put(token[0].trim(), token[1].trim()) ;
    }
    return properties ;
  }
  
  private void addSystemClasspath(URL[] url) throws Exception {
    ClassLoader sysClassLoader = ClassLoader.getSystemClassLoader();
    Class[] argTypes = { java.net.URL.class };
    Method method = URLClassLoader.class.getDeclaredMethod("addURL", argTypes);
    method.setAccessible(true); 
    for(int i = 0; i < url.length; i++) {
      Object[] args = {url[i]} ;
      method.invoke(sysClassLoader, args);
    }
  }
}
