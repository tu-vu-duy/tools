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
 */
public class HttpRequestHeader extends LinkedHashMap<String, String> {
//    Host: localhost:8080
//    User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US; rv:1.8.1.4) Gecko/20070515 Firefox/2.0.0.4
//    Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5
//    Accept-Language: en-us,en;q=0.5
//    Accept-Encoding: gzip,deflate
//    Accept-Charset: UTF-8,*
//    Keep-Alive: 300
//    Proxy-Connection: keep-alive
//    Cookie: JSESSIONID=A18AAA7CA8E44480F7DE6A8AD7910F3E
  
//    Referer: http://localhost:8080/eXoResources/skin/portal/webui/component/UIPortalApplicationDefaultSkin.css
//    If-Modified-Since: Tue, 29 May 2007 13:17:18 GMT
//    If-None-Match: W/"826-1180444638000"
  
  final static public String USER_AGENT_FIREFOX = 
    "Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US; rv:1.8.1.4) Gecko/20070515 Firefox/2.0.0.4" ;
  
  private String method_ ;
  private URI    uri_ ;
  private String protocolVersion_ ;
  private byte[] originalData_ ;
  
  public HttpRequestHeader() {
    setHost("localhost:8080") ;
    setUserAgent(USER_AGENT_FIREFOX) ;
    setAccept("text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5") ;
    setAcceptLanguage("en-us,en;q=0.5") ;
    setAcceptCharset("UTF-8,*") ;
    setKeepAlive("300") ;
    setProxyConnection("keep-alive") ;
  }
  
  public HttpRequestHeader(InputStream is) throws Exception {
    ByteArrayOutputStream line = new ByteArrayOutputStream() ;
    ByteArrayOutputStream rdata = new ByteArrayOutputStream() ;
    String firstline = null ;
    int i = 0;
    boolean keepReading = true ;
    while(keepReading) {
      i++ ;
      int code = is.read();      
      if(code <= 0) break ;
      rdata.write(code) ;
      line.write(code);
      if (code == '\n') {
        if(firstline == null)  {
          firstline = new String(line.toByteArray()).trim() ;
          parseFirstLine(firstline) ;
        } else if(line.size() < 3) {
          keepReading = false ;
        } else {
          String headerLine = new String(line.toByteArray()) ;
          int colonIndex = headerLine.indexOf(':') ;
          String name = headerLine.substring(0, colonIndex) ;
          String value = headerLine.substring(colonIndex + 1, headerLine.length()).trim() ;          
          put(name, value) ;
        }
        line.reset() ;
      }
    }
    originalData_ = rdata.toByteArray() ;
  }

  public byte[] getOriginalData() { return originalData_ ; }
  
  private void parseFirstLine(String firstline) throws Exception {
    String[] tmp = firstline.split(" ") ;
    if(tmp.length != 3) {
      throw new Exception("Cannot  parse the first line: " +  firstline) ;
    }
    setMethod(tmp[0]) ;
    setUri(new URI(tmp[1] )) ;
    setProtocol(tmp[2]) ;            
  }
  
  public String getHost() { return get("Host") ; }
  public void setHost(String host) {  put("Host", host) ; }
  
  public String getUserAgent() { return get("User-Agent") ; }
  public void   setUserAgent(String s) { put("User-Agent", s) ; }
  
  public String getAccept() { return get("Accept") ; }
  public void   setAccept(String s) { put("Accept", s) ; }
  
  public String getAcceptLanguage() { return get("Accept-Language") ; }
  public void   setAcceptLanguage(String s) { put("Accept-Language", s) ; }
  
  public String getAcceptEncoding() { return get("Accept-Encoding") ; }
  public void   setAcceptEncoding(String s) { put("Accept-Encoding", s) ; }
  
  public String getAcceptCharset() { return get("Accept-Charset") ; }
  public void   setAcceptCharset(String s) { put("Accept-Charset", s) ; }
  
  public String getContentType() { return get("Content-Type") ; }
  public void   setContentType(String s) { put("Content-Type", s) ; }
  
  public String getContentLength() { return get("Content-Length") ; }
  public void   setContentLength(String s) { put("Content-Length", s) ; }
  public void   setContentLength(int length) { put("Content-Length", Integer.toString(length)) ; }
  
  public String getKeepAlive() { return get("Keep-Alive") ; }
  public void   setKeepAlive(String s) { put("Keep-Alive", s) ; }
  
  public String getProxyConnection() { return get("Proxy-Connection") ; }
  public void   setProxyConnection(String s) { put("Proxy-Connection", s) ; }
  
  public String getCookie() { return get("Cookie") ; }
  public void   setCookie(String s) { put("Cookie", s) ; }
  
  public String getReferer() { return get("Referer") ; }
  public void   setReferer(String s) { put("Referer", s) ; }
  
  public String getIfModifiedSince() { return get("If-Modified-Since") ; }
  public void   setIfModifiedSince(String s) { put("If-Modified-Since", s) ; }
  
  public String getIfNoneMatch() { return get("If-None-Match") ; }
  public void   setIfNoneMatch(String s) { put("If-None-Match", s) ; }
  
  public String getProtocol() { return protocolVersion_ ; }
  public void setProtocol(String s) { protocolVersion_ = s ; }
  
  public String getMethod() { return method_ ; }
  public void setMethod(String s) { method_ = s ; }
  
  public URI getUri() { return uri_ ; }
  public void setUri(URI uri) { uri_ = uri ; }
  
  public byte[]  toBytes() {
    StringBuilder b = new StringBuilder() ;
    b.append(getMethod()).append(' ').append(getUri().getURI()).append(' ').append(getProtocol()).append("\r\n") ;
    for(Map.Entry<String, String> entry : entrySet()) {
      b.append(entry.getKey()).append(": ").append(entry.getValue()).append("\r\n") ;
    }
    b.append("\r\n") ;
    return b.toString().getBytes() ;
  }
  
  public String toString() {
    StringBuilder b = new StringBuilder() ;
    b.append(getMethod()).append(' ').append(getUri().getURI()).append(' ').append(getProtocol()).append("\r\n") ;
    for(Map.Entry<String, String> entry : entrySet()) {
      b.append(entry.getKey()).append(": ").append(entry.getValue()).append("\r\n") ;
    }
    return b.toString(); 
  }
}