/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.recorder;

import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 30, 2007  
 */
public class ProxyServer {
  private int localport = 9090;
  private int remoteport = 8080;
  private String remotehost = "localhost" ;
  private List<ConnectionListener> listeners_ = new ArrayList<ConnectionListener>();
  private boolean start = false ;
  
  public void add(ConnectionListener listener) {
    listeners_.add(listener) ;
  }
  
  public void start() throws Exception {
    ServerSocket Server = new ServerSocket(localport);
    start =  true ;
    while(start) {
      Socket incoming = Server.accept();
      Socket outgoing = new Socket(remotehost, remoteport); 
      new Connection(listeners_, incoming, outgoing) ;
    }
    Server.close() ;
  }
  
  public void stop() throws Exception { start = false ; }
}