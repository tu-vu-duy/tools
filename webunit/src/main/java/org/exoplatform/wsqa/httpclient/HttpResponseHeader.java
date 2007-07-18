/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
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
  
  final static public int NOT_MODIFIED_CODE_304 = 304 ;
  final static public int STATUS_STRING_MOVED_CODE_302 = 302 ;
  
  private String protocol_ ;
  private int statusCode_ ;
  private String statusString_ ;
  private ByteArrayOutputStream orginalData_ ;
  
  public HttpResponseHeader(InputStream is)  throws Exception {
    orginalData_ = new ByteArrayOutputStream() ;
    ByteArrayOutputStream line = new ByteArrayOutputStream() ;    
    String firstline = null ;
    boolean keepReading = true ;
    while(keepReading) {
      int code = is.read();
      if(code < 0) break ;
      orginalData_.write(code);
      if(code == 13) {
      } else if (code == (byte) '\n') {
        if(firstline == null)  {
          firstline = new String(line.toByteArray()) ;
          parseFirstLine(firstline) ;
        } else if(line.size() < 3) {
          keepReading = false ;
        } else {                    
          parseHeaderLine(new String(line.toByteArray())) ;
        }
        line.reset() ;
      } else {
        line.write(code);
      }
    } 
  }
  
  public String getProtocol()  { return protocol_ ; }
  public int getStatusCode()  { return statusCode_ ; }
  public String getStatusString()  { return statusString_ ; }
  
  public byte[] getHeaderDataAsByte() { return orginalData_.toByteArray() ; }
  
  public byte[] getOriginalHeaderDataAsByte() { return orginalData_.toByteArray() ; }
      
  public String getSetCookie() { return get("Set-Cookie") ; }
  public void   setSetCookie(String s) { put("Set-Cookie", s) ; }

  public String getServer() { return get("Server") ; }
  public void   setServer(String s) { put("Server", s) ; }

  
  public String getContentType() { return get("Content-Type") ; }
  public void   setContentType(String s) { put("Content-Type", s) ; }
  
  public String getContentLength() { return get("Content-Length") ; }
  public int    getContentLengthAsInteger() { 
    String contentLengthStr = get("Content-Length") ;
    int contentLength = -1 ;
    if(contentLengthStr != null) contentLength = Integer.parseInt(contentLengthStr) ;
    return contentLength ;
  }
  public void   setContentLength(String s) { put("Content-Length", s) ; }
 
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
  
  private void parseHeaderLine(String line) throws Exception {    
    int colonIndex = line.indexOf(":") ;
    if(colonIndex < 1) throw new Exception("Line \"" + line + "\" is not a header line") ;
    String name =  line.substring(0, colonIndex).trim() ;
    String value =  line.substring(colonIndex + 1, line.length()).trim() ;
    put(name, value) ;    
  }
  
  private void parseFirstLine(String line) {
    String[]  tmp = line.split(" ") ;
    protocol_  = tmp[0] ;
    statusCode_ =  Integer.parseInt(tmp[1]) ;
    statusString_ = tmp[2] ;
  }
}