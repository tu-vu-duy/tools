/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.BorderLayout;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextPane;
import javax.swing.event.TableModelListener;
import javax.swing.table.*;
import javax.swing.event.*;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jul 3, 2007  
 */
public class ByteComparatorPanel extends JPanel {
  final public int PAGE_SIZE = 25 ;
  
  private byte[] buffer1, buffer2 ;
  private int start_ ;
  private DefaultTableModel model = new DefaultTableModel();
  private String[] cols = {"id", "Code 1", "Character 1", "Code 2", "Character 2"}; 
  private final JTable tbl = new JTable(model);
  private JTextPane txtInfo = new JTextPane();
  
  public ByteComparatorPanel() {
    setLayout(new BorderLayout());
    
    JPanel pnlTable = new JPanel(new BorderLayout());
    pnlTable.setIgnoreRepaint(true);
    for (int i = 0; i < cols.length; i ++) {
      model.addColumn(cols[i]);
    }
    //
    //tbl.set
    tbl.setPreferredScrollableViewportSize(new Dimension(PAGE_SIZE, 4));
    tbl.addMouseListener(new MouseAdapter() {
      public void mouseClicked(MouseEvent me) {
        displayInfo();
      }  
    });
    
    pnlTable.add(new JScrollPane(tbl), BorderLayout.CENTER);
    
    JPanel pnlControl = new JPanel();
    JButton btnPre25 = new JButton(" << 25");
    JButton btnPre100 = new JButton(" << 100");
    JButton btnPre500 = new JButton(" << 500");
    JButton btnNext25 = new JButton(" 25 >>");
    JButton btnNext100 = new JButton(" 100 >>");
    JButton btnNext500 = new JButton(" 500 >>");
    pnlControl.add(btnPre25);
    pnlControl.add(btnPre100);
    pnlControl.add(btnPre500);
    pnlControl.add(btnNext25);
    pnlControl.add(btnNext100);
    pnlControl.add(btnNext500);
    pnlTable.add(pnlControl, BorderLayout.SOUTH);
  
    add(pnlTable, BorderLayout.CENTER);
    txtInfo.setEditable(false);
    txtInfo.setBorder(BorderFactory.createTitledBorder("Comparator"));
    txtInfo.setPreferredSize(new Dimension(150, 100));
    add(txtInfo, BorderLayout.SOUTH);
    addRowData();
    
    btnPre25.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        int currentSelected = tbl.getSelectedRow();
        if (currentSelected - 25 > 0)  tbl.changeSelection(currentSelected - 25, 0, false, false);
        else tbl.changeSelection( 0, 0, false, false);
        displayInfo();
      }
    });
    btnPre100.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        int currentSelected = tbl.getSelectedRow();
        if (currentSelected - 100 > 0)  tbl.changeSelection(currentSelected - 100, 0, false, false);
        else tbl.changeSelection( 0, 0, false, false);
        displayInfo();
      }
    });
    btnPre500.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        int currentSelected = tbl.getSelectedRow();
        if (currentSelected - 500 > 0)  tbl.changeSelection(currentSelected -500, 0, false, false);
        else tbl.changeSelection( 0, 0, false, false);
        displayInfo();
      }
    });
    btnNext25.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        int currentSelected = tbl.getSelectedRow();
        if (currentSelected + 25 < tbl.getRowCount())  tbl.changeSelection(currentSelected + 25, 0, false, false);
        else tbl.changeSelection(tbl.getRowCount() - 1, 0, false, false);
        displayInfo();
      }
    });
    btnNext100.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        int currentSelected = tbl.getSelectedRow();
        if (currentSelected + 100 < tbl.getRowCount())  tbl.changeSelection(currentSelected + 100, 0, false, false);
        else tbl.changeSelection(tbl.getRowCount() - 1, 0, false, false);
        displayInfo();
      }
    });
    btnNext500.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        int currentSelected = tbl.getSelectedRow();
        if (currentSelected + 500 < tbl.getRowCount())  tbl.changeSelection(currentSelected + 500, 0, false, false);
        else tbl.changeSelection(tbl.getRowCount() - 1, 0, false, false);
        displayInfo();
      }
    });    
  }
  
  public void addRowData() {
    for (int  i = 1; i < 500; i ++) {
      Object[] rowData = {i, i + 1, "a", i + 2, "b"};  
      model.addRow(rowData);
    }
  }
  
  public void displayInfo() {
    int selectedrow = tbl.getSelectedRow();
    if (selectedrow < 0)  selectedrow = 0;
    if (tbl.getValueAt(selectedrow, 1).toString().trim().equals(tbl.getValueAt(selectedrow, 3).toString().trim())) {
      txtInfo.setText("Equal");
    }
    else  txtInfo.setText("Not Equal");
  }
}
