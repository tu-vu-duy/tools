/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.List;

import org.exoplatform.wsqa.httpclient.validator.Validator;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007
 */
public class ExoHttpClient extends HttpClient {

  public ExoHttpClient(String suiteName) {
    super(suiteName) ;
  }
  
  protected void execute(WebUnit unit, WebUnitExecuteContext context) throws Exception {
    HttpRequest request = createHttpRequest(unit) ;
    String setCookie = getCookie() ;
    if(setCookie != null) request.getHeaders().setCookie(setCookie) ;
    context.setRequest(request) ;
    Socket serverSocket = new Socket(request.getHeaders().getUri().getHost(), request.getHeaders().getUri().getPort()) ;
    OutputStream toServer = serverSocket.getOutputStream() ;
    request.forward(toServer) ;
    toServer.flush() ;
    InputStream fromServer = new BufferedInputStream(serverSocket.getInputStream()) ;
    HttpResponse response = new HttpResponse(fromServer, request.getHeaders().getUri()) ;
    context.setResponse(response) ;
    List<Validator>  validators = unit.getValidators() ;
    if(validators != null) {
      for(Validator validator : validators) {
        boolean test = validator.validate(context) ;
        if(!test) context.setError(true) ;
      }
    }
  }
  
  private HttpRequest createHttpRequest(WebUnit unit) throws Exception {
    HttpRequestBody body = null ;
    URI  uri = new URI(getScheme(), getHost(), getPort(), unit.getPathInfo(), unit.getParameters()) ;
    HttpRequestHeader headers = new HttpRequestHeader()  ;
    headers.setUri(uri) ;
    headers.setMethod(unit.getMethod()) ;
    headers.setProtocol(getProtocol()) ;
    if(unit.getContentType() != null)  headers.setContentType(unit.getContentType()) ;
    if(unit.getReferer() != null) headers.setReferer(unit.getReferer()) ;
    
    if(unit.getMethod().equals("POST")) {
      if(HttpPostFormRequestBody.isFormRequest(unit.getContentType())) {
        body = new HttpPostFormRequestBody(unit.getContentType(), unit.getBodyParameters()) ;
      } else {
        
      }
    }
    HttpRequest request = new HttpRequest(headers, body) ; 
    return request ;
  }
}