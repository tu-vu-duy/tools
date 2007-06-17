/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.log;

import org.exoplatform.swing.Application;
import org.exoplatform.swing.Plugin;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 16, 2007  
 */
public class LogPlugin implements Plugin {
  final static public String NAME =  "LogPlugin" ;
  
  final static public String ERROR_EVENT_NAME = "log.event.error" ;
  final static public String INFO_EVENT_NAME = "log.event.info" ;
  
  private LogViewPlugin logViewPlugin_  ;
  
  public String getName() { return NAME; }
  
  public String getDescription() { return "Log View"; }

  public LogViewPlugin getLogViewPlugin() { return logViewPlugin_ ;}
  
  public void onInitApplication(Application app) throws Exception {
    logViewPlugin_ = new LogViewPlugin() ;
    app.getWorkspaces().addView(logViewPlugin_) ;
  }
  
  public void onDestroyApplication(Application app) throws Exception {
    logViewPlugin_ = null;
  }
}
