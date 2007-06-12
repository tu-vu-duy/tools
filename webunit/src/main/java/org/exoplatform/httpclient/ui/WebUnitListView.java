/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import java.awt.CardLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

import org.exoplatform.httpclient.webunit.WebUnit;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class WebUnitListView extends JPanel {
  private static String[]  TABLE_HEADERS = {"#","Name", "Description"} ;
  private DefaultTableModel tableDatas_ ;
  private int counter = 1;  

  public WebUnitListView () {
    setLayout(new CardLayout());
    JScrollPane scrollPane = new JScrollPane();
    add(scrollPane, "WebUnitListViewScroller");

    final JTable table = new JTable();
    tableDatas_ =  new DefaultTableModel(getTableData(), TABLE_HEADERS) ;
    table.setModel(tableDatas_);

    table.getColumnModel().getColumn(0).setMaxWidth(50);
    table.getColumnModel().getColumn(0).setMinWidth(50); 


//  table.addMouseListener(new MouseAdapter() {
//  public void mouseClicked(MouseEvent evt) {
//  JTable tbl = (JTable) evt.getSource();
//  System.out.println("selected row " + tbl.getSelectedRow());
//  }
//  });
    scrollPane.setViewportView(table);

    final JPopupMenu tabellenPopup = new WebUnitPopupMenu();
    table.addMouseListener(new java.awt.event.MouseAdapter() {
      public void mousePressed(java.awt.event.MouseEvent evt) {
        if (evt.getButton()==java.awt.event.MouseEvent.BUTTON3){
          tabellenPopup.show(table, evt.getX(),evt.getY());
        }}
    });
  }

  public void addUnit(WebUnit unit) throws Exception {
    String i = "" + counter++;  
    tableDatas_.addRow(new String[] {i, unit.getName(), "new " });
  }

  public Object[][] getTableData() {
    Object[][] data = new Object[][] {
    }; 
    return data ;
  }
}
