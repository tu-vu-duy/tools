/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.webunit;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

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
  private String uri_ ;
  private String scheme_ ;
  private String host_ ;
  int     port_ = -1;
  private String pathInfo_ ;
  private Map<String, String>  params_ ;
  private Map<String, Object>  attrs_ ;
  private int method_  = GET_METHOD ;
  private String protocolVersion_ ;
  
  public WebUnit(String uri, String method, String pVersion) {
    name_ = uri ;
    uri_ = uri ;
    setMethod(method) ;
    protocolVersion_ =  pVersion ;
    
    int schemeLimitIndex = uri.indexOf("//") + 1 ;
    int hostPortLimitIndex = uri.indexOf("/", schemeLimitIndex + 1) ;
    if(hostPortLimitIndex < 0) hostPortLimitIndex = uri.length() ;
    scheme_ = uri.substring(0, schemeLimitIndex + 1) ;
    String hostPort = uri.substring(schemeLimitIndex + 1, hostPortLimitIndex) ;
    int hostLimitIndex = hostPort.indexOf(':') ;
    host_ =  hostPort ;
    if(hostLimitIndex > 0) {
      host_ = hostPort.substring(0, hostLimitIndex) ;
      port_ = Integer.parseInt(hostPort.substring(hostLimitIndex + 1, hostPort.length())) ;
    }
    int questionMarkIndex =  uri.indexOf("?", hostPortLimitIndex)  ;
    if(questionMarkIndex > 0) {
      pathInfo_ = uri.substring(hostPortLimitIndex, questionMarkIndex) ;
    } else {
      pathInfo_ = uri.substring(hostPortLimitIndex, uri.length()) ;
    }

    if(questionMarkIndex > 0) {
      params_ = new HashMap<String, String>() ;
      String paramsString = uri.substring(questionMarkIndex + 1, uri.length()) ;
      paramsString = paramsString.replace("&amp;", "&") ;
      String[] params =  paramsString.split("&") ;
      for(String param : params) {
        String[] pair = param.split("=") ;
        params_.put(pair[0], pair[1]) ;
      }
    }
  }
  
  
  public String getName()  { return name_ ; }
  public String getUri()  { return uri_ ; }
  public String getScheme()  { return scheme_ ; }
  public String getHost() { return  host_; }
  public int getPort()  { return port_ ; }
  public String getPathInfo() { return pathInfo_; }
  
  public int  getMethod()  { return method_ ; }
  public void setMethod(int method) { method_ = method ; }
  public void setMethod(String method) {
    if("POST".equals(method)) method_  = POST_METHOD ;
    else method_ = GET_METHOD ;
  }
  
  public Map<String, String> getParams()  { return params_ ; }
  public void setParams(Map<String, String> params) { params_ = params ; }
  public void addParam(String name, String value) {
    if(params_ ==  null)  params_ = new LinkedHashMap<String, String>() ;
    params_.put(name, value) ;
  }
  
  public String getProtocolVersion()  { return protocolVersion_ ;}
  public void   setProtocolVersion(String p) { protocolVersion_ = p ; }
  
  public Object  getAttribute(String name) { 
    if(attrs_ == null)  return null ;
    return attrs_.get(name) ;
  }
  
  public void setAttribute(String name, Object value) {
    if(attrs_ == null) attrs_ = new HashMap<String, Object>() ;
    attrs_.put(name, value) ;
  }
  
  public String toString() {
    StringBuilder b = new StringBuilder() ;
    b.append("scheme = ").append(scheme_).append(", ") ;
    b.append("host = ").append(host_).append(", ") ;
    b.append("port = ").append(port_).append(", ") ;
    b.append("path info = ").append(pathInfo_).append(", ") ;
   if(params_ != null) {
     b.append("params =[ ") ; ;
     for(Map.Entry<String, String> entry : params_.entrySet()) {
       b.append(entry.getKey()).append("=").append(entry.getValue()).append("|") ;
     }
   }
    return b.toString() ;
  }
}
