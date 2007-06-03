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
class ResponseThread extends Thread {
  private Socket serverSocket_, clientSocket_;
  private Connection connection ;

  public ResponseThread(Connection conn, Socket in, Socket out){
    serverSocket_ = in;
    clientSocket_ = out;
    connection = conn ;
  }

  public void run() {
    ByteArrayOutputStream content = new ByteArrayOutputStream() ;
    try{
      forward(content) ;
      connection.setResponseContent(content.toByteArray()) ;
    } catch(Exception e) { 
      e.printStackTrace() ; 
    }
  }
  
  private void forward(ByteArrayOutputStream content) throws Exception {
    try{
      byte[] buffer = new byte[4096];
      OutputStream toClient = clientSocket_.getOutputStream();      
      InputStream fromServer = serverSocket_.getInputStream();
      while(true){
        int numberRead = fromServer.read(buffer);
        if(numberRead == -1) {
          serverSocket_.close();
          clientSocket_.close();
          break ;
        }
        toClient.write(buffer, 0, numberRead);
        content.write(buffer, 0, numberRead) ;
      }
    } catch(Throwable t) {
      t.printStackTrace() ;
      content.write(t.getMessage().getBytes()) ;
    }
  }
}