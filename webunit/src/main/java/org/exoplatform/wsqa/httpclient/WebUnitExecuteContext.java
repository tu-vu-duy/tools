/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient;


/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class WebUnitExecuteContext {
  final  static public int  OK_STATUS =  200 ;
  
  private long startTime_ ;
  private long endTime_ ;
  private HttpRequest request_ ;
  private HttpResponse response_ ;
  private HttpClient client_ ;
  
  public WebUnitExecuteContext(HttpClient client) {
    client_ = client;
  }

  public long getStartTime() { return startTime_; }
  public void setStartTime(long time) { startTime_ = time ; }
  
  public long getEndTime() { return endTime_; }
  public void setEndTime(long time) { endTime_ = time ; }

  public HttpRequest getRequest() { return request_ ; }
  public void  setRequest(HttpRequest request) { request_ = request  ; }
  
  public HttpResponse getResponse() { return response_; }
  public void setResponse(HttpResponse response) { response_ = response ; }

  public HttpClient getHttpClient() { return client_ ; }
}
