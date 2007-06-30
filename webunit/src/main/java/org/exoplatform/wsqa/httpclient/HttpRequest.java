/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 5, 2007  
 */
public class HttpRequest {  
  private HttpRequestHeader headers_ ;
  private HttpRequestBody requestBody_ ;
  private byte[] headerData_ ;

  public HttpRequest(HttpRequestHeader headers, HttpRequestBody body)  {
    headers_ =  headers ;
    requestBody_ = body ;
  }
  
  public HttpRequest(InputStream is) throws Exception {
    parse(is) ;
  }

  public boolean isGETMethod() { return "GET".equals(headers_.getMethod()) ; }
  public boolean isPOSTMethod() { return "POST".equals(headers_.getMethod()) ; }
  
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
      if (code == '\n') {
        if(firstline == null)  {
          firstline = new String(line.toByteArray()).trim() ;
          parseFirstLine(firstline, headers_) ;
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
    headerData_ = rdata.toByteArray() ;
    if("POST".equals(headers_.getMethod())) {
      String contentType = headers_.get("Content-Type") ;
      String contentLengthHeader = headers_.get("Content-Length") ;
      int contentLength = -1 ;
      if(contentLengthHeader != null) contentLength = Integer.parseInt(contentLengthHeader) ;
      if(HttpPostFormRequestBody.isFormRequest(contentType)) {
        requestBody_ = new HttpPostFormRequestBody(contentType, contentLength, is) ;
      } else {
        requestBody_ = new HttpRequestBody(contentType, contentLength, is) ;
      }
    }

  }
  
  public HttpRequestBody  getRequestBody() { return requestBody_ ;}
  
  public void forward(OutputStream os) throws Exception {
    os.write(headers_.toBytes()) ;
    System.out.println("============================================================================") ;
    System.out.print(new String(headers_.toBytes()));
    if(requestBody_ != null) {
      os.write(requestBody_.getContentBody()) ;
      System.out.print(new String(requestBody_.getContentBody()));
    }
  }

  private void parseFirstLine(String firstline, HttpRequestHeader headers) throws Exception {
    String[] tmp = firstline.split(" ") ;
    if(tmp.length != 3) {
      throw new Exception("Cannot  parse the first line: " +  firstline) ;
    }
    headers.setMethod(tmp[0]) ;
    headers.setUri(new URI(tmp[1] )) ;
    headers.setProtocol(tmp[2]) ;            
  }
}