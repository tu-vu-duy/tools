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


import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletInputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
  private URL url;
  private String method = "GET";
  private String contextPath = "";

  private String remoteUser = "REMOTE USER FROM MOCK";

  public MockServletRequest(HttpSession session, Locale locale) {

    this(session, locale, false);
    
  }
  
  public MockServletRequest(HttpSession session, Locale locale, boolean secure) {
 
    this(session, null, null, locale, secure);
  }
  
  public MockServletRequest(HttpSession session, URL url, String contextPath, Locale locale, boolean secure) {
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
    this.secure = secure;
    if(url == null) {
      try {
        this.url = new URL("http://exoplatform.com:80/context/path?q=v");
        this.contextPath = "/context";
      } catch (MalformedURLException e) {} 
    } else {
      this.url = url;
      this.contextPath = contextPath;
    }
  }

  public void reset() { 
    parameters = new HashMap();
    attributes = new HashMap();
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
  
     return method;
  }

  public String getPathInfo()  { return pathInfo_ ; }
  public void   setPathInfo(String s) { pathInfo_ = s ; }

  public String getPathTranslated() {
    return null;
  }

  public String getContextPath() {
    return contextPath;
  }

  public String getQueryString() {
    return url.getQuery();
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

  public String getRequestURI() { 
    if(this.requestURI_ == null)
      return url.getPath();  
    else
      return requestURI_;
  }
  
  public void   setRequestURI(String s) {  
    this.requestURI_ = s;
  }

  public StringBuffer getRequestURL() {
    return new StringBuffer(url.toString());
  }

  public String getServletPath() {
    return url.getPath();
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

  public String[] getParameterValues(String s) {  
  
      ArrayList<String> arr = new ArrayList<String>();
      Iterator it  = parameters.keySet().iterator();
      while (it.hasNext()){
        
        String pname = (String) it.next(); 
        if (pname.equals(s))
        	arr.add((String)parameters.get(s));
        }
        return arr.toArray(new String[arr.size()]);
        
   }

  public Map getParameterMap() { return parameters; }

  public String getProtocol() {  return null; }

  public String getScheme() {   return url.getProtocol(); }

  public String getServerName() {  return url.getHost(); }

  public int getServerPort() {  return url.getPort(); }

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
