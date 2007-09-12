/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/

/**
 * Created by The eXo Platform SARL
 * Author : Mestrallet Benjamin
 *          benjmestrallet@users.sourceforge.net
 * Date: Jul 29, 2003
 * Time: 12:44:53 PM
 */
package org.exoplatform.test.mocks.servlet;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletInputStream;
import javax.servlet.RequestDispatcher;

import java.util.*;
import java.security.Principal;
import java.io.UnsupportedEncodingException;
import java.io.IOException;
import java.io.BufferedReader;

public class MockServletRequest implements HttpServletRequest {

  private Map parameters ;
  private Map attributes ;
  private HttpSession session;
  private Locale locale;
  private boolean secure;
  private Map headers;
  private String enc = "ISO-8859-1";
  private String pathInfo_ ;
  private String requestURI_ ;

  private String remoteUser = "REMOTE USER FROM MOCK";

  public MockServletRequest(HttpSession session, Locale locale) {
    this.session = session;
    this.locale = locale;
    headers = new HashMap();
    Collection headersMultiple = new ArrayList();
    headersMultiple.add("header-value3-1");
    headersMultiple.add("header-value3-2");
    headersMultiple.add("header-value3-3");
    headers.put("header1", "header-value1");
    headers.put("header2", "header-value2");
    headers.put("header3", headersMultiple);
    parameters = new HashMap();
    attributes = new HashMap();
  }
  
  public void reset() { 
    parameters = new HashMap();
    attributes = new HashMap();
  }
  
  public MockServletRequest(HttpSession session, Locale locale, boolean secure) {
    this(session, locale);
    this.secure = secure;
  }

  public String getAuthType() {
    return DIGEST_AUTH;
  }

  public Cookie[] getCookies() {
    return new Cookie[0];
  }

  public long getDateHeader(String s) {
    return 0;
  }

  public String getHeader(String s) {
    return (String) headers.get(s);
  }

  public Enumeration getHeaders(String s) {
    if(headers.get(s) instanceof Collection)
      return Collections.enumeration((Collection)headers.get(s));
    else {
      Vector v = new Vector();
      v.add(headers.get(s));
      return v.elements();
    }
  }

  public Enumeration getHeaderNames() {
    return Collections.enumeration(headers.keySet());
  }

  public int getIntHeader(String s) {
    return 0;
  }

  public String getMethod() {
    //return null;
    return "GET";
  }

  public String getPathInfo()  { return pathInfo_ ; }
  public void   setPathInfo(String s) { pathInfo_ = s ; }

  public String getPathTranslated() {
    return null;
  }

  public String getContextPath() {
    return null;
  }

  public String getQueryString() {
    return null;
  }

  public String getRemoteUser() {
    return remoteUser;
  }

  public void setRemoteUser(String remoteUser) {
    this.remoteUser = remoteUser;
  }

  public boolean isUserInRole(String s) {
    if("auth-user".equals(s) )
      return true;
    else
      return false;
  }

  public Principal getUserPrincipal() {
    return new MockPrincipal();
  }

  public String getRequestedSessionId() {
    return null;
  }

  public String getRequestURI() {  return requestURI_;  }
  public void   setRequestURI(String s) {  requestURI_ =  s ; }

  public StringBuffer getRequestURL() {
    return null;
  }

  public String getServletPath() {
    return null;
  }

  public HttpSession getSession(boolean b) {
    return session;
  }

  public HttpSession getSession() {
    return session;
  }

  public boolean isRequestedSessionIdValid() {
    return false;
  }

  public boolean isRequestedSessionIdFromCookie() {
    return false;
  }

  public boolean isRequestedSessionIdFromURL() {
    return false;
  }

  public boolean isRequestedSessionIdFromUrl() {
    return false;
  }

  public Object getAttribute(String s) {
    return attributes.get(s);
  }

  public Enumeration getAttributeNames() {
    return new Vector(attributes.keySet()).elements();
  }

  public String getCharacterEncoding() {  return enc; }

  public void setCharacterEncoding(String s) throws UnsupportedEncodingException {
    enc = s;
  }

  public int getContentLength() {  return 0; }

  public String getContentType() {  return null; }

  public ServletInputStream getInputStream() throws IOException {
    return null;
  }

  public String getParameter(String s) { return (String) parameters.get(s); }

  public void setParameter(String s, Object value) {  parameters.put(s, value); }

  public Enumeration getParameterNames() {
    return new Vector(parameters.keySet()).elements();
  }

  public String[] getParameterValues(String s) {  return new String[0]; }

  public Map getParameterMap() { return parameters; }

  public String getProtocol() {  return null; }

  public String getScheme() {   return null; }

  public String getServerName() {  return null; }

  public int getServerPort() {  return 0; }

  public BufferedReader getReader() throws IOException {  return null; }

  public String getRemoteAddr() {  return null; }

  public String getRemoteHost() {   return null;  }

  public void setAttribute(String s, Object o) {  attributes.put(s, o); }

  public void removeAttribute(String s) {  attributes.remove(s); }

  public Locale getLocale() {   return locale; }

  public Enumeration getLocales() {
    System.out.println("MOCK get Locale : " + locale);
    Vector v = new Vector();
    v.add(locale);
    return v.elements();
  }

  public boolean isSecure() {  return secure; }

  public RequestDispatcher getRequestDispatcher(String s) {  return null; }

  public String getRealPath(String s) { return null; }

  //servlet 2.4 method
  public int getLocalPort(){  return 0; }

  public String getLocalAddr(){   return "127.0.0.1"; }

  public String getLocalName(){  return "localhost"; }

  public int getRemotePort(){	 return 0;  }
}
