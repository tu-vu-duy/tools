/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.recorder;

import java.net.* ;
import java.util.List;
import java.io.* ;

import org.exoplatform.httpclient.webunit.HttpRequest;
import org.exoplatform.httpclient.webunit.HttpResponse;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 30, 2007  
 */
public class Connection extends Thread {
  private Socket clientSocket_, serverSocket_;
  private List<ConnectionListener> listeners_ ;
  
  public Connection(List<ConnectionListener> listeners, Socket client) throws Exception {
    clientSocket_ = client;
    listeners_ = listeners ;
  }

  public void run() {
    try {
      InputStream fromClient = new BufferedInputStream(clientSocket_.getInputStream());
      HttpRequest request = new HttpRequest(fromClient) ;
      serverSocket_ = new Socket(request.getHost(), request.getPort()) ;
      OutputStream toServer = serverSocket_.getOutputStream() ;
      request.forward(toServer) ;
      toServer.flush() ;
      InputStream fromServer = new BufferedInputStream(serverSocket_.getInputStream()) ;
      HttpResponse response = new HttpResponse(fromServer, request.getURI()) ;
      OutputStream toClient = new BufferedOutputStream(clientSocket_.getOutputStream());
      response.forward(toClient) ;
      toClient.flush() ;

      fromClient.close() ;
      toClient.close()   ;
      fromServer.close() ;
      toServer.close()   ;
    } catch(Throwable t) {
      t.printStackTrace() ;
    } finally {
      try {
        if(clientSocket_ != null) clientSocket_.close() ;
        if(serverSocket_ != null) serverSocket_.close() ;
      } catch(Exception ex) {
        ex.printStackTrace() ;
      }
    }
  }
}