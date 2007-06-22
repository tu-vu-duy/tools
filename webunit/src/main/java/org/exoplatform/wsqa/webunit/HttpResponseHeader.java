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
 * Jun 20, 2007  
 * 
 */
public class HttpResponseHeader extends LinkedHashMap<String, String> {
//  Server: Apache-Coyote/1.1
//  Set-Cookie: JSESSIONID=7CE44E759DF6E8EFCA156D921CA45736; Path=/portal
//  Cache-Control: no-cache
//  Content-Type: text/html;charset=UTF-8
//  Transfer-Encoding: chunked
//  Date: Thu, 21 Jun 2007 07:53:10 GMT
      
  public String getSetCookie() { return get("Set-Cookie") ; }
  public void   setSetCookie(String s) { put("Set-Cookie", s) ; }

  public String getServer() { return get("Server") ; }
  public void   setServer(String s) { put("Server", s) ; }

  
  public String getContentType() { return get("Content-Type") ; }
  public void   setContentType(String s) { put("Content-Type", s) ; }
 
  public String getTransferEncoding() { return get("Transfer-Encoding") ; }
  public void   setTransferEncoding(String s) { put("Transfer-Encoding", s) ; }
 
  public String getDate() { return get("Date") ; }
  public void   setDate(String s) { put("Date", s) ; }
 
  
  public String getCacheControl() { return get("Cache-Control") ; }
  public void   setCacheControl(String s) { put("Cache-Control", s) ; }

  
  public String toString() {
    StringBuilder b = new StringBuilder() ;
    for(Map.Entry<String, String> entry : entrySet()) {
      b.append(entry.getKey()).append(": ").append(entry.getValue()).append("\r\n") ;
    }
    return b.toString(); 
  }
}