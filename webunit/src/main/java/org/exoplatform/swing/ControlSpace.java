/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.util.HashMap;
import java.util.Map;

import javax.swing.JComponent;
import javax.swing.JTabbedPane;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class ControlSpace extends JTabbedPane {
  private Map<String, ViewPlugin> viewPlugins_ = new HashMap<String, ViewPlugin>();
 
  public ControlSpace() {
    //setTabPlacement(JTabbedPane.LEFT); 
  }
  
  public ViewPlugin getViewPlugin(String name) { return viewPlugins_.get(name) ; }
  
  public void addView(ViewPlugin view) {
    JComponent jcomponent = (JComponent) view ;
    viewPlugins_.put(view.getName(), view) ;
    addTab(view.getTitle(), jcomponent) ;
  }
  
  public void changeView(String id) throws Exception {
    
  }
}