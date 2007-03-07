/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/

/**
 * Created by The eXo Platform SARL        .
 * Author : Mestrallet Benjamin
 *          benjmestrallet@users.sourceforge.net
 * Date: Jul 25, 2003
 * Time: 12:26:58 AM
 */
package org.exoplatform.test.mocks.servlet;
import javax.servlet.ServletContext;
import javax.servlet.RequestDispatcher;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.util.*;
import java.net.URL;
import java.net.MalformedURLException;
import java.io.InputStream;
import java.io.IOException;

public class MockServletContext implements ServletContext {

  private String name_ ;
  private HashMap initParams_ ;
  private HashMap attributes_ ;
  private String contextPath_ ;
	private StringBuffer logBuffer = new StringBuffer();

	public MockServletContext() {
    this("portlet_app_1");
  }

  public MockServletContext(String name) {
    name_ = name;
    initParams_ = new HashMap() ;
    attributes_ = new HashMap();
  }

  public MockServletContext(String name, String path) {
    this(name);
    contextPath_ = path;
		attributes_.put("javax.servlet.context.tempdir", path);
  }
  
  public void setName(String name){
    name_ = name;
  }

	public String getLogBuffer() {
		try {
			return logBuffer.toString();
		} finally {
			logBuffer = new StringBuffer();
		}
	}

  public ServletContext getContext(String s) {
    return null;
  }

  public int getMajorVersion() {
    return 2;
  }

  public int getMinorVersion() {
    return 3;
  }

  public String getMimeType(String s) {
    return "text/html";
  }

  public Set getResourcePaths(String s) {
		Set set = new HashSet();
		set.add("/test1");
		set.add("/WEB-INF");
		set.add("/test2");
    return set;
  }

  public URL getResource(String s) throws MalformedURLException {
    String path = "file:" + contextPath_ + s ;
    URL url = new URL(path) ;
    return url ;
  }

  public InputStream getResourceAsStream(String s) {
		try {
			return getResource(s).openStream();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

  public RequestDispatcher getRequestDispatcher(String s) {
    return null;
  }

  public RequestDispatcher getNamedDispatcher(String s) {
    return null;
  }

  public Servlet getServlet(String s) throws ServletException {
    return null;
  }

  public Enumeration getServlets() {
    return null;
  }

  public Enumeration getServletNames() {
    return null;
  }

  public void log(String s) {
		logBuffer.append(s);
  }

  public void log(Exception e, String s) {
		logBuffer.append(s + e.getMessage());
  }

  public void log(String s, Throwable throwable) {
		logBuffer.append(s + throwable.getMessage());
  }

  public void setContextPath(String s) {
    contextPath_ = s ;
  }

  public String getRealPath(String s) {
    return contextPath_  + s ;
  }

  public String getServerInfo() {
    return null;
  }

  public void setInitParameter(String name, String value) {
    initParams_.put(name, value) ;
  }

  public String getInitParameter(String name) {
    return  (String) initParams_.get(name) ;
  }

  public Enumeration getInitParameterNames() {
    Vector keys =  new Vector(initParams_.keySet()) ;
    return keys.elements() ;
  }

  public Object getAttribute(String name) {
    return attributes_.get(name) ;
  }

  public Enumeration getAttributeNames() {
    Vector keys =  new Vector(attributes_.keySet()) ;
    return keys.elements() ;
  }

  public void setAttribute(String name, Object value) {
    attributes_.put(name, value) ;
  }

  public void removeAttribute(String name) {
	attributes_.remove(name) ;
  }

  public String getServletContextName() {    
    return name_ ;
  }
}
