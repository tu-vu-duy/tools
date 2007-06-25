/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import org.exoplatform.swing.Application;
import org.exoplatform.wsqa.recorder.Connection;
import org.exoplatform.wsqa.recorder.ConnectionListener;
import org.exoplatform.wsqa.recorder.RequestFilter;
import org.exoplatform.wsqa.webunit.WebUnit;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class WebUnitCaptor implements ConnectionListener {
  private RequestFilter  filter_ ;
  
  public WebUnitCaptor() {
  }
  
  public void setRequestFilter(RequestFilter filter) { filter_ = filter ; }
  
  public void onStartConnection(Connection connection) throws Exception {
  }
  
  public void onEndConnection(Connection connection) throws Exception {
    String method = connection.getHttpRequest().getHeaders().getMethod() ;
    System.out.println() ;
    if(method.startsWith("GET") || method.startsWith("POST")) {
      WebUnit unit = new WebUnit(connection.getHttpRequest()) ;
      if(filter_.match(unit.getPathInfo())){
        Application app = Application.getInstance() ;
        WSQAPlugin plugin = (WSQAPlugin)app.getPlugin(WSQAPlugin.NAME) ;
        WebunitRecorderViewPlugin view = plugin.getWebunitRecorderViewPlugin()  ;
        view.addUnit(unit) ;
      }
    } else {
      return ;
    }
  }
}