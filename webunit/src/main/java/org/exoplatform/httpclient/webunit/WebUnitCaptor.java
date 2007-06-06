/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.webunit;

import java.util.ArrayList;
import java.util.List;

import org.exoplatform.httpclient.recorder.Connection;
import org.exoplatform.httpclient.recorder.ConnectionListener;
import org.exoplatform.httpclient.recorder.RequestFilter;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class WebUnitCaptor implements ConnectionListener {
  private List<WebUnit> units_ = new ArrayList<WebUnit>();
  private RequestFilter  filter_ ;
  
  public void setRequestFilter(RequestFilter filter) { filter_ = filter ; }
  
  public void onStartConnection(Connection connection) throws Exception {
  }

  
  public void onEndConnection(Connection connection) throws Exception {
    String requestString = new String("").trim() ;
    if(requestString.startsWith("GET") || requestString.startsWith("POST")) {
      String[] lines = requestString.split("\n") ;
      String firstline = lines[0] ;
      String[] tmp = firstline.split(" ") ;
      String method = tmp[0] ; 
      String uri = tmp[1] ;
      String protocolVersion = tmp[2] ;
      WebUnit unit = new WebUnit(uri, method, protocolVersion) ;
      if(filter_.match(unit.getPathInfo())) units_.add(unit) ;
      System.out.println(unit);
    } else {
      return ;
    }
  }
}