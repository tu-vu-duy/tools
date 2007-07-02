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
 * 
 */
public class HttpPostFormRequestBody extends HttpRequestBody{
//  x-www-form-urlencoded type:
//  Content-Type: application/x-www-form-urlencoded
//  Content-Length: 75
//  param1=value+1&param2=value+2&upload1=info.txt&param3=value+3&submit=submit

//  multipart/form-data type:
//  Content-Type: multipart/form-data; boundary=---------------------------470341832147865817542206740
//  Content-Length: 722
//  -----------------------------470341832147865817542206740
//  Content-Disposition: form-data; name="param1"
//
//  value 1    \\separated by \n\r
//  -----------------------------470341832147865817542206740
//  Content-Disposition: form-data; name="param2"
//
//  value 2
//  -----------------------------470341832147865817542206740
//  Content-Disposition: form-data; name="upload1"; filename="test.txt"
//  Content-Type: text/plain   //separated by \n\n
//
//  Content Of A File To Test The File Upload  //separated by \n\r--
//
//  -----------------------------470341832147865817542206740
//  Content-Disposition: form-data; name="param3"
//
//  value 3
//  -----------------------------470341832147865817542206740
//  Content-Disposition: form-data; name="submit"
//
//  submit
//  -----------------------------470341832147865817542206740--
  final static public String X_WWW_FORM_URLENCODED_TYPE = "application/x-www-form-urlencoded" ;
  final static public String MULTIPART_FORM_DATA_TYPE = "multipart/form-data" ;
  final static public String OTHER_TYPE = "other" ;
  
  private static final byte CR = 0x0D;
  private static final byte LF = 0x0A;
  private static final byte DASH = 0x2D;
  
  private Map<String, Parameter>  parameters_ ;
  
  public HttpPostFormRequestBody(String contentType, Map<String, Parameter>  parameters) throws Exception {
    super(contentType) ;
    parameters_ =  parameters ;
  }
  
  public HttpPostFormRequestBody(String contentType, int contentLength, InputStream is) throws Exception {
    super(contentType, contentLength, is) ;
    if(contentType_.startsWith(X_WWW_FORM_URLENCODED_TYPE )) {
      parseURLEncodedBody(originalData_) ;
    } else if(contentType_.startsWith(MULTIPART_FORM_DATA_TYPE)) {
      parseMultipartFormDataBody(originalData_) ;
    }
  }
  
  public byte[]  toBytes() {
    StringBuilder b = new StringBuilder() ;
    if(contentType_.startsWith(X_WWW_FORM_URLENCODED_TYPE )) {
      int counter = 0 ;
      for(Parameter param : parameters_.values()) {
        b.append(param.name).append("=").append(param.value) ;
        counter++ ;
        if(counter != parameters_.size()) b.append("&") ;
      }
    } else if(contentType_.startsWith(MULTIPART_FORM_DATA_TYPE)) {
      String boundary = contentType_.split("boundary=")[1] ;
      int counter = 0 ;
      for(Parameter param : parameters_.values()) {
        b.append(boundary).append("\n") ;
        if(param instanceof FileParameter) {
          FileParameter fparam = (FileParameter) param ;
          b.append("Content-Disposition: form-data; ").append("name=\"").append(param.name).
            append("\" filename=\"").append(fparam.filename).append("\"\n") ;
          b.append("Content-Type: ").append(fparam.filetype).append("\n\n") ;
          b.append(param.value).append("\n") ;
        } else {
          b.append("Content-Disposition: form-data; ").append("name=\"").append(param.name).append("\"\n\n") ;
          b.append(param.value) ;
        }
        b.appendCodePoint(CR).appendCodePoint(LF) ;
        counter++ ;
      }
      b.append(boundary).append("--") ;
    }
    return b.toString().getBytes() ; 
  }
  
  public void parseURLEncodedBody(byte[] body) throws Exception {
    parameters_ = new LinkedHashMap<String, Parameter>() ;
    String bodyText = new String(body) ;
    String[] params = bodyText.split("&") ;
    for(String param : params) {
      String[]  pair = param.split("=", 2) ;
      Parameter parameter = new Parameter(pair[0], pair[1]) ;
      parameters_.put(parameter.name, parameter) ;
    }
  }

  public Map<String, Parameter> getBodyParameters() { return parameters_ ; }
  
  private void parseMultipartFormDataBody(byte[] body) throws Exception {
    parameters_ = new LinkedHashMap<String, Parameter>() ;
    ByteArrayOutputStream region = new ByteArrayOutputStream() ;
    int i = 0 ;
    while(i < body.length) {
      if(body[i] == CR) {
        //Detect the end boundary
        if(i + 3 < body.length && body[i + 1] == LF && body[i + 2] == DASH && body[i + 3] == DASH) {
          System.out.println("code i - 1 : " + body[i - 1]);
          System.out.println("code i - 2 : " + body[i - 2]);
          i++ ;// ignore CR and LF
          Parameter parameter = parseFormData(region.toByteArray()) ;
          parameters_.put(parameter.name, parameter) ;
          region.reset() ;
        }
      } else {
        region.write(body[i]) ;
      }
      i++ ;
    }
  }
  
  private Parameter parseFormData(byte[] data) throws Exception {
    //ignore first line as it is the boundary string
    int firstLineCR = findCRPosition(data, 0) ;
    int contentDispositionCR = findCRPosition(data, firstLineCR + 1) ;
    String contentDiposition = new String(data, firstLineCR + 1, contentDispositionCR - firstLineCR + 1) ;
    String name = getAttributeValue("name", contentDiposition) ;
    String filename = getAttributeValue("filename", contentDiposition) ;
    String contentType = null ;
    //The content is separated  by  2 \n
    int startContentCR = contentDispositionCR + 2 ;
    if(filename != null) {
      int contentTypeCR = findCRPosition(data, contentDispositionCR + 1) ;
      contentType = new String(data, contentDispositionCR + 1, contentTypeCR - (contentDispositionCR + 1)) ;
      contentType = contentType.split(": ")[1] ;
      //The content is separated  by  2 \n
      startContentCR = contentTypeCR + 2 ;
    }
    String content = new String(data, startContentCR, data.length - startContentCR) ;
    if(filename != null) {
      return new FileParameter(name, filename, contentType, content.trim()) ;
    } else {
      return new Parameter(name, content) ; 
    }
  }
  
  private int findCRPosition(byte[] data, int start) {
    int i = start ; 
    while(i < data.length) {
      if(data[i] == LF) return i ;
      i++ ;
    }
    return -1 ;
  }
  
  private String getAttributeValue(String name, String text) {
    int start = text.indexOf(name)  ;
    if(start > 0) {
      start += name.length() + 2 ;
      int limit = text.indexOf("\"", start) ;
      return text.substring(start, limit) ;
    }
    return null ;
  }

  public String toString() {
    StringBuilder b = new StringBuilder() ;
    return b.toString(); 
  }
  
  static public boolean isFormRequest(String contentType) {
    if(contentType.startsWith(X_WWW_FORM_URLENCODED_TYPE )) {
      return true ;
    } else if(contentType.startsWith(MULTIPART_FORM_DATA_TYPE)) {
      return true ;
    }
    return false ;
  }
  
  static public boolean isUrlEncodedType(String contentType) {
    if(contentType.startsWith(X_WWW_FORM_URLENCODED_TYPE )) {
      return true ;
    }
    return false ;
  }
  
  static public boolean isMultipartData(String contentType) {
    if(contentType.startsWith(MULTIPART_FORM_DATA_TYPE)) {
      return true ;
    }
    return false ;
  }
}