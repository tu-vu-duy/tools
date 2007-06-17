/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.webunit;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 5, 2007  
 */
public class HttpRequest {
  private String method_ ;
  private String uri_ ;
  private String protocolVersion_ ; 
  private String host_ ;
  private int port_ ;
  
  private Map<String, String> headers_ ;
  private byte[] requestData_ ;
  
  public HttpRequest() {
    
  }
  
  public HttpRequest(InputStream is) throws Exception {
    parse(is) ;
  }
  
  public boolean isGetMethod() { return "GET".equals(method_) ; }
  public String getMethod() { return method_; }
  
  public String getURI()  { return uri_ ; }
  
  public String getProtocolVersion() { return protocolVersion_ ; }
  
  public String getHost()  { return host_ ; }
  
  public int getPort() { return port_; }
  
  public Map<String, String>  getHeaders() { return headers_ ; }
  
  public void parse(InputStream is) throws Exception {
    headers_ = new LinkedHashMap<String, String>() ;
    ByteArrayOutputStream line = new ByteArrayOutputStream() ;
    String firstline = null ;
    int i = 0;
    boolean keepReading = true ;
    while(keepReading) {
      i++ ;
      int code = is.read();
      line.write(code);
      if (code == (byte) '\n') {
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
          headers_.put(name, value) ;
        }
        line.reset() ;
      }
    }
  }
  
  public void forward(OutputStream os) throws Exception {
    StringBuilder b = new StringBuilder() ;
    b.append(method_).append(' ').append(uri_).append(' ').append(protocolVersion_).append("\r\n") ;
    for(Map.Entry<String, String> entry : headers_.entrySet()) {
      b.append(entry.getKey()).append(": ").append(entry.getValue()).append("\r\n") ;
    }
    b.append("\r\n") ;
    os.write(b.toString().getBytes()) ;
  }
  
  private void parseFirstLine(String firstline) throws Exception {
    String[] tmp = firstline.split(" ") ;
    method_ = tmp[0] ;
    uri_ = tmp[1] ;
    protocolVersion_ = tmp[2] ;
    int schemeLimitIndex = uri_.indexOf("//") + 1 ;
    int hostPortLimitIndex = uri_.indexOf("/", schemeLimitIndex + 1) ;
    if(hostPortLimitIndex < 0) hostPortLimitIndex = uri_.length() ;
    String hostPort = uri_.substring(schemeLimitIndex + 1, hostPortLimitIndex) ;
    int hostLimitIndex = hostPort.indexOf(':') ;
    host_ =  hostPort ;
    port_ = 80 ;
    if(hostLimitIndex > 0) {
      host_ = hostPort.substring(0, hostLimitIndex) ;
      port_ = Integer.parseInt(hostPort.substring(hostLimitIndex + 1, hostPort.length())) ;
    }
  }
}
