/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.webunit;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.LinkedHashMap;
import java.util.Map;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 4, 2007  
 */
public class HttpResponse {
  final static public int NOT_MODIFIED_CODE_304 = 304 ;
  final static public int STATUS_STRING_MOVED_CODE_302 = 302 ;
  
  private Map<String, String> headers_ ;
  private ByteArrayOutputStream responseBody_ ;
  private ByteArrayOutputStream headerBody_ ;
  private String protocol_ ;
  private int statusCode_ ;
  private String statusString_ ;
  private String requestURI_ ;
  
  public HttpResponse(String requestURI) {
    requestURI_ =  requestURI;
  }
  
  public HttpResponse(InputStream is, String requestURI) throws Exception {
    requestURI_ =  requestURI;
    parse(is) ;
  }
  
  public String getProtocol()  { return protocol_ ; }
  public int getStatusCode()  { return statusCode_ ; }
  public String getStatusString()  { return statusString_ ; }
  
  public Map<String, String>  getHeaders()  { return headers_ ; }
  
  public ByteArrayOutputStream  getResponseBody() { return responseBody_ ; }
  
  /**
   * character ascii code:  \r = 13, \n = 10
   */
  public void parse(InputStream is) throws Exception {
    headers_  = new LinkedHashMap<String, String>() ;
    responseBody_ = new ByteArrayOutputStream() ;
    headerBody_ = new ByteArrayOutputStream() ;
    ByteArrayOutputStream line = new ByteArrayOutputStream() ;
    String firstline = null ;
    boolean keepReading = true ;
    while(keepReading) {
      int code = is.read();
      headerBody_.write(code);
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
    
    if(statusCode_ == NOT_MODIFIED_CODE_304)  return ;

    if(statusCode_ == STATUS_STRING_MOVED_CODE_302)  return ;
    
    String contentLengthHeader = headers_.get("Content-Length") ;
    int contentLength = -1 ;
    if(contentLengthHeader != null) contentLength = Integer.parseInt(contentLengthHeader) ;
    int totalRead = 0 ;
    if(contentLength != -1) totalRead = parseBody(is, contentLength) ;
    else totalRead = parseBody(is) ;
    
    if(totalRead != contentLength) {
      //System.out.println("\nWARNING: " + "total read = " + totalRead + " but content length = " + contentLength) ;
    } else {
      //System.out.println("\nOK: " + "total read = " + totalRead + " but content length = " + contentLength) ;
    }
  }
  
  public void forward(OutputStream out) throws Exception {
    out.write(headerBody_.toByteArray()) ;
    if(statusCode_ == NOT_MODIFIED_CODE_304)  return ;
    if(statusCode_ == STATUS_STRING_MOVED_CODE_302)  return ;
    out.write(responseBody_.toByteArray()) ;
  }
  
  private int parseBody(InputStream is , int bodySize) throws Exception {
    int totalRead = 0 ;
    byte[] buf = new byte[4092] ;
    while(true) {
      int read = is.read(buf);
      if(read == -1) {
        cannotDetectEOF() ;
        break ;
      }
      totalRead += read ;
      responseBody_.write(buf, 0, read);
      if(totalRead >= bodySize) break ;
    }
    if(totalRead != bodySize) {
      throw new Exception("Expect body size " + bodySize + ", but the total read " + totalRead) ;
    }
    return totalRead ;
  }
  
  private int parseBody(InputStream is) throws Exception {
    int totalRead = 0 ;
    while(true) {
      int code = is.read();
      if(code == -1) {
        cannotDetectEOF() ;
        break ;
      }
      if(code == '0') {
        totalRead++ ;
        responseBody_.write(code);
        int c1 = is.read(), c2 = is.read() , c3 = is.read() , c4 = is.read() ;
        if(c1 != -1) {
          totalRead++ ;
          responseBody_.write(c1);
        }
        if(c2 != -1) {
          totalRead++ ;
          responseBody_.write(c2);
        }
        if(c3 != -1) {
          totalRead++ ;
          responseBody_.write(c3);
        }
        if(c4 != -1) {
          totalRead++ ;
          responseBody_.write(c4);
        }
        if(c1 == '\r' && c2 == '\n' && c3 == '\r' && c4 == '\n') { //END OF FILE
          break ;
        }
      } else {
        totalRead++ ;
        responseBody_.write(code);
      }
    }
    return totalRead ;
  }
  
  private void parseHeaderLine(String line) throws Exception {
    int colonIndex = line.indexOf(":") ;
    if(colonIndex < 1) throw new Exception("Line \"" + line + "\" is not a header line") ;
    String name =  line.substring(0, colonIndex).trim() ;
    String value =  line.substring(colonIndex + 1, line.length()).trim() ;
    headers_.put(name, value) ;
  }
  
  private void parseFirstLine(String line) {
    String[]  tmp = line.split(" ") ;
    protocol_  = tmp[0] ;
    statusCode_ =  Integer.parseInt(tmp[1]) ;
    statusString_ = tmp[2] ;
  }
  
  private void cannotDetectEOF() {
    System.out.println("--------------------------------------------------------");
    System.out.println("Cannot detect EOF for " + requestURI_);
    System.out.println("Status " + statusCode_ + ", Status String " + statusString_);
    System.out.println(new String(headerBody_.toByteArray()));
    for(byte b : responseBody_.toByteArray()) {
      System.out.println("code : " + (int) b);
    }
    System.out.println("--------------------------------------------------------");
  }
 }