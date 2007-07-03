/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JInternalFrame;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

import org.exoplatform.swing.Application;
import org.exoplatform.swing.JExoJavascriptEditor;
import org.exoplatform.swing.JExoToolBar;
import org.exoplatform.swing.ViewPlugin;
import org.exoplatform.swing.event.EventManager;
import org.exoplatform.swing.log.LogPlugin;
import org.exoplatform.wsqa.httpclient.Suite;
import org.exoplatform.wsqa.httpclient.WebUnit;
import org.exoplatform.wsqa.recorder.ProxyServer;
import org.exoplatform.wsqa.recorder.RequestFilter;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class WebunitRecorderViewPlugin extends JPanel implements ViewPlugin {
  final static public String WORKSPACE_NAME = "WSQAWorkspace" ;
  private static String[]  TABLE_HEADERS = {"#","Name", "Description"} ;
  
  private JExoToolBar toolBar_ = new JExoToolBar();
  
  private ProxyServer server_ ;
  private Suite suite_ = new Suite() ;
  
  private WebunitTableModel webunitTableModel_ ;
  private JTable webunitTable_ ;
  
  public  WebunitRecorderViewPlugin() {
    setLayout(new BorderLayout());
    
    webunitTable_ = new JTable();
    webunitTableModel_ =  new WebunitTableModel(null, TABLE_HEADERS) ;
    webunitTable_.setModel(webunitTableModel_);
    webunitTable_.getColumnModel().getColumn(0).setMaxWidth(3);

    final WebUnitPopupMenu popupMenu = new WebUnitPopupMenu();
    webunitTable_.addMouseListener(new java.awt.event.MouseAdapter() {
      public void mousePressed(MouseEvent evt) {
        if (evt.getButton()== MouseEvent.BUTTON3 || evt.isPopupTrigger()){
          JTable source = (JTable)evt.getSource();
          popupMenu.show(source, evt.getX(),evt.getY());
  
          //removeUnit(webunitTable_.getSelectedRow());
        }
      }
    });
    
  
    JScrollPane scrollPane = new JScrollPane(webunitTable_);
    scrollPane.setPreferredSize(new Dimension(150, 150)) ;    
    add(scrollPane, BorderLayout.CENTER);
    
    JButton button = new JButton("Start") ;
    button.addActionListener(new StartServerListener()) ;
    toolBar_.addButton(button) ;
    
    button = new JButton("Stop") ;
    button.addActionListener(new StopServerListener());
    toolBar_.addButton(button) ;
    
    button = new JButton("Clear") ;
    button.addActionListener(new ClearWebunitsListener());
    toolBar_.addButton(button) ;
    
    toolBar_.addSeparator();
    
    button = new JButton("Generate") ;
    button.setToolTipText("Generate Javascript code") ;
    button.addActionListener(new GenerateScriptListener());
    
    toolBar_.addButton(button) ;
    button = new JButton("Log") ;
    button.setToolTipText("Show Http Client Log") ;
    button.addActionListener(new ShowLogListener());
    toolBar_.addButton(button) ;
    
    add(toolBar_, BorderLayout.NORTH);
    
    //ListOpenedFileViewPlugin.addButton(getTitle());
  }
  
  public String getName() { return WORKSPACE_NAME ;} ;
  public String getTitle() { return "WSQA Workspace" ; }
  
  public void addUnit(WebUnit unit) throws Exception {
    suite_.addWebUnit(unit) ;
    webunitTableModel_.addRow(new String[] {"?", unit.getPathInfo(), "new " });
    webunitTableModel_.fireTableDataChanged();
  }
  
  public void removeUnit(int row) {
    webunitTableModel_.removeRow(row);
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
        String[]  pattern = {
            "/portal/private/.*","/portal/public/.*", 
            "/portal/j_security_check.*", "/portal/post.jsp.*"
        } ;
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
  
  public class ShowLogListener implements ActionListener {
    public void actionPerformed(ActionEvent event) {
      JInternalFrame frame = 
        Application.getInstance().getWorkspaces().getFrame(HttpClientLogViewPlugin.NAME) ;
      if(frame == null) {
        try {
          frame = 
            Application.getInstance().getWorkspaces().openFrame(HttpClientLogViewPlugin.NAME, "Http Client Log") ;
          frame.add(HttpClientLogViewPlugin.getInstance()) ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    }
  }
  
  public class GenerateScriptListener implements ActionListener {
    public void actionPerformed(ActionEvent event) {
      try {
        String scriptText = WebunitJavaScriptGenerator.generate(suite_) ;
        JInternalFrame frame = 
          Application.getInstance().getWorkspaces().openFrame("", "") ;
        JExoJavascriptEditor editor = new JExoJavascriptEditor() ;
        editor.setText(scriptText) ;
        frame.add(editor) ;
      } catch (Exception ex) {
        ex.printStackTrace() ;
      }
    }
  }  
  
  public class WebUnitPopupMenu extends JPopupMenu {
    public WebUnitPopupMenu() {
      JMenuItem menuItem = new JMenuItem("View Data");
      menuItem.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent evt) {
          try {
            int selectedRow = webunitTable_.getSelectedRow() ;
            WebUnit unit = suite_.getWebUnits().get(selectedRow) ;
            JInternalFrame frame = 
              Application.getInstance().getWorkspaces().openFrame("WebUnitData", "Webunit Data") ;
            WebUnitDataViewPlugin view = new WebUnitDataViewPlugin() ;
            String requestData = unit.getHttpRequest().getRequestDataAsText() ;
            String responseData = unit.getHttpResponse().getResponseDataAsText() ;
            view.setData(requestData, responseData) ;
            frame.add(view) ;
          } catch(Exception ex) {
            ex.printStackTrace();
          }
        }});
      add(menuItem);
      
      menuItem = new JMenuItem("View Original Data");
      menuItem.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent evt) {
          try {
            int selectedRow = webunitTable_.getSelectedRow() ;
            WebUnit unit = suite_.getWebUnits().get(selectedRow) ;
            JInternalFrame frame = 
              Application.getInstance().getWorkspaces().openFrame("WebUnitOrginalData", "Webunit Original Data") ;
            WebUnitDataViewPlugin view = new WebUnitDataViewPlugin() ;
            String requestData =new String(unit.getHttpRequest().getOriginalRequestData()) ;
            String responseData = new String(unit.getHttpResponse().getOriginalResponseData()) ;
            view.setData(requestData, responseData) ;
            frame.add(view) ;
          } catch(Exception ex) {
            ex.printStackTrace();
          }
        }});
      add(menuItem);
      
      menuItem = new JMenuItem("Remove");
      menuItem.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent evt) {
          int n = JOptionPane.showConfirmDialog(webunitTable_, "Do you want to delete this row ?", "Confirm", JOptionPane.YES_NO_OPTION);
          if (n == 0)  removeUnit(webunitTable_.getSelectedRow());            
        }});
      add(menuItem);
      
      menuItem = new JMenuItem("Add Row");
      menuItem.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent evt) {
          new AddRowDialog();
        }});
      add(menuItem);
    }
  }
}