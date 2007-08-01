/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
abstract public class HttpClient {
  private String id_ ;
  private String suiteName_ = "Default";
  private String scheme_ = "http://" ;
  private String host_ = "192.168.1.29";
  private int    port_ = 8080;
  private String protocol_ = "HTTP/1.1" ;
  private String cookie_ = "JSESSIONID=AAF6D8E0FE36B9874D1225BFFE4D2E6D" ;
  
  public HttpClient() {
    id_ = Integer.toString(hashCode()) ;
  }
  
  public HttpClient(String suiteName) {
    suiteName_ = suiteName ;
    id_ = Integer.toString(hashCode()) ;
  }
  
  public String getId() { return id_ ; }
  public String getSuiteName() { return suiteName_ ; } 
  public String getScheme()  { return scheme_ ; }
  public String getHost() { return host_ ; }
  public int getPort() { return port_ ; }
  public String getProtocol() { return protocol_ ; }
  
  private List<WebUnitListener> webUnitListeners_ = new ArrayList<WebUnitListener>();
  private List<SuiteListener> suiteListeners_ = new ArrayList<SuiteListener>();
  private Map<String,String>  defaultRequestHeaders_ = new  HashMap<String, String>() ;
  
  public void add(WebUnitListener listener) { webUnitListeners_.add(listener) ; }
  public void add(SuiteListener listener) { suiteListeners_.add(listener) ; }
  
  public Map<String, String> getDefaultRequestHeader() { return defaultRequestHeaders_ ; }
  
  public String getCookie() {  return cookie_ ; }
  public void   setCookie(String s) {  cookie_ = s; }
  
  public void execute(Suite suite) throws Exception {
    List<WebUnit> units = suite.getWebUnits() ;
    SuiteExecuteContext context = new SuiteExecuteContext() ;
    for(SuiteListener listener : suiteListeners_) listener.onPreExecute(suite, context) ;
    context.setStartTime(System.currentTimeMillis()) ;
    for(WebUnit unit :  units) execute(unit) ;
    context.setEndTime(System.currentTimeMillis()) ;
    for(SuiteListener listener : suiteListeners_) listener.onPostExecute(suite, context) ;
    System.gc() ;
  }
  
  public WebUnitExecuteContext execute(WebUnit unit) throws Exception {
    WebUnitExecuteContext context = new WebUnitExecuteContext(this) ;
    for(WebUnitListener listener : webUnitListeners_) listener.onPreExecute(unit, context) ;
    context.setStartTime(System.currentTimeMillis()) ;
      
    execute(unit, context) ;
      
    context.setEndTime(System.currentTimeMillis()) ;
    String setCookie = context.getResponse().getHttpResponseHeader().getSetCookie()  ;
    if(setCookie != null) setCookie(setCookie) ;
    for(WebUnitListener listener : webUnitListeners_) listener.onPostExecute(unit, context) ;
    return context ;
  }
  
  abstract protected void execute(WebUnit unit, WebUnitExecuteContext context) throws Exception ;
  
}
