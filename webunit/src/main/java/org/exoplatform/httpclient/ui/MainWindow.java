/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import java.awt.CardLayout;
import java.awt.EventQueue;

import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.WindowConstants;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 2, 2007  
 */
public class MainWindow extends javax.swing.JFrame {
  private static MainWindow instance_ ;
  
  public MainWindow() {
    getContentPane().setLayout(new CardLayout());
    setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    setLocation(20, 20);
    setSize(850, 650) ;
    
    setJMenuBar(new MenuBar());
    
    JSplitPane splitPane = new JSplitPane();
    getContentPane().add(splitPane, "WorkingArea");
    JScrollPane scrollPane = new JScrollPane();
    splitPane.setLeftComponent(scrollPane);
    scrollPane.setViewportView(new ControllerView());
    
    splitPane.setRightComponent(new SuiteView());
    setVisible(true);
  }

  static  public MainWindow getMainWindowInstance()  {  return instance_ ; }
  
  public static void main(String args[]) {
    EventQueue.invokeLater(new Runnable() {
      public void run() {
        instance_ = new MainWindow();
      }
    });
  }
}
