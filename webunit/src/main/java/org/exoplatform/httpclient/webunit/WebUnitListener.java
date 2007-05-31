/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.webunit;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public interface WebUnitListener {
  public void onPreExecute(WebUnit unit, WebUnitExecuteContext context) throws Exception ;
  public void onPostExecute(WebUnit unit, WebUnitExecuteContext context) throws Exception ;
}
