/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.webunit;

import java.util.LinkedHashMap;
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
  
  public WebUnit(String name) {
    name_ = name ;
  }
  
  public WebUnit(HttpRequest request) {
    HttpRequestHeader headers = request.getHeaders() ;
    name_ = headers.getUri().getPathInfo() ;
    if(name_.length() > 60) name_ = name_.substring(0, 60) + "..." ;
    host_ = headers.getUri().getHost() + ":" + headers.getUri().getPort() ;
    method_ = headers.getMethod() ;
    pathInfo_ = headers.getUri().getPathInfo() ;
    parameters_ = headers.getUri().getCloneParameters();
  }
  
  public String getName()  { return name_ ; }
  public WebUnit setName(String name) { 
    name_ =  name ;
    return this ;
  }
  
  public boolean isGETMethod() { return "GET".equals(method_) ; }
  public String  getMethod()  { return method_ ; }
  public WebUnit setMethod(String method) { 
    method_ = method ;
    return this ;
  }

  public String getHost() { return host_ ; }
  public WebUnit setHost(String host) { 
    host_ = host ; 
    return this ;
  }
  
  public int getPort() { return port_ ; }
  public WebUnit setHost(int port) { 
    port_ = port  ;
    return this ;
  }
  
  public String getPathInfo() { return pathInfo_ ; }
  public WebUnit setPathInfo(String s) { 
    pathInfo_ = s ;
    return this ;
  }
  
  public Map<String, String> getParameters()  { return parameters_ ; }
  public WebUnit addParameter(String name, String value) {
    if(parameters_ == null) {
      parameters_ = new LinkedHashMap<String, String>() ;
    }
    parameters_.put(name, value) ;
    return this ;
  }
}