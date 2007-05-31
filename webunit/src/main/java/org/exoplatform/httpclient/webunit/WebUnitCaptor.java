/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.webunit;

import java.util.ArrayList;
import java.util.List;

import org.exoplatform.httpclient.recorder.Connection;
import org.exoplatform.httpclient.recorder.ConnectionListener;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class WebUnitCaptor implements ConnectionListener {
  private List<WebUnit> units_ = new ArrayList<WebUnit>();
  
  public void onStartConnection(Connection connection) throws Exception {
    
  }

  
  public void onEndConnection(Connection connection) throws Exception {
    System.out.println(new String(connection.getRequestContent()));
  }
}
