/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007
 */
public class ExoHttpClient extends HttpClient {

  protected void executeGet(WebUnit unit, WebUnitExecuteContext context) throws Exception {
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
  }
  
  protected void executePost(WebUnit unit, WebUnitExecuteContext context) throws Exception {
    throw new Exception("To be implemented") ;
  }
  
  private HttpRequest createHttpRequest(WebUnit unit) {
    URI uri = new URI(getScheme(), getHost(), getPort(), unit.getPathInfo(), unit.getParameters()) ;
    HttpRequestHeader headers = new HttpRequestHeader()  ;
    headers.setUri(uri) ;
    headers.setMethod(unit.getMethod()) ;
    headers.setProtocol(getProtocol()) ;
    HttpRequest request = new HttpRequest(headers) ; 
    return request ;
  }
}