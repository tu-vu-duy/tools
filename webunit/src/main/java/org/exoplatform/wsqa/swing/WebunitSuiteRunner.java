/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import org.exoplatform.wsqa.httpclient.HttpClient;
import org.exoplatform.wsqa.webunit.Suite;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 30, 2007  
 */
public class WebunitSuiteRunner extends Thread {
  private HttpClient client_ ; 
  private Suite suite_ ;
  
  public WebunitSuiteRunner(HttpClient client, Suite suite) throws Exception {
    client_ = client ;
    suite_ = suite ;
  }
  

  public void run() {
    try {
      client_.execute(suite_) ;
    } catch(Exception ex) {
      ex.printStackTrace() ;
    }
  }
}