/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.webunit;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 5, 2007  
 */
public class HttpRequest {
  private String method_ ;
  private URI    uri_ ;
  private String protocolVersion_ ; 
  private HttpRequestHeader headers_ ;
  private byte[] requestData_ ;
  
  public HttpRequest(WebUnit unit) {
    method_ = unit.getMethod() ;
    uri_ =  unit.getUri() ;
    protocolVersion_ =  unit.getProtocolVersion() ;
    headers_ = unit.getHeaders() ;
  }
  
  public HttpRequest(InputStream is) throws Exception {
    parse(is) ;
  }
  
  public boolean isGETMethod() { return "GET".equals(method_) ; }
  public boolean isPOSTMethod() { return "POST".equals(method_) ; }
  public String getMethod() { return method_; }
  
  public URI getURI()  { return uri_ ; }
  
  public String getProtocolVersion() { return protocolVersion_ ; }
  
  public HttpRequestHeader  getHeaders() { return headers_ ; }
  
  public void parse(InputStream is) throws Exception {
    headers_ = new HttpRequestHeader() ;
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
      if (code == (byte) '\n') {
//        if(firstline == null)  {
//          firstline = new String(line.toByteArray()).trim() ;
//          parseFirstLine(firstline) ;
//        } 
        if(line.size() < 3) {
          keepReading = false ;
        } else {
          String headerLine = new String(line.toByteArray()) ;
          int colonIndex = headerLine.indexOf(':') ;
          String name = headerLine.substring(0, colonIndex) ;
          String value = headerLine.substring(colonIndex + 1, headerLine.length()).trim() ;          
          headers_.put(name, value) ;
        }
        line.reset() ;
      }
    }    
    requestData_ = rdata.toByteArray() ;    
    
  }
  
  public void forward(OutputStream os) throws Exception {
    StringBuilder b = new StringBuilder() ;
    b.append(method_).append(' ').append(uri_.getURI()).append(' ').append(protocolVersion_).append("\r\n") ;
    for(Map.Entry<String, String> entry : headers_.entrySet()) {
      b.append(entry.getKey()).append(": ").append(entry.getValue()).append("\r\n") ;
    }
    b.append("\r\n") ;
    os.write(b.toString().getBytes()) ;
  }
  
  public byte[]  getRequestData()  { return requestData_ ; }
  
  private void parseFirstLine(String firstline) throws Exception {
    String[] tmp = firstline.split(" ") ;
    if(tmp.length != 3) {
      throw new Exception("Cannot  parse the first line: " +  firstline) ;
    }
    method_ = tmp[0] ;
    uri_ = new URI(tmp[1] );
    protocolVersion_ = tmp[2] ;        
  }
}