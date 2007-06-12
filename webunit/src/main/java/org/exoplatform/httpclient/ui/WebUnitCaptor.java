/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import java.util.ArrayList;
import java.util.List;

import org.exoplatform.httpclient.recorder.Connection;
import org.exoplatform.httpclient.recorder.ConnectionListener;
import org.exoplatform.httpclient.recorder.RequestFilter;
import org.exoplatform.httpclient.webunit.WebUnit;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class WebUnitCaptor implements ConnectionListener {
  private List<WebUnit> units_ = new ArrayList<WebUnit>();
  private RequestFilter  filter_ ;
  
  public WebUnitCaptor() {
  }
  
  public void setRequestFilter(RequestFilter filter) { filter_ = filter ; }
  
  public void onStartConnection(Connection connection) throws Exception {
  }
  
  public void onEndConnection(Connection connection) throws Exception {
    String method = connection.getHttpRequest().getMethod() ;
    if(method.startsWith("GET") || method.startsWith("POST")) {
      String uri = connection.getHttpRequest().getURI() ;
      WebUnit unit = new WebUnit(uri, method, connection.getHttpRequest().getProtocolVersion()) ;
      if(filter_.match(unit.getPathInfo())){
        MainWindow main = MainWindow.getMainWindowInstance() ;
        main.getSuiteView().addUnit(unit) ;
      }
    } else {
      return ;
    }
  }
}