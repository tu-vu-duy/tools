/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Pl
 * ease look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JInternalFrame;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;

import org.exoplatform.swing.Application;
import org.exoplatform.swing.ViewPlugin;
import org.exoplatform.wsqa.httpclient.WebUnit;
import org.exoplatform.wsqa.httpclient.WebUnitExecuteContext;
import org.exoplatform.wsqa.httpclient.WebUnitListener;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class HttpClientResultPanel extends JPanel implements ViewPlugin {
  final static public String WORKSPACE_NAME = "WSQAWorkspace" ;
  
  private static String[]  TABLE_HEADERS = {"#","Name", "Description", "Error"} ;
  
  private List<WebUnitExecuteContext> datas_ = new ArrayList<WebUnitExecuteContext>() ;
  
  private RunDataTableModel webunitTableModel_ ;
  private JTable jtable_ ;
  private JPopupMenu popupMenu ;
  
  public  HttpClientResultPanel() {
    popupMenu = new WebunitExecuteContextPopupMenu();
    setLayout(new BorderLayout()) ;
    jtable_ = new JTable();
    jtable_.setDefaultRenderer(Object.class, new TableRowColorRenderer());    
    webunitTableModel_ =  new RunDataTableModel(null, TABLE_HEADERS) ;
    jtable_.setModel(webunitTableModel_);
    jtable_.addMouseListener(new MouseAdapter() {
      public void mousePressed(MouseEvent evt) {
        if (evt.getButton() == MouseEvent.BUTTON3|| evt.isPopupTrigger()) {
          JTable source = (JTable)evt.getSource();
          source.getSelectedRow() ;
          popupMenu.show(source, evt.getX(),evt.getY());
        }
      }
    });
    
    JScrollPane scrollPane = new JScrollPane(jtable_);
    add(scrollPane, BorderLayout.CENTER);
  }
  
  public String getName() { return WORKSPACE_NAME ;} ;
  public String getTitle() { return "WSQA Workspace" ; }
  
  public List<WebUnitExecuteContext> getRunDatas() { return datas_ ; }
  
  public int getSelectedRow()  { return jtable_.getSelectedRow() ; }
  
  public WebUnitExecuteContext getSelectedRunData() {    
    return datas_.get(jtable_.getSelectedRow()) ;
  }
  
  public void addData(WebUnitExecuteContext context) throws Exception {
    datas_.add(context) ;
    String[] rowData = {
      Integer.toString(webunitTableModel_.getRowCount()), 
      context.getRequest().getHeaders().getUri().getPathInfo(), 
      ".....",
      Boolean.toString(context.hasError())
    } ;
    webunitTableModel_.addRow(rowData);
    webunitTableModel_.fireTableDataChanged();
  }
  
  public void updateData(List<WebUnitExecuteContext> contexts) throws Exception {
    webunitTableModel_.setDataVector(null, TABLE_HEADERS) ;
    datas_ = contexts ;
    if(contexts != null) {
      int counter = 0 ;
      for(WebUnitExecuteContext context :  contexts) {
        String[] rowData = {
            Integer.toString(counter), 
            context.getRequest().getHeaders().getUri().getPathInfo(), 
            ".....",
            Boolean.toString(context.hasError())
        } ;
        webunitTableModel_.addRow(rowData);
        counter++ ;
      }
    }
    jtable_.getColumnModel().getColumn(0).setMaxWidth(5);
    webunitTableModel_.fireTableDataChanged();
  }
  
  static public class RunDataTableModel extends DefaultTableModel {
    
    public RunDataTableModel(Object[][] obj, String[] str) {
      super(obj, str);
    }
    
    public boolean isCellEditable(int row, int column) {  return false; }
  }
  
  public class ClearWebunitsListener implements ActionListener {
    public void actionPerformed(ActionEvent event) {
      datas_.clear() ;
      webunitTableModel_.setDataVector(null, TABLE_HEADERS) ;
      
    }
  }
  
  public class RunDataCaptureListener implements WebUnitListener {
    public void onPreExecute(WebUnit unit, WebUnitExecuteContext context) throws Exception {
    }

    public void onPostExecute(WebUnit unit, WebUnitExecuteContext context) throws Exception {
      addData(context) ;
    }
  }
  
  public class WebunitExecuteContextPopupMenu extends JPopupMenu {
    public WebunitExecuteContextPopupMenu() {
      JMenuItem menuItem = new JMenuItem("View Parse Data");
      menuItem.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent evt) {
          try {
            WebUnitExecuteContext rundata = getSelectedRunData() ;
            JInternalFrame frame = 
              Application.getInstance().getWorkspaces().openFrame("Webunit Data") ;
            WebUnitDataViewPlugin view = new WebUnitDataViewPlugin() ;
            String requestData = rundata.getRequest().getRequestDataAsText() ;
            String responseData = rundata.getResponse().getResponseDataAsText() ;
            view.setData(requestData, responseData) ;
            frame.add(view) ;
          } catch(Exception ex) {
            ex.printStackTrace() ;
          }
        }});
      add(menuItem);
      
      menuItem = new JMenuItem("View Original Data");
      menuItem.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent evt) {
          try {
            WebUnitExecuteContext rundata = getSelectedRunData() ;
            JInternalFrame frame = 
              Application.getInstance().getWorkspaces().openFrame("Webunit Orginal Data") ;
            WebUnitDataViewPlugin view = new WebUnitDataViewPlugin() ;
            String requestData = new String(rundata.getRequest().getOriginalRequestData()) ;
            String responseData = new String(rundata.getResponse().getOriginalResponseData()) ;
            view.setData(requestData, responseData) ;
            frame.add(view) ;
          } catch(Exception ex) {
            ex.printStackTrace() ;
          }
        }});
      add(menuItem);
    }
  }
  
  static class TableRowColorRenderer extends DefaultTableCellRenderer {
    public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, 
                                                   boolean hasFocus, int row, int column) {
      super.getTableCellRendererComponent(table, value, isSelected, hasFocus, row, column);
      String cellValue = table.getValueAt(row, 3).toString() ;
      if ("true".equals(cellValue)) setBackground(Color.red);
      else setBackground(table.getBackground());
      if (isSelected) setBackground(table.getSelectionBackground());
      return this;
    }
  }
}