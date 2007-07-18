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
 * Jun 4, 2007  
 */
public class HttpResponse {
  private HttpResponseHeader header_ ;
  private HttpResponseBody   body_ ;
  private URI requestURI_ ;

  public HttpResponse(InputStream is, URI requestURI) throws Exception {
    requestURI_ =  requestURI ;    
    /**
     * character ascii code:  \r = 13, \n = 10
     */
    header_  = new HttpResponseHeader(is) ;
    body_ = new HttpResponseBody(is, requestURI_, header_) ;
  }

  public HttpResponseHeader  getHttpResponseHeader()  { return header_ ; }

  public HttpResponseBody  getHttpResponseBody() { return body_ ; }

  public byte[] getOriginalResponseData() throws Exception {
    ByteArrayOutputStream os = new ByteArrayOutputStream() ;
    if(header_.getOriginalHeaderDataAsByte() != null) {
      os.write(header_.getOriginalHeaderDataAsByte()) ;
    }
    byte[] bodyData = body_.getBodyDataAsByte() ;
    if(bodyData.length > 0) {
      os.write(bodyData) ;
    }
    return os.toByteArray();
  }

  public void forward(OutputStream out) throws Exception {
    out.write(header_.getOriginalHeaderDataAsByte()) ;
    if(header_.getStatusCode() == HttpResponseHeader.NOT_MODIFIED_CODE_304)  return ;
    if(header_.getStatusCode() == HttpResponseHeader.STATUS_STRING_MOVED_CODE_302)  return ;
    out.write(body_.getBodyDataAsByte()) ;
  }

  public byte[] getResponseData() throws Exception {
    ByteArrayOutputStream os = new ByteArrayOutputStream() ;
    os.write(header_.getHeaderDataAsByte()) ;
    if(header_.getStatusCode() == HttpResponseHeader.NOT_MODIFIED_CODE_304)  os.toByteArray() ;
    if(header_.getStatusCode() == HttpResponseHeader.STATUS_STRING_MOVED_CODE_302)  return os.toByteArray();
    os.write(body_.getBodyDataAsByte()) ;
    return os.toByteArray() ;
  }

  public String getResponseDataAsText() throws Exception { return new String(getResponseData()) ; }
}