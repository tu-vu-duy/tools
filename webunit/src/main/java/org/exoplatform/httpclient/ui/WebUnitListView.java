/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Vector;

import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTable;

import org.exoplatform.httpclient.webunit.WebUnit;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class WebUnitListView extends JPanel {
  private static String[]  TABLE_HEADERS = {"#","Name", "Description"} ;
  public MyDefaultTableModel tableDatas_ ;
  private int counter = 1;  
  private JButton btnSave;
  public static String str = "";
  public int row_number = 0;
  public final JTable table;
  
  public WebUnitListView () {
    setLayout(new BorderLayout());
    JScrollPane scrollPane = new JScrollPane();
    add(scrollPane, BorderLayout.CENTER);

    table = new JTable();
    tableDatas_ =  new MyDefaultTableModel(getTableData(), TABLE_HEADERS) ;
    
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
          
          JTable source = (JTable)evt.getSource();
          row_number = source.rowAtPoint(evt.getPoint()); 
          System.out.println("row number :" + row_number);
        }
      }
      
    });
    
    JPanel pnlControl = new JPanel();
    btnSave = new JButton("Save");
    pnlControl.add(btnSave);
    add(pnlControl, BorderLayout.SOUTH);
    
    btnSave.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        
      }
    });
    
  }

  public void addUnit(WebUnit unit) throws Exception {
    String i = "" + counter++;  
    tableDatas_.addRow(new String[] {i, unit.getName(), "new " });
    tableDatas_.fireTableDataChanged();
    
    Vector RowData = (Vector)tableDatas_.getDataVector().elementAt(tableDatas_.getRowCount()-1);
    
    StringBuffer strBuffer = new StringBuffer("");
    strBuffer.append(RowData.toString());    
    strBuffer.replace(0, 1, "");
    strBuffer.replace(strBuffer.toString().length()-1, strBuffer.toString().length(), "");
    strBuffer.append("\n");
    
    str += strBuffer.toString();    
  }

  public Object[][] getTableData() {
    Object[][] data = new Object[][] {
    }; 
    return data ;
  }
}
