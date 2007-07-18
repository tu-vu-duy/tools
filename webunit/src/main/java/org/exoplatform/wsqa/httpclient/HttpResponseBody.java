/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 20, 2007  
 * 
 */
public class HttpResponseBody {
  private static byte[]  EMPTY_BODY = new byte[0] ;
  
  private ByteArrayOutputStream originalData_ ;
  
  public HttpResponseBody(InputStream is, URI uri, HttpResponseHeader header) throws Exception  {
    if(header.getStatusCode() == HttpResponseHeader.NOT_MODIFIED_CODE_304)  return ;
    if(header.getStatusCode() == HttpResponseHeader.STATUS_STRING_MOVED_CODE_302)  return ;
    int contentLength = header.getContentLengthAsInteger() ;
    int totalRead = 0 ;
    if(contentLength > 0) {
      totalRead = parseBody(is, uri, header, contentLength) ;
    } else if(contentLength == 0) {
    } else {
      totalRead = parseBody(is, uri, header) ;
    }
    
    if(totalRead != contentLength) {
      System.out.println("\nWARNING: " + "total read = " + totalRead + " but content length = " + contentLength +
                         "  \n URI: " +  uri.getURI()) ;
    }     
  }
  
  public byte[] getBodyDataAsByte() {
    if(originalData_ == null)  return EMPTY_BODY ;
    return originalData_.toByteArray(); 
  }
  
  public byte[] getOriginalBodyDataAsByte() { 
    if(originalData_ == null)  return EMPTY_BODY ;
    return originalData_.toByteArray() ; 
  }
  
  private int parseBody(InputStream is , URI uri, HttpResponseHeader header, int bodySize) throws Exception {
    originalData_ = new ByteArrayOutputStream() ;
    int totalRead = 0 ;
    byte[] buf = new byte[4092] ;
    while(true) {
      int read = is.read(buf);
      if(read == -1) {
        cannotDetectEOF(uri, header) ;
        break ;
      }
      totalRead += read ;
      originalData_.write(buf, 0, read);
      if(totalRead >= bodySize) break ;
    }
    if(totalRead != bodySize) {
      throw new Exception("Expect body size " + bodySize + ", but the total read " + totalRead) ;
    }    
    return totalRead ;
  }
  
  private int parseBody(InputStream is, URI uri, HttpResponseHeader header) throws Exception {
    originalData_ = new ByteArrayOutputStream() ;
    int totalRead = 0 ;
    while(true) {
      int code = is.read();
      if(code == -1) {
        cannotDetectEOF(uri, header) ;
        break ;
      }
      if(code == '0') {
        totalRead++ ;
        originalData_.write(code);
        int c1 = is.read(), c2 = is.read() , c3 = is.read() , c4 = is.read() ;
        if(c1 != -1) {
          totalRead++ ;
          originalData_.write(c1);
        }
        if(c2 != -1) {
          totalRead++ ;
          originalData_.write(c2);
        }
        if(c3 != -1) {
          totalRead++ ;
          originalData_.write(c3);
        }
        if(c4 != -1) {
          totalRead++ ;
          originalData_.write(c4);
        }
        if(c1 == '\r' && c2 == '\n' && c3 == '\r' && c4 == '\n') { //END OF FILE
          break ;
        }
      } else {
        totalRead++ ;
        originalData_.write(code);
      }
    }
    return totalRead ;
  }
  
  private void cannotDetectEOF(URI uri, HttpResponseHeader header) {
    System.out.println("--------------------------------------------------------");
    System.out.println("Cannot detect EOF for " + uri.getURI());
    System.out.println("Status " + header.getStatusCode() + ", Status String " + header.getStatusString());
//    System.out.println(new String(headerBody_.toByteArray()));
//    System.out.println(new String(responseBody_.toByteArray()));
//    for(byte b : responseBody_.toByteArray()) {
//      System.out.println("code : " + (int) b);
//    }
    System.out.println("--------------------------------------------------------");
  }
}