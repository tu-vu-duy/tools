/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import javax.swing.JTabbedPane;

import org.exoplatform.httpclient.webunit.Suite;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class SuiteView extends JTabbedPane {
  private Suite currentSuite_ ;
  
  public SuiteView () {
    addTab("Web Units", new WebUnitListView());
    addTab("Script", new JavascriptView());
    addTab("Run", new WebUnitRunView());
    addTab("Recorder", new RecorderView());
  }
  
  public Suite getCurrentSuite()  { return currentSuite_ ; }
  
  public void setCurrentSuite(Suite suite) { currentSuite_ = suite ;}
}
