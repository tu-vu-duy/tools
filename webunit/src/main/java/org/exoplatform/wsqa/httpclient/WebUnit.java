/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient;

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
  private Map<String, Parameter> parameters_ ;
  private String contentType_ ;
  private Map<String, Parameter> bodyParameters_ ;
  
  private HttpRequest request_ ;
  private HttpResponse response_ ;
  
  public WebUnit(String name) {
    name_ = name ;
  }
  
  public WebUnit(HttpRequest request, HttpResponse response) {
    request_ = request ;
    response_ =  response ;
    HttpRequestHeader headers = request.getHeaders() ;
    name_ = headers.getUri().getPathInfo() ;
    if(name_.length() > 60) name_ = name_.substring(0, 60) + "..." ;
    host_ = headers.getUri().getHost() + ":" + headers.getUri().getPort() ;
    method_ = headers.getMethod() ;
    pathInfo_ = headers.getUri().getPathInfo() ;
    parameters_ = headers.getUri().getCloneParameters();
    
    if(method_.equals("POST")) {
      HttpRequestBody body = request.getRequestBody() ;
      contentType_ = body.getContentType() ;
      bodyParameters_ = body.getBodyParameters() ;
    }
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
  
  public String getContentType() { return contentType_ ; }
  public WebUnit setContentType(String s) { 
    contentType_ = s ;
    return this ;
  }
  
  public Map<String, Parameter> getParameters()  { return parameters_ ; }
  public WebUnit addParameter(String name, String value) {
    if(parameters_ == null) {
      parameters_ = new LinkedHashMap<String, Parameter>() ;
    }
    parameters_.put(name, new Parameter(name, value)) ;
    return this ;
  }
  
  public Map<String, Parameter> getBodyParameters()  { return bodyParameters_ ; }
  public WebUnit addBodyParameter(String name, String value) {
    if(bodyParameters_ == null) {
      bodyParameters_ = new LinkedHashMap<String, Parameter>() ;
    }
    bodyParameters_.put(name, new Parameter(name, value)) ;
    return this ;
  }
  
  public WebUnit addBodyFileParameter(String name, String filename, String filetype, Object value) {
    if(bodyParameters_ == null) {
      bodyParameters_ = new LinkedHashMap<String, Parameter>() ;
    }
    bodyParameters_.put(name, new FileParameter(name, filename, filetype, value)) ;
    return this ;
  }
  
  public HttpRequest getHttpRequest() { return request_ ; }
  public HttpResponse getHttpResponse() { return response_ ; }
}