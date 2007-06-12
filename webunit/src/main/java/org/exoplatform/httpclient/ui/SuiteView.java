/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import javax.swing.JTabbedPane;

import org.exoplatform.httpclient.webunit.Suite;
import org.exoplatform.httpclient.webunit.WebUnit;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class SuiteView extends JTabbedPane {
  private Suite currentSuite_ ;
  private WebUnitListView unitsView_ ;
  
  public SuiteView () {
    currentSuite_ = new Suite(); 
    unitsView_ = new WebUnitListView() ;
    addTab("Web Units", unitsView_);
    addTab("Script", new JavascriptView());
    addTab("Run", new WebUnitRunView());
    addTab("Recorder", new RecorderView());
  }
  
  public void addUnit(WebUnit unit) throws Exception {
    currentSuite_.addWebUnit(unit) ;
    unitsView_.addUnit(unit) ;
  }
  
  public Suite getCurrentSuite()  { return currentSuite_ ; }
  
  public void setCurrentSuite(Suite suite) { currentSuite_ = suite ;}
}
