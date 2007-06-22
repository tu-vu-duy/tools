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
 * Jun 19, 2007  
 */
public class URI {
  private String uri_ ;
  private String scheme_ ;
  private String host_ ;
  int     port_ = 80 ;
  private String pathInfo_ ;
  private Map<String, String>  params_ ;
  
  
  public URI(String uri) throws Exception {
    uri_ = uri ;
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
      params_ = new LinkedHashMap<String, String>() ;
      String paramsString = uri.substring(questionMarkIndex + 1, uri.length()) ;
      paramsString = paramsString.replace("&amp;", "&") ;
      String[] params =  paramsString.split("&") ;
      for(String param : params) {
        String[] pair = param.split("=", 2) ;
        if(pair.length == 2) {
          params_.put(pair[0], pair[1]) ;
        } else {
          params_.put(pair[0], "") ;
        }
      }
    }
  }
  
  public String getURI()  { return uri_ ; }
  
  public  String getScheme() {  return scheme_  ; }
  public  String getHost() { return host_ ; }
  public  int getPort() { return  port_ ; }
  public  String getPathInfo() { return pathInfo_ ; }
  public  Map<String, String>  getParameters() { return params_ ; } 
  
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
