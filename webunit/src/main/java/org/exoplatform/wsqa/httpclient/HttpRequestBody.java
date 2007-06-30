/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Map;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 20, 2007  
 * 
 */
public class HttpRequestBody {
  protected String contentType_ ;
  protected int contentLength_ ;
  protected byte[] contentBody_ ;
  
  public HttpRequestBody(String contentType) throws Exception {
    contentType_ =  contentType ;
  }

  public HttpRequestBody(String contentType, int contentLength, InputStream is) throws Exception {
    contentType_ = contentType ;
    contentLength_ = contentLength ;
    contentBody_ = parseBody(is, contentLength) ;
  }
  
  public String getContentType() { return contentType_ ; }
  public int getContentLength() { return contentLength_ ; }
  public byte[]  getContentBody() { return contentBody_ ; }
  public Map<String, Parameter> getParameters() { return null ; }
  
  private byte[] parseBody(InputStream is, int bodySize) throws Exception {
    ByteArrayOutputStream body = new ByteArrayOutputStream() ;
    int totalRead = 0 ;
    byte[] buf = new byte[4092] ;
    while(true) {
      int read = is.read(buf);
      if(read == -1) {
        break ;
      }
      totalRead += read ;
      body.write(buf, 0, read);
      if(totalRead >= bodySize) break ;
    }
    if(totalRead != bodySize) {
      throw new Exception("Expect body size " + bodySize + ", but the total read " + totalRead) ;
    }    
    contentBody_ = body.toByteArray() ;
    return contentBody_ ;
  }
}