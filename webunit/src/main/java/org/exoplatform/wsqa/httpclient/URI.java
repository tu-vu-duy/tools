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
 * Jun 19, 2007  
 */
public class URI {
  private String uri_ ;
  private String scheme_ ;
  private String host_ ;
  int     port_ = 80 ;
  private String pathInfo_ ;
  private Map<String, Parameter>  params_ ;
  
  public URI(String scheme, String host, int port, String pathInfo, Map<String, Parameter>  params) { 
    scheme_ =  scheme ;
    host_ =  host ;
    port_ = port ;
    pathInfo_ = pathInfo ;
    params_ =  params ;
    StringBuilder b = new StringBuilder() ;
    b.append(scheme_).append(host_).append(":").append(port_).append(pathInfo_) ;
    if(params_ != null && params_.size() > 0) {
      b.append("?") ;
      int counter = 0 ;
      for(Parameter param : params_.values()) {
        b.append(param.name).append('=').append(param.value) ;
        if(counter != params_.size() - 1)  b.append("&") ;
        counter++ ;
      }
    }
    uri_ = b.toString() ;
  }
  
  public URI(String uri) throws Exception {
    uri_ = uri ;
    System.out.println(uri_);
    int schemeLimitIndex = uri.indexOf("//") + 1 ;
    if(schemeLimitIndex > 0) {
      scheme_ = uri.substring(0, schemeLimitIndex + 1) ;
    } else {
      schemeLimitIndex = -1 ;
      scheme_ = "" ;
    }
    int hostPortLimitIndex = uri.indexOf("/", schemeLimitIndex + 1) ;
    if(hostPortLimitIndex < 0) hostPortLimitIndex = uri.length() ;
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
      params_ = new LinkedHashMap<String, Parameter>() ;
      String paramsString = uri.substring(questionMarkIndex + 1, uri.length()) ;
      paramsString = paramsString.replace("&amp;", "&") ;
      String[] params =  paramsString.split("&") ;
      for(String param : params) {
        String[] pair = param.split("=", 2) ;
        if(pair.length == 2) {
          params_.put(pair[0], new Parameter(pair[0], pair[1])) ;
        } else {
          params_.put(pair[0], new Parameter(pair[0], "")) ;
        }
      }
    }
  }
  
  public String getURI()  { return uri_ ; }
  
  public  String getScheme() {  return scheme_  ; }
  public  String getHost() { return host_ ; }
  public  int getPort() { return  port_ ; }
  public  String getPathInfo() { return pathInfo_ ; }
  public  Map<String, Parameter>  getParameters() { return params_ ; } 
  public  Map<String, Parameter>  getCloneParameters() { 
    if(params_ == null)  return null ;
    return new LinkedHashMap<String, Parameter>(params_) ; 
  } 
  
  public String toString() {
    StringBuilder b = new StringBuilder() ;
    b.append("scheme = ").append(scheme_).append(", ") ;
    b.append("host = ").append(host_).append(", ") ;
    b.append("port = ").append(port_).append(", ") ;
    b.append("path info = ").append(pathInfo_).append(", ") ;
   if(params_ != null) {
     b.append("params =[ ") ; ;
     for(Parameter entry : params_.values()) {
       b.append(entry.name).append("=").append(entry.value).append("|") ;
     }
   }
    return b.toString() ;
  }
}
