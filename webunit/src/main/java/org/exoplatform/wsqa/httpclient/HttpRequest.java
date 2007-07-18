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
  private HttpRequestHeader header_ ;
  private HttpRequestBody body_ ;

  public HttpRequest(HttpRequestHeader headers, HttpRequestBody body)  {
    header_ =  headers ;
    body_ = body ;
  }
  
  public HttpRequest(InputStream is) throws Exception {
    header_ = new HttpRequestHeader(is) ;
    if("POST".equals(header_.getMethod())) {
      String contentType = header_.get("Content-Type") ;
      String contentLengthHeader = header_.get("Content-Length") ;
      int contentLength = -1 ;
      if(contentLengthHeader != null) contentLength = Integer.parseInt(contentLengthHeader) ;
      if(HttpPostFormRequestBody.isFormRequest(contentType)) {
        body_ = new HttpPostFormRequestBody(contentType, contentLength, is) ;
      } else {
        body_ = new HttpRequestBody(contentType, contentLength, is) ;
      }
    }
  }

  public boolean isGETMethod() { return "GET".equals(header_.getMethod()) ; }
  public boolean isPOSTMethod() { return "POST".equals(header_.getMethod()) ; }
  
  public HttpRequestHeader  getHeaders() { return header_ ; }
  public HttpRequestBody  getRequestBody() { return body_ ;}

  public byte[] getOriginalRequestData() throws Exception {
    ByteArrayOutputStream os = new ByteArrayOutputStream() ;
    if(header_.getOriginalData() != null) {
      os.write(header_.getOriginalData()) ;
    }
    if(body_ != null && body_.getOrgininalData() != null) {
      os.write(body_.getOrgininalData()) ;
    }
    return os.toByteArray() ;
  }
  
  public byte[] getRequestData() throws Exception {
    ByteArrayOutputStream os = new ByteArrayOutputStream() ;
    os.write(header_.toBytes());
    if(body_ != null) os.write(body_.toBytes());
    return os.toByteArray() ;
  }
  
  public String getRequestDataAsText() throws Exception {
    return new String(getRequestData()) ;
  }
  
  public void forward(OutputStream os) throws Exception {
    byte[] bodyData = null ;
    if(body_ != null) {
      bodyData = body_.toBytes() ;
      header_.setContentLength(bodyData.length) ;
    }
    os.write(header_.toBytes()) ;
    if(bodyData != null) os.write(body_.toBytes()) ;
//    if(!"POST".equals(header_.getMethod()))  return ;
//    
//    System.out.println(new String(header_.toBytes())) ;
//    if(bodyData != null) {
//      System.out.println(new String(bodyData)) ;
//    }
  }
}