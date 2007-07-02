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

  public HttpRequest(HttpRequestHeader headers, HttpRequestBody body)  {
    headers_ =  headers ;
    requestBody_ = body ;
  }
  
  public HttpRequest(InputStream is) throws Exception {
    headers_ = new HttpRequestHeader(is) ;
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

  public boolean isGETMethod() { return "GET".equals(headers_.getMethod()) ; }
  public boolean isPOSTMethod() { return "POST".equals(headers_.getMethod()) ; }
  
  public HttpRequestHeader  getHeaders() { return headers_ ; }
  public HttpRequestBody  getRequestBody() { return requestBody_ ;}

  public byte[] getOriginalRequestData() throws Exception {
    ByteArrayOutputStream os = new ByteArrayOutputStream() ;
    if(headers_.getOriginalData() != null) {
      os.write(headers_.getOriginalData()) ;
    }
    if(requestBody_ != null && requestBody_.getOrgininalData() != null) {
      os.write(requestBody_.getOrgininalData()) ;
    }
    return os.toByteArray() ;
  }
  
  public void forward(OutputStream os) throws Exception {
    os.write(headers_.toBytes()) ;
    //System.out.println("============================================================================") ;
    //System.out.print(new String(headers_.toBytes()));
    if(requestBody_ != null) {
      os.write(requestBody_.toBytes()) ;
      //System.out.print(new String(requestBody_.getContentBody()));
    }
  }

  public String getRequestDataAsText() throws Exception {
    StringBuilder b = new StringBuilder() ;
    b.append(new String(headers_.toBytes()));
    if(requestBody_ != null) {
      b.append(new String(requestBody_.toBytes()));
    }
    return b.toString() ;
  }
}