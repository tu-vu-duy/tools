/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.impl;

import org.apache.commons.httpclient.methods.GetMethod;
import org.exoplatform.httpclient.HttpClient;
import org.exoplatform.httpclient.webunit.WebUnit;
import org.exoplatform.httpclient.webunit.WebUnitExecuteContext;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007
 */
public class ApacheCommonHttpClient extends HttpClient {
  org.apache.commons.httpclient.HttpClient client = new org.apache.commons.httpclient.HttpClient();

  protected void executeGet(WebUnit unit, WebUnitExecuteContext context) throws Exception {
    GetMethod method = new GetMethod(unit.getUrl());
    try {
      int statusCode = client.executeMethod(method);
      context.setResponseStatus(statusCode) ;
      System.err.println("Status code: " + statusCode);
      System.err.println("Status message: " + method.getStatusLine());
      byte[] responseData = method.getResponseBody();
      context.setResponseData(responseData) ;
    } finally {
      method.releaseConnection();
    }
  }
  
  protected void executePost(WebUnit unit, WebUnitExecuteContext context) throws Exception {
    throw new Exception("To be implemented") ;
  }
}
