/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.recorder;

import java.net.Socket;
import java.util.List;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 30, 2007  
 */
public class Connection {
  private byte[]  requestContent_ ;
  private byte[]  responseContent_ ;
  private Socket incoming_, outgoing_ ;
  
  private List<ConnectionListener> listeners_ ;
  
  public Connection(List<ConnectionListener> listeners, Socket in, Socket out) throws Exception {
    listeners_ =  listeners ;
    incoming_ = in ;
    outgoing_ = out ;
    for(ConnectionListener listener : listeners_ ) listener.onStartConnection(this) ;
    new RequestThread(this, in, out).start();
    new ResponseThread(this, out, in).start();
  }
  
  public Socket getIncomingSocket() { return incoming_ ; }
  public Socket getOutgoingSocket() { return outgoing_; }
  
  public byte[] getRequestContent() { return requestContent_ ; }
  synchronized public void setRequestContent(byte[] content) throws Exception {
    requestContent_ = content ; 
    if(responseContent_ != null) {
      for(ConnectionListener listener : listeners_ ) listener.onEndConnection(this) ;
    }
  }
  
  public byte[] getResponseContent() { return responseContent_ ; }
  synchronized public void setResponseContent(byte[] content) throws Exception { 
    responseContent_ = content ;
    if(requestContent_ != null) {
      for(ConnectionListener listener : listeners_ ) listener.onEndConnection(this) ;
    }
  }
}
