/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Pl
 * ease look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

import org.exoplatform.swing.ViewPlugin;
import org.exoplatform.wsqa.httpclient.ExoHttpClient;
import org.exoplatform.wsqa.webunit.Suite;
import org.exoplatform.wsqa.webunit.WebUnit;
import org.exoplatform.wsqa.webunit.WebUnitExecuteContext;
import org.exoplatform.wsqa.webunit.WebUnitListener;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class WebunitPlayerViewPlugin extends JPanel implements ViewPlugin {
  final static public String WORKSPACE_NAME = "WSQAWorkspace" ;
  
  private static String[]  TABLE_HEADERS = {"#","Name", "Description"} ;
  
  private Suite suite_  ;
  private List<WebUnitExecuteContext> runDatas_ = new ArrayList<WebUnitExecuteContext>() ;
  
  private RunDataTableModel webunitTableModel_ ;
  private JTable jtable_ ;
  private JPopupMenu popupMenu ;
  
  public  WebunitPlayerViewPlugin(Suite suite) {
    suite_ = suite  ;
    popupMenu = new WebunitPlayerPopupMenu(this);
    setLayout(new BorderLayout()) ;
    jtable_ = new JTable();
    webunitTableModel_ =  new RunDataTableModel(null, TABLE_HEADERS) ;
    jtable_.setModel(webunitTableModel_);
    jtable_.getColumnModel().getColumn(0).setMaxWidth(3);
    jtable_.addMouseListener(new java.awt.event.MouseAdapter() {
      public void mousePressed(MouseEvent evt) {
        if (evt.getButton() == MouseEvent.BUTTON3|| evt.isPopupTrigger()) {
          JTable source = (JTable)evt.getSource();
          source.getSelectedRow() ;
          popupMenu.show(source, evt.getX(),evt.getY());
        }
      }
    });
    
    JScrollPane scrollPane = new JScrollPane(jtable_);
    scrollPane.setPreferredSize(new Dimension(150, 150)) ;    
    add(scrollPane, BorderLayout.CENTER);
    
    JPanel pnlControl = new JPanel(new FlowLayout());
    JButton button = new JButton("Play") ;
    button.addActionListener(new PlayWebunitsListener());
    pnlControl.add(button) ;
    
    button = new JButton("Clear") ;
    button.addActionListener(new ClearWebunitsListener());
    pnlControl.add(button) ;
    
    add(pnlControl, BorderLayout.SOUTH);
  }
  
  public String getName() { return WORKSPACE_NAME ;} ;
  public String getTitle() { return "WSQA Workspace" ; }
  
  public List<WebUnitExecuteContext> getRunDatas() { return runDatas_ ; }
  
  public int getSelectedRow()  { return jtable_.getSelectedRow() ; }
  
  public WebUnitExecuteContext getSelectedRunData() {    
    return runDatas_.get(jtable_.getSelectedRow()) ;
  }
  
  public void addData(WebUnitExecuteContext context) throws Exception {
    runDatas_.add(context) ;
    String[] rowData = {"?", context.getRequest().getURI().getPathInfo(), "....."} ;
    webunitTableModel_.addRow(rowData);
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
      runDatas_.clear() ;
      webunitTableModel_.setDataVector(null, TABLE_HEADERS) ;
      
    }
  }
  
  public class PlayWebunitsListener implements ActionListener {
    public void actionPerformed(ActionEvent event) {
      try {
        ExoHttpClient client = new ExoHttpClient() ;
        client.add(new RunDataCaptureListener()) ;
        client.execute(suite_) ;
      } catch(Exception ex) {
        ex.printStackTrace() ;
      }
    }
  }
  
  public class RunDataCaptureListener implements WebUnitListener {
    public void onPreExecute(WebUnit unit, WebUnitExecuteContext context) throws Exception {
    }

    public void onPostExecute(WebUnit unit, WebUnitExecuteContext context) throws Exception {
      addData(context) ;
    }
  }
}