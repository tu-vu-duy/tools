/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.recorder;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.List;

import org.exoplatform.wsqa.httpclient.HttpRequest;
import org.exoplatform.wsqa.httpclient.HttpResponse;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 30, 2007  
 */
public class Connection extends Thread {
  private Socket clientSocket_, serverSocket_;
  private List<ConnectionListener> listeners_ ;
  private HttpRequest request_ ;
  private HttpResponse response_ ;
  
  public Connection(List<ConnectionListener> listeners, Socket client) throws Exception {
    clientSocket_ = client;
    listeners_ = listeners ;
  }
  
  public HttpRequest getHttpRequest() { return request_ ; }
  public HttpResponse getHttpResponse() { return response_ ; }

  public void run() {
    try {
      for(ConnectionListener listener : listeners_) listener.onStartConnection(this) ;
      InputStream fromClient = new BufferedInputStream(clientSocket_.getInputStream());
      request_ = new HttpRequest(fromClient) ;
      serverSocket_ = new Socket(request_.getHeaders().getUri().getHost(), request_.getHeaders().getUri().getPort()) ;
      OutputStream toServer = serverSocket_.getOutputStream() ;
      request_.forward(toServer) ;
      toServer.flush() ;
      InputStream fromServer = new BufferedInputStream(serverSocket_.getInputStream()) ;
      response_ = new HttpResponse(fromServer, request_.getHeaders().getUri()) ;
      OutputStream toClient = new BufferedOutputStream(clientSocket_.getOutputStream());
      response_.forward(toClient) ;
      toClient.flush() ;

      fromClient.close() ;
      toClient.close()   ;
      fromServer.close() ;
      toServer.close()   ;
      for(ConnectionListener listener : listeners_) listener.onEndConnection(this) ;
    } catch(Throwable t) {
      t.printStackTrace() ;
    } finally {
      try {
        if(clientSocket_ != null) clientSocket_.close() ;
        if(serverSocket_ != null) serverSocket_.close() ;
      } catch(Throwable ex) {
        ex.printStackTrace() ;
      }
    }
  }
}