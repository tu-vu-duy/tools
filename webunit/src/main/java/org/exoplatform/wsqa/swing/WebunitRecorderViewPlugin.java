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

import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTable;

import org.exoplatform.swing.ViewPlugin;
import org.exoplatform.wsqa.recorder.ProxyServer;
import org.exoplatform.wsqa.recorder.RequestFilter;
import org.exoplatform.wsqa.webunit.WebUnit;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class WebunitRecorderViewPlugin extends JPanel implements ViewPlugin {
  final static public String WORKSPACE_NAME = "WSQAWorkspace" ;
  
  private static String[]  TABLE_HEADERS = {"#","Name", "Description"} ;
  
  private ProxyServer server_ ;
  public MyDefaultTableModel tableDatas_ ;
  
  public  WebunitRecorderViewPlugin() {
    JPanel pnlControl = new JPanel(new FlowLayout());
    JButton btnStart = new JButton("Start") ;
    pnlControl.add(btnStart) ;
    btnStart.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent event) {
        try {
          if(server_ != null) {
            System.out.println("Server is already start..........................");
            return ;
          }
          server_ = new ProxyServer() ;
          String[]  pattern = {"/portal/.*"} ;
          RequestFilter filter = new RequestFilter(pattern) ;
          WebUnitCaptor captor = new WebUnitCaptor() ;
          captor.setRequestFilter(filter) ;
          server_.add(captor) ;
          server_.start() ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    }) ;
    JButton btnStop = new JButton("Stop") ;
    pnlControl.add(btnStop) ;
    btnStop.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent event) {
        try {
          if(server_ == null) {
            System.out.println("Server is already stop..........................");
            return ;
          }
          server_.stopServer() ;
          server_ = null ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    });

    
    
    JTable table = new JTable();
    tableDatas_ =  new MyDefaultTableModel(getTableData(), TABLE_HEADERS) ;
    
    table.setModel(tableDatas_);

    table.getColumnModel().getColumn(0).setMaxWidth(50);
    table.getColumnModel().getColumn(0).setMinWidth(50); 

    final JPopupMenu tabellenPopup = new WebUnitPopupMenu();
    table.addMouseListener(new java.awt.event.MouseAdapter() {
      public void mousePressed(java.awt.event.MouseEvent evt) {
        if (evt.getButton()==java.awt.event.MouseEvent.BUTTON3){
          JTable source = (JTable)evt.getSource();
          tabellenPopup.show(source, evt.getX(),evt.getY());
        }
      }
      
    });
    
    JScrollPane scrollPane = new JScrollPane(table);
    scrollPane.setPreferredSize(new Dimension(150, 150));
    
    setLayout(new BorderLayout());
    add(scrollPane, BorderLayout.CENTER);
    add(pnlControl, BorderLayout.SOUTH);
  }
  
  public String getName() { return WORKSPACE_NAME ;} ;
  public String getTitle() { return "WSQA Workspace" ; }
  
  public Object[][] getTableData() {
    Object[][] data = new Object[][] {
    }; 
    return data ;
  }
  
  public void addUnit(WebUnit unit) throws Exception {
    tableDatas_.addRow(new String[] {"?", unit.getName(), "new " });
    tableDatas_.fireTableDataChanged();
  }
}