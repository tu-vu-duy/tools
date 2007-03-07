/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/
package org.exoplatform.test.mocks.portlet;

import java.util.* ;
import javax.portlet.* ;

public class MockPortletRequest implements PortletRequest {
  private Map parameters_ ;
  private Map attributes_ ;
  private PortletSession session_ ;
  private PortletMode portletMode_ ;
  private String role_ = "none" ;
  private String remoteUser_  ;
  private PortletPreferences prefs_ ;
   
  public MockPortletRequest() {
    parameters_ = new Hashtable() ;
    attributes_ = new Hashtable() ;
    session_  = new MockPortletSession()  ;
    portletMode_ = PortletMode.VIEW ;
    prefs_ = new MockPortletPreferences() ;

  }

  public boolean isWindowStateAllowed(WindowState state) {
    return true ;
  }

  public boolean isPortletModeAllowed(PortletMode mode) {
    return true ;
  }

  public PortletMode getPortletMode () {
    return portletMode_ ;
  }

  public void setPortletMode(PortletMode  mode) {
    portletMode_ = mode ;
  }

  public WindowState getWindowState () {
    return WindowState.NORMAL ;
  }
  
  public void setPreferences(PortletPreferences prefs) {
    prefs_ = prefs ;
  }
  
  public PortletPreferences getPreferences () {
    return prefs_ ;
  }

  public PortletSession getPortletSession () {
    return session_ ;
  }

  public PortletSession getPortletSession (boolean create) {
    return session_ ;
  }

  public String getProperty(String name) {
    return "not support" ;
  }
  
  public java.util.Enumeration getProperties(String name) {
    return null ;
  }

  public java.util.Enumeration getPropertyNames() {
    return null ;
  }

  public PortalContext getPortalContext() {
    return null ;
  }

  public java.lang.String getAuthType() {
    return null ;
  }

  public String getContextPath() {
    return null ;
  }


  public void setRemoteUser(String user) {
    remoteUser_ = user ; 
  }
  public java.lang.String getRemoteUser() {
    return remoteUser_ ;
  }

  public java.security.Principal getUserPrincipal() {
    return null ;
  }
  
  public void setUserInRole(String role) {
    role_ = role ;
  }
  
  public boolean isUserInRole(java.lang.String role) {
    return role_.equals(role)  ;
  }

  public Object getAttribute(String name) {
    return attributes_.get(name) ;
  }

  public java.util.Enumeration getAttributeNames() {
    return null ;
  }

  public String getParameter(String name) {
    return (String) parameters_.get(name) ;
  }

  public void setParameter(String name, Object value) {
    parameters_.put(name,value) ;
  }

  public java.util.Enumeration getParameterNames() {
    return null ;
  }

  public String[] getParameterValues(String name) {
    return (String[]) parameters_.get(name) ;
  }

  public java.util.Map getParameterMap() {
    return parameters_ ;
  }

  public boolean isSecure() {
    return false  ;
  }

  public void setAttribute(String name, Object o) {
    attributes_.put(name, o) ;
  }

  public void removeAttribute(String name) {
    attributes_.remove(name) ;
  }

  public String getRequestedSessionId() {
    return session_.getId() ;
  }

  public boolean isRequestedSessionIdValid() {
    return true ;
  }

  public String getResponseContentType() {
    return "txt/html" ;
  }

  public java.util.Enumeration getResponseContentTypes() {
    return null ;
  }

  public java.util.Locale getLocale() {
    return Locale.US;
  }

  public java.util.Enumeration getLocales() {
    return null ;
  }

  public String getScheme() {
    return "http://" ;
  }

  public String getServerName() {
    return "localhost" ;
  }

  public int getServerPort() {
    return 8080 ;
  }
}