/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient;

import java.util.ArrayList;
import java.util.List;

import org.exoplatform.httpclient.webunit.Suite;
import org.exoplatform.httpclient.webunit.SuiteExecuteContext;
import org.exoplatform.httpclient.webunit.SuiteListener;
import org.exoplatform.httpclient.webunit.WebUnit;
import org.exoplatform.httpclient.webunit.WebUnitExecuteContext;
import org.exoplatform.httpclient.webunit.WebUnitListener;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
abstract public class HttpClient {
  private List<WebUnitListener> webUnitListeners_ = new ArrayList<WebUnitListener>();
  private List<SuiteListener> suiteListeners_ = new ArrayList<SuiteListener>();
  
  public void add(WebUnitListener listener) { webUnitListeners_.add(listener) ; }
  public void add(SuiteListener listener) { suiteListeners_.add(listener) ; }
  
  public void execute(Suite suite) throws Exception {
    List<WebUnit> units = suite.getWebUnits() ;
    SuiteExecuteContext context = new SuiteExecuteContext() ;
    for(SuiteListener listener : suiteListeners_) listener.onPreExecute(suite, context) ;
    context.setStartTime(System.currentTimeMillis()) ;
    for(WebUnit unit :  units) execute(unit) ;
    context.setEndTime(System.currentTimeMillis()) ;
    for(SuiteListener listener : suiteListeners_) listener.onPostExecute(suite, context) ;
  }
  
  public void execute(WebUnit unit) throws Exception {
    WebUnitExecuteContext context = new WebUnitExecuteContext() ;
    for(WebUnitListener listener : webUnitListeners_) listener.onPreExecute(unit, context) ;
    context.setStartTime(System.currentTimeMillis()) ;
    if(unit.getMethod() == WebUnit.GET_METHOD) {
      executeGet(unit, context) ;
    } else {
      executePost(unit, context) ;
    }
    context.setEndTime(System.currentTimeMillis()) ;
    for(WebUnitListener listener : webUnitListeners_) listener.onPostExecute(unit, context) ;
  }
  
  abstract protected void executeGet(WebUnit unit, WebUnitExecuteContext context) throws Exception ;
  abstract protected void executePost(WebUnit unit, WebUnitExecuteContext context) throws Exception ;
  
}
