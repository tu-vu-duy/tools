/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextPane;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jul 3, 2007  
 */
public class ByteComparatorPanel extends JPanel {
  
  final public int PAGE_SIZE = 100 ;

  private DefaultTableModel model = new DefaultTableModel();
  private String[] cols = {"id", "Byte Execute","Char Execute", "Byte Original", "Char Original"}; 
  private final JTable tbl = new JTable(model);
  private JTextPane txtInfo = new JTextPane();
  private int currentStart = 0;
  private byte[] buffer1, buffer2;
  private int shorterBuffer_ = 0;
  
  public ByteComparatorPanel(byte[] request, byte[] origReq) {
    setLayout(new BorderLayout());
    
    buffer1 = request;
    buffer2 = origReq;    
    if (buffer1.length > buffer2.length) shorterBuffer_ = buffer2.length;
    else shorterBuffer_ = buffer1.length;
    
    JPanel pnlTable = new JPanel(new BorderLayout());
    for (int i = 0; i < cols.length; i ++) {
      model.addColumn(cols[i]);
    }
    for (int  i = 0; i < PAGE_SIZE; i ++) {
      Object[] rowData = { i + 1, buffer1[i],(char) buffer1[i], buffer2[i], (char) buffer2[i]};  
      model.addRow(rowData);
    }
    displayInfo();
    tbl.setDefaultRenderer(Object.class, new ColorRenderer());     
    pnlTable.add(new JScrollPane(tbl), BorderLayout.CENTER);
    
    JPanel pnlControl = new JPanel();
    JButton btnPre1000 = new JButton("<< 1000");
    JButton btnPre100 = new JButton("<< 100");
    JButton btnPre500 = new JButton("<< 500");
    JButton btnNext1000 = new JButton(" 1000 >>");
    JButton btnNext100 = new JButton(" 100 >>");
    JButton btnNext500 = new JButton(" 500 >>");
     
    pnlControl.add(btnPre1000);
    pnlControl.add(btnPre500);
    pnlControl.add(btnPre100);
    pnlControl.add(btnNext100);
    pnlControl.add(btnNext500);
    pnlControl.add(btnNext1000);
    
    pnlTable.add(pnlControl, BorderLayout.SOUTH);
  
    add(pnlTable, BorderLayout.CENTER);
    txtInfo.setEditable(false);
    txtInfo.setBorder(BorderFactory.createTitledBorder("Comparator"));
    txtInfo.setPreferredSize(new Dimension(150, 100));
    add(txtInfo, BorderLayout.SOUTH);
    
    
    btnPre1000.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        if (model.getRowCount() > 0) {
          currentStart = Integer.parseInt(model.getValueAt(0, 0).toString()) - 1;
        }
        else currentStart = shorterBuffer_ - 1;        
        changeViewTable(currentStart - 1000); 
      }
    });
    btnPre500.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        if (model.getRowCount() > 0) {
          currentStart = Integer.parseInt(model.getValueAt(0, 0).toString()) - 1;
        }
        else currentStart = shorterBuffer_ - 1;
        changeViewTable(currentStart - 500);  
      }
    });
    btnPre100.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        if (model.getRowCount() > 0) {
          currentStart = Integer.parseInt(model.getValueAt(0, 0).toString()) - 1;
        }
        else currentStart = shorterBuffer_ - 1;
        changeViewTable(currentStart - 100); 
      }
    });
    
    btnNext100.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        if (model.getRowCount() > 0) {
          currentStart = Integer.parseInt(model.getValueAt(0, 0).toString()) - 1;
          if (shorterBuffer_ - currentStart > 100) changeViewTable(currentStart + 100);
          else {
          JOptionPane.showMessageDialog(null, "This is last view", "alert", JOptionPane.INFORMATION_MESSAGE); 
          }
        }  
      }
    });
    
    btnNext500.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        if (model.getRowCount() > 0) {
          currentStart = Integer.parseInt(model.getValueAt(0, 0).toString()) - 1;
          if (shorterBuffer_ - currentStart > 500) changeViewTable(currentStart + 500);
          else {
          JOptionPane.showMessageDialog(null, "This is last view", "alert", JOptionPane.INFORMATION_MESSAGE); 
          }
        }
      }
    });
    
    btnNext1000.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) { 
        if (model.getRowCount() > 0) {
          currentStart = Integer.parseInt(model.getValueAt(0, 0).toString()) - 1;
          if (shorterBuffer_ - currentStart > 1000) changeViewTable(currentStart + 1000);
          else {
          JOptionPane.showMessageDialog(null, "This is last view", "alert", JOptionPane.INFORMATION_MESSAGE); 
          }
        }
      }
    });
    
  }
  
  public void changeViewTable(int s) {
    for (int i = (model.getRowCount() - 1); i >= 0; i --) {
      model.removeRow(i);
    }
    int start = 0;
    if (s > 0) start = s;
    else start = 0;
    
    int end = 0;
    if (shorterBuffer_ < start + PAGE_SIZE)  end = shorterBuffer_;
    else end = start + PAGE_SIZE;
      
    for (int  i = start; i < end; i ++) {
      Object[] rowData = { i + 1, buffer1[i], (char) buffer1[i], buffer2[i], (char) buffer2[i]};  
      model.addRow(rowData);
    }
  }
  
  public void displayInfo() {
    int FirstErrorPosition = -1;
    if (buffer1.length == buffer2.length)     
      for (int  i = 0; i < shorterBuffer_; i ++)
        if (buffer1[i] != buffer2[i]) {
          FirstErrorPosition = i;
          break;
        }
    else FirstErrorPosition = shorterBuffer_;  
    
    StringBuffer str = new StringBuffer("Execute has " + buffer1.length + " bytes\nOriginal has " + buffer2.length + " bytes\n");
    if (FirstErrorPosition == -1) {
      str.append("Don't find error");
    }
    else {
      str.append("First position of byte occur error:" + FirstErrorPosition);
    }
    txtInfo.setText(str.toString());
  }
  
  class ColorRenderer extends DefaultTableCellRenderer {
    public Component getTableCellRendererComponent(JTable table, Object value,
            boolean isSelected, boolean hasFocus, int row, int column) {
      super.getTableCellRendererComponent(table, value, isSelected, hasFocus, row, column);
      if (!table.getValueAt(row, 1).toString().equals(table.getValueAt(row, 3).toString())) {
        setBackground(Color.red);
      }
      else setBackground(table.getBackground());
      if (isSelected) setBackground(table.getSelectionBackground());
      return this;
    }
  }

}
