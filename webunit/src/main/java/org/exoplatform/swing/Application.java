/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.awt.CardLayout;
import java.awt.EventQueue;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.swing.JComponent;
import javax.swing.JSplitPane;
import javax.swing.WindowConstants;

import org.exoplatform.swing.explorer.FileExplorerPlugin;
import org.exoplatform.swing.log.LogPlugin;
import org.exoplatform.wsqa.swing.WSQAPlugin;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 2, 2007  
 */
public class Application extends javax.swing.JFrame {
  private static Application instance_ ;
  
  private Map<String, ViewPlugin> workspacesMap_ = new HashMap<String, ViewPlugin>() ;
  private Map<String, Plugin> plugins_ = new LinkedHashMap<String, Plugin>() ;
  private ApplicationMenuBar menuBar_ ;
  private ControlSpace  controlSpace_ ;
  private Workspaces    workspaces_ ;
  
  public Application() throws Exception {
    setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    setLocation(20, 20);
    setSize(1200, 700) ;
    menuBar_ = new ApplicationMenuBar() ;
    setJMenuBar(menuBar_);
    plugins_.put(FileExplorerPlugin.NAME, new FileExplorerPlugin()) ;
    plugins_.put(LogPlugin.NAME, new LogPlugin()) ;
    plugins_.put(WSQAPlugin.NAME, new WSQAPlugin()) ;
    
    getContentPane().setLayout(new CardLayout());
    JSplitPane splitPane = new JSplitPane();
    splitPane.setDividerSize(5);
    splitPane.setDividerLocation(250);
    add(splitPane, "SplitPane");
    controlSpace_ = new ControlSpace() ;
    splitPane.setLeftComponent(controlSpace_);
    workspaces_ = new Workspaces() ;
    splitPane.setRightComponent(workspaces_);
    getContentPane().add(splitPane, "SplitPane");
    
    for(Plugin plugin :  plugins_.values()) plugin.onInitApplication(this) ;
    
    setVisible(true);
  }
  
  public Plugin getPlugin(String name) { return plugins_.get(name) ; }
  
  public Map<String, ViewPlugin>  getWorkspacesMap() { return workspacesMap_ ; }
  
  public void changeWorkspace(String name) {
    ViewPlugin oldWS = (ViewPlugin) getContentPane().getComponent(0) ;
    getContentPane().remove(0) ;
    ViewPlugin newWS = workspacesMap_.get(name) ;
    getContentPane().add((JComponent)newWS, "Workspace") ;
    setVisible(true);
  }
  
  public ControlSpace getControlSpace() { return controlSpace_ ; }
  
  public Workspaces  getWorkspaces()  { return workspaces_ ; }
  
  public ApplicationMenuBar getApplicationMenuBar() { return menuBar_ ; }
  
  static  public Application getInstance()  {  return instance_ ; }
  
  public static void main(String args[]) {
    EventQueue.invokeLater(new Runnable() {
      public void run() {
        try {
          instance_ = new Application();
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    });
  }
}