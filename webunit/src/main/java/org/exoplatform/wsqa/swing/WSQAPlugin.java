/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import org.exoplatform.swing.Application;
import org.exoplatform.swing.Plugin;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 16, 2007  
 */
public class WSQAPlugin implements Plugin {
  final static public String NAME = "WSQAPlugin" ;
  
  private WebunitRecorderViewPlugin webunitRecorderPl_ ;
  
  public String getName() { return "WSQAPlugin"; }
  
  public String getDescription() { return "Web Site Quality Assurance Plugin"; }

  public WebunitRecorderViewPlugin getWebunitRecorderViewPlugin() { return webunitRecorderPl_ ; } 
  
  public void onInitApplication(Application app) throws Exception {
    webunitRecorderPl_ = new WebunitRecorderViewPlugin() ;
    app.getWorkspaces().addView(webunitRecorderPl_) ;
  }
  
  public void onDestroyApplication(Application app) throws Exception {
    webunitRecorderPl_ =  null ;
  }
}
