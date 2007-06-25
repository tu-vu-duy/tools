/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.webunit;

import java.util.Map;


/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class WebUnit {
  
  private String name_ ;
  private String method_  = "GET";
  private String host_ ;
  private int    port_ ;
  private String pathInfo_ ;
  private Map<String, String> parameters_ ;
  private HttpRequestHeader headers ;
  
  public WebUnit(String pathInfo) {
    pathInfo_ =  pathInfo ;
  }
  
  public WebUnit(HttpRequest request) {
    headers = request.getHeaders() ;
    name_ = headers.getUri().getURI() ;
    host_ = headers.getUri().getHost() + ":" + headers.getUri().getPort() ;
    method_ = headers.getMethod() ;
    pathInfo_ = headers.getUri().getPathInfo() ;
    parameters_ = headers.getUri().getCloneParameters();
  }
  
  public String getName()  { return name_ ; }
  
  public HttpRequestHeader getRequestHeader() {  return headers ; }
  
  public boolean isGETMethod() { return "GET".equals(method_) ; }
  public String  getMethod()  { return method_ ; }
  public void    setMethod(String method) { method_ = method ; }

  public String getHost() { return host_ ; }
  public void   setHost(String host) { host_ = host ; }
  
  public int getPort() { return port_ ; }
  public void   setHost(int port) { port_ = port  ; }
  
  public String getPathInfo() { return pathInfo_ ; }
  public void   setPathInfo(String s) { pathInfo_ = s ; }
  
  public Map<String, String> getParameters()  { return parameters_ ; }
}