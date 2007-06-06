/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.recorder;

import java.io.InterruptedIOException;
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
public class ProxyServer extends Thread {
  private int localport = 9090;
  private List<ConnectionListener> listeners_ = new ArrayList<ConnectionListener>();
  private boolean start_ = false ;
  
  public void add(ConnectionListener listener) {
    listeners_.add(listener) ;
  }
  
  public void run() {
    System.out.println("INFO:  Start the proxy server........................");
    try {
      ServerSocket Server = new ServerSocket(localport);
      Server.setSoTimeout(1000) ;
      start_ =  true ;
      while(start_) {
        try {
          Socket clientSocket = Server.accept();
          new Connection(listeners_, clientSocket).start() ;
        }  catch (InterruptedIOException e) {
          // Timeout occurred.  Ignore, and keep looping until we're
          // told to stop running.
        }
      }
      Server.close() ;
    } catch(Exception ex) {
      ex.printStackTrace() ;
    }
  }
  
  public void stopServer() { 
    System.out.println("INFO:  Stop the proxy server........................");
    start_  = false ; 
  }
}