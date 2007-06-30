/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.server.tomcat;




import org.exoplatform.swing.Application;
import org.exoplatform.swing.Plugin;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 16, 2007  
 */
public class TomcatPlugin implements Plugin {
  final static public String NAME = "TomcatPlugin" ; 
  private TomcatInfoPlugin tomcatInforPlugin_;
  
  public TomcatPlugin() {
   
  }
  
  public String getTitle() { return "Tomcat"; }
  
  public String getName() { return NAME; }

  public String getDescription() { return "Tomcat Server Control Plugin"; }

  
  public void onInitApplication(Application app) throws Exception {
    tomcatInforPlugin_ = new TomcatInfoPlugin();
    app.getControlSpace().addView(tomcatInforPlugin_);
  }
  
  public void onDestroyApplication(Application app) throws Exception {
    tomcatInforPlugin_ = null;
  }
 
}
