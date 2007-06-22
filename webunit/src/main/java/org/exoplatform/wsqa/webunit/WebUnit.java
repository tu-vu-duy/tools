/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.webunit;


/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class WebUnit {
  final static  public int GET_METHOD = 0 ;
  final static  public int POST_METHOD = 1 ;
  
  private String name_ ;
  private URI    uri_ ;
  private HttpRequestHeader headers_ ;
  private String  method_  = "GET";
  private String protocolVersion_ ;
  
  public WebUnit(HttpRequest request) {
    headers_ = request.getHeaders() ;
    name_ = headers_.getUri().getURI() ;
    uri_ = headers_.getUri() ;    
    method_ = headers_.getMethod() ;
    protocolVersion_ =  headers_.getProtocolVersion() ;
  }
  
  
  public String getName()  { return name_ ; }
  public URI    getUri()  { return uri_ ; }
  
  public boolean isGETMethod() { return "GET".equals(method_) ; }
  public String  getMethod()  { return method_ ; }
  public void setMethod(String method) { method_ = method ; }
  
  
  public String getProtocolVersion()  { return protocolVersion_ ;}
  public void   setProtocolVersion(String p) { protocolVersion_ = p ; }
 
  public HttpRequestHeader getHeaders() { return headers_ ; }
  
  public HttpRequest  createRequest()  {
    return null ;
  }
}