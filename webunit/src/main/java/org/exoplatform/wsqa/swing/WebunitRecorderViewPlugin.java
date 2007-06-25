/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.util.HashMap;
import java.util.Map;

import javax.swing.JButton;
import javax.swing.JInternalFrame;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

import org.exoplatform.javascript.JavaScriptEngine;
import org.exoplatform.swing.Application;
import org.exoplatform.swing.JExoToolBar;
import org.exoplatform.swing.ViewPlugin;
import org.exoplatform.swing.event.EventManager;
import org.exoplatform.swing.log.LogPlugin;
import org.exoplatform.wsqa.recorder.ProxyServer;
import org.exoplatform.wsqa.recorder.RequestFilter;
import org.exoplatform.wsqa.webunit.Suite;
import org.exoplatform.wsqa.webunit.WebUnit;
import org.mozilla.javascript.Script;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class WebunitRecorderViewPlugin extends JPanel implements ViewPlugin {
  final static public String WORKSPACE_NAME = "WSQAWorkspace" ;
  private JExoToolBar toolBar_ = new JExoToolBar();
  private static String[]  TABLE_HEADERS = {"#","Name", "Description"} ;
  
  private ProxyServer server_ ;
  private Suite suite_ = new Suite() ;
  
  public WebunitTableModel webunitTableModel_ ;
  
  public  WebunitRecorderViewPlugin() {
    setLayout(new BorderLayout());
    
    JTable table = new JTable();
    webunitTableModel_ =  new WebunitTableModel(null, TABLE_HEADERS) ;
    table.setModel(webunitTableModel_);
    table.getColumnModel().getColumn(0).setMaxWidth(3);

    final JPopupMenu popupMenu = new WebUnitPopupMenu();
    table.addMouseListener(new java.awt.event.MouseAdapter() {
      public void mousePressed(MouseEvent evt) {
        if (evt.getButton()== MouseEvent.BUTTON2 ||evt.getButton()== MouseEvent.BUTTON3){
          JTable source = (JTable)evt.getSource();
          popupMenu.show(source, evt.getX(),evt.getY());
        }
      }
      
    });
    
    JScrollPane scrollPane = new JScrollPane(table);
    scrollPane.setPreferredSize(new Dimension(150, 150)) ;    
    add(scrollPane, BorderLayout.CENTER);
    
    JButton button = new JButton("Start") ;
    button.addActionListener(new StartServerListener()) ;
    toolBar_.addButton(button) ;
    
    button = new JButton("Stop") ;
    button.addActionListener(new StopServerListener());
    toolBar_.addButton(button) ;
    
    toolBar_.addSeparator(new Dimension(10, 20));
    
    button = new JButton("Generate Script") ;
    button.addActionListener(new GenerateScriptListener());
    toolBar_.addButton(button) ;
    
    button = new JButton("Replay") ;
    button.addActionListener(new ReplayWebunitsListener());
    toolBar_.addButton(button) ;
    
    button = new JButton("Clear") ;
    button.addActionListener(new ClearWebunitsListener());
    toolBar_.addButton(button) ;
    
    
    add(toolBar_, BorderLayout.NORTH);
  }
  
  public String getName() { return WORKSPACE_NAME ;} ;
  public String getTitle() { return "WSQA Workspace" ; }
  
  public void addUnit(WebUnit unit) throws Exception {
    suite_.addWebUnit(unit) ;
    webunitTableModel_.addRow(new String[] {"?", unit.getPathInfo(), "new " });
    webunitTableModel_.fireTableDataChanged();
  }
  
  static public class WebunitTableModel extends DefaultTableModel {
    
    public WebunitTableModel(Object[][] obj, String[] str) {
      super(obj, str);
    }
    
    public boolean isCellEditable(int row, int column) {  return false; }
  }
  
  public class StartServerListener implements ActionListener {
    public void actionPerformed(ActionEvent event) {
      try {
        if(server_ != null) {
          final String message = "Server is already start.........................." ;
          EventManager.getInstance().broadcast(LogPlugin.INFO_EVENT_NAME, server_, message);
          return ;
        }
        server_ = new ProxyServer() ;
        String[]  pattern = {"/portal/private/.*","/portal/public/.*"} ;
        RequestFilter filter = new RequestFilter(pattern) ;
        WebUnitCaptor captor = new WebUnitCaptor() ;
        captor.setRequestFilter(filter) ;
        server_.add(captor) ;
        server_.start() ;
        final String message = "Start The Proxy Server.........................." ;
        EventManager.getInstance().broadcast(LogPlugin.INFO_EVENT_NAME, server_, message);
      } catch(Exception ex) {
        ex.printStackTrace() ;
      }
    }
  }
  
  public class StopServerListener implements ActionListener {
    public void actionPerformed(ActionEvent event) {
      try {
        if(server_ == null) {
          final String message = "Server is already stop.........................." ;
          EventManager.getInstance().broadcast(LogPlugin.INFO_EVENT_NAME, server_, message);
          return ;
        }
        server_.stopServer() ;
        server_ = null ;
        final String message = "Stop The Proxy Server.........................." ;
        EventManager.getInstance().broadcast(LogPlugin.INFO_EVENT_NAME, server_, message);
      } catch(Exception ex) {
        ex.printStackTrace() ;
      }
    }
  }
  
  public class ClearWebunitsListener implements ActionListener {
    public void actionPerformed(ActionEvent event) {
      webunitTableModel_.setDataVector(null, TABLE_HEADERS) ;
      suite_.getWebUnits().clear() ;
    }
  }
  
  public class ReplayWebunitsListener implements ActionListener {
    public void actionPerformed(ActionEvent event) {
      WebunitPlayerViewPlugin player = new WebunitPlayerViewPlugin(suite_) ;
      try {
        JInternalFrame frame = 
          Application.getInstance().getWorkspaces().openFrame("WebunitPlayer", "Webunit Player") ;
        frame.add(player) ;
      } catch(Exception ex) {
        ex.printStackTrace() ;
      }
    }
  }
  
  public class GenerateScriptListener implements ActionListener {
    public void actionPerformed(ActionEvent event) {
      System.out.println("Generate script ");
      try {
        JavaScriptEngine engine = new JavaScriptEngine() ;
        String scriptText = 
          "java.lang.System.out.println('hello..................') ;\n" +
          "importPackage(Packages.org.exoplatform.wsqa.webunit); \n" +
          "importPackage(Packages.org.exoplatform.wsqa.webunit); \n" +
          "var suite = new Suite() ;\n" +
          "java.lang.System.out.println('hello..................' + suite) ;"  ;
        Script sobject = engine.compileScript("TestScript", scriptText) ;
        Map<String, Object> variables = new HashMap<String, Object>() ;
        engine.execute(sobject, variables) ;
      } catch (Exception ex) {
        ex.printStackTrace() ;
      }
    }
  }  
}