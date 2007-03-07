/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/
package org.exoplatform.test.mocks.portlet;

import javax.portlet.* ;
import org.exoplatform.test.mocks.servlet.*;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan08@users.sourceforge.net
 * Date: Jul 27, 2003
 * Time: 2:13:09 AM
 */
public class MockPortletContext implements  PortletContext {

  private String realPath_ = "./" ;
  private String contextName_ ;

  public String getServerInfo () {
    return null ;
  }

  public PortletRequestDispatcher getRequestDispatcher(String path) {
    return null ;
  }

  public PortletRequestDispatcher getNamedDispatcher(String name) {
    return null ;
  }

  public java.io.InputStream getResourceAsStream (String path) {
    return null ;
  }

  public int getMajorVersion () {
    return 1 ;
  }

  public int getMinorVersion () {
    return 0 ;
  }

  public String getMimeType(String file) {
    return null ;
  }

  public String getRealPath(String path) {
    return realPath_ ;
  }

  public java.util.Set getResourcePaths(String path) {
    return null ;
  }

  public java.net.URL getResource(String path) throws java.net.MalformedURLException {
    return null ;
  }

  public java.lang.Object getAttribute(java.lang.String name) {
    return null ;
  }

  public java.util.Enumeration getAttributeNames() {
    return null ;
  }

  public java.lang.String getInitParameter(java.lang.String name) {
    return null ;
  }

  public java.util.Enumeration getInitParameterNames() {
    return null ;
  }

  public void log(java.lang.String msg) {
    System.out.println(msg) ;
  }

  public void log(java.lang.String message, java.lang.Throwable throwable) {
    System.out.println(message) ;
    throwable.printStackTrace() ;
  }

  public void removeAttribute(java.lang.String name) {
  }

  public void setAttribute(java.lang.String name, java.lang.Object object) {
  }

  public String getPortletContextName() {
    return contextName_  ;
  }

  public void setPortletContextName(String name) {
    contextName_ = name ;
  }

  public MockServletContext getWrappedServletContext()
  {
     return new MockServletContext(contextName_);
  }
}
