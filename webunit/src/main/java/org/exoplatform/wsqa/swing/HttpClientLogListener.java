/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import org.exoplatform.wsqa.httpclient.WebUnit;
import org.exoplatform.wsqa.httpclient.WebUnitExecuteContext;
import org.exoplatform.wsqa.httpclient.WebUnitListener;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 26, 2007  
 */
public class HttpClientLogListener implements WebUnitListener {
  
  public void onPreExecute(WebUnit unit, WebUnitExecuteContext context) throws Exception {
    
  }

  public void onPostExecute(WebUnit unit, WebUnitExecuteContext context) throws Exception {
    HttpClientLogViewPlugin.getInstance().addData(context) ;
  }
  
}
