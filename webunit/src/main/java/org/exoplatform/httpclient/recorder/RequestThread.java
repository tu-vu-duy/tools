/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.recorder;

import java.net.* ;
import java.io.* ;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 30, 2007  
 */
class RequestThread extends Thread {
  private Socket clientSocket_, serverSocket_;
  private Connection connection ;
  
  public RequestThread(Connection connection, Socket client){
    clientSocket_ = client;
    this.connection = connection ;
  }

  public void run() {
    ByteArrayOutputStream content = new ByteArrayOutputStream() ;
    try{
      forward(content) ;
      connection.setRequestContent(content.toByteArray()) ;
    } catch(Exception e) { 
      e.printStackTrace() ; 
    }
  }
  
  private void forward(ByteArrayOutputStream content) throws Exception {
    try{
      byte[] buffer = new byte[4096];
      InputStream fromClient = clientSocket_.getInputStream();
      serverSocket_ = getOutgoingSocket(fromClient) ;
      OutputStream toServer = serverSocket_.getOutputStream();      
      while(true) {
        int numberRead = fromClient.read(buffer);
        if(numberRead == -1) {
          clientSocket_.close();
          serverSocket_.close();
          break ;
        }
        toServer.write(buffer, 0, numberRead);
        content.write(buffer, 0, numberRead) ;
      }
    } catch(Throwable t) {
      if(!connection.getResponseComplete()) {
        t.printStackTrace() ;
        content.write(t.getMessage().getBytes()) ;
      }
    }
  }
  
  private Socket getOutgoingSocket(InputStream is) throws Exception {
    ByteArrayOutputStream readData = new ByteArrayOutputStream() ;
    byte[] buf  = new byte[200] ;
    while(true) {
      int numberRead = is.read(buf);
      if(numberRead == -1 || readData.size() >= 200) {
        break ;
      }
      readData.write(buf, 0, numberRead) ;
    }
    String text = new String(readData.toByteArray()) ;
    System.out.println(text) ;
    String[] line = text.split("\n") ;
    String uri = line[0].trim() ;
    int schemeLimitIndex = uri.indexOf("//") + 1 ;
    int hostPortLimitIndex = uri.indexOf("/", schemeLimitIndex + 1) ;
    if(hostPortLimitIndex < 0) hostPortLimitIndex = uri.length() ;
    String hostPort = uri.substring(schemeLimitIndex + 1, hostPortLimitIndex) ;
    int hostLimitIndex = hostPort.indexOf(':') ;
    String host =  hostPort ;
    int port = 80 ;
    if(hostLimitIndex > 0) {
      host = hostPort.substring(0, hostLimitIndex) ;
      port = Integer.parseInt(hostPort.substring(hostLimitIndex + 1, hostPort.length())) ;
    }
    System.out.println("host: " + host + ", port: " + port);
    Socket outgoing = new Socket(host, port);
    connection.setServerSocket(outgoing) ;
    new ResponseThread(connection, outgoing, clientSocket_).start();
    outgoing.getOutputStream().write(readData.toByteArray()) ;
    return outgoing ;
  }
}