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
  private Socket incoming, outgoing;
  private Connection connection ;

  public ResponseThread(Connection conn, Socket in, Socket out){
    incoming = in;
    outgoing = out;
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
      OutputStream ToClient = outgoing.getOutputStream();      
      InputStream FromClient = incoming.getInputStream();
      while(true){
        int numberRead = FromClient.read(buffer, 0, buffer.length);
        if(numberRead == -1) {
          incoming.close();
          outgoing.close();
          break ;
        }
        ToClient.write(buffer, 0, numberRead);
        content.write(buffer, 0, numberRead) ;
      }
    } catch(Throwable t) {
      content.write(t.getMessage().getBytes()) ;
    }
  }
}