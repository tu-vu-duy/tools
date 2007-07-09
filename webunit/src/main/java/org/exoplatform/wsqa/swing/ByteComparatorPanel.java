/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JOptionPane;
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
  final static String TEXT = " What I've doneI face myselfto cross-out what I've become"
                 +"erase myselfand let go of what I've donePut to restwhat you've thought of me"
                 +"Well I clean this slatewith the hands of uncertainty[ Wtp://www.completealbumlyrics.com "
                 +"So let mercy comeand wash away[chorus]What I've doneI face ss-out what I've become" 
                 +"erase myselfand let go of what I've doneFor what I've doneI starpain may come"
                 +"today this endsIm forgiving what I've doneI face myselfto cross-out what I've become" 
                 +"erase myselfand let go of what I've doneWhat I've doneWhat I've done" 
                 +"orgiving what I've done" 
                 +"erase myselfand let go of what I've donePut to restwhat you've thought of me"
                 +"Well I clean this slatewith the hands of uncertainty[ Wtp://www.completealbumlyrics.com "
                 +"So let mercy comeand wash away[chorus]What I've doneI face ss-out what I've become" 
                 +"erase myselfand let go of what I've doneFor what I've doneI starpain may come"
                 +"today this endsIm forgiving what I've doneI face myselfto cross-out what I've become" 
                 +"erase myselfand let go of what I've doneWhat I've doneWhat I've done" 
                 +"orgiving what I've done"
                 +"erase myselfand let go of what I've donePut to restwhat you've thought of me"
                 +"Well I clean this slatewith the hands of uncertainty[ Wtp://www.completealbumlyrics.com "
                 +"So let mercy comeand wash away[chorus]What I've doneI face ss-out what I've become" 
                 +"erase myselfand let go of what I've doneFor what I've doneI starpain may come"
                 +"today this endsIm forgiving what I've doneI face myselfto cross-out what I've become" 
                 +"erase myselfand let go of what I've doneWhat I've doneWhat I've done" 
                 +"orgiving what I've done";
  
  final public int PAGE_SIZE = 1000 ;
  
  private byte[] buffer1, buffer2 ;
  private DefaultTableModel model = new DefaultTableModel();
  private String[] cols = {"id", "Code 1", "Character 1", "Code 2", "Character 2"}; 
  private final JTable tbl = new JTable(model);
  private JTextPane txtInfo = new JTextPane();
  private int currentStart = 0;
  
  public ByteComparatorPanel() {
    setLayout(new BorderLayout());
    
    buffer1 = TEXT.getBytes() ;
    buffer2 = TEXT.getBytes() ;
    System.out.println("leng: " + buffer1.length);
    
    buffer2[5] = (byte) 'c' ;
    buffer2[8] = (byte) 's' ;
    buffer2[260] = (byte) 'a';
    buffer2[355] = (byte) 'c' ;
    buffer2[821] = (byte) 's' ;
    buffer2[903] = (byte) 'a';
    
    
    JPanel pnlTable = new JPanel(new BorderLayout());
    for (int i = 0; i < cols.length; i ++) {
      model.addColumn(cols[i]);
    }
    for (int  i = 0; i < 100; i ++) {
      Object[] rowData = { i + 1, buffer1[i], "" + (char) buffer1[i], buffer2[i], "" + (char) buffer2[i]};  
      model.addRow(rowData);
    }
    displayInfo(0, 100);
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
        else currentStart = buffer1.length - 1;        
        changeViewTable(currentStart - 1000); 
      }
    });
    btnPre500.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        if (model.getRowCount() > 0) {
          currentStart = Integer.parseInt(model.getValueAt(0, 0).toString()) - 1;
        }
        else currentStart = buffer1.length - 1;
        changeViewTable(currentStart - 500);  
      }
    });
    btnPre100.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        if (model.getRowCount() > 0) {
          currentStart = Integer.parseInt(model.getValueAt(0, 0).toString()) - 1;
        }
        else currentStart = buffer1.length - 1;
        changeViewTable(currentStart - 100); 
      }
    });
    
    btnNext100.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        if (model.getRowCount() > 0) {
          currentStart = Integer.parseInt(model.getValueAt(0, 0).toString()) - 1;
          if (buffer1.length - currentStart > 100) changeViewTable(currentStart + 100);
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
          if (buffer1.length - currentStart > 500) changeViewTable(currentStart + 500);
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
          if (buffer1.length - currentStart > 1000) changeViewTable(currentStart + 1000);
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
    if (buffer1.length < start + 100)  end = buffer1.length;
    else end = start + 100;
      
    for (int  i = start; i < end; i ++) {
      Object[] rowData = { i + 1, buffer1[i], "" + (char) buffer1[i], buffer2[i], "" + (char) buffer2[i]};  
      model.addRow(rowData);
    }
    displayInfo(start, end); 
  }
  
  public void displayInfo(int start, int end) {
    System.out.println("display info");
    StringBuffer ErrorPosition = new StringBuffer("");
    int countDifference = 0;
    for (int  i = 0; i < model.getRowCount(); i ++) {
      if (!tbl.getValueAt(i, 1).toString().trim().equals(tbl.getValueAt(i, 3).toString().trim())) {
        countDifference ++;
        ErrorPosition.append("" + (start + i + 1) + ",");
      }
    }
      
    StringBuffer str = new StringBuffer("From byte " + (start + 1) + " to " + end + "\nHave " + countDifference + " error" );
    str.append("\nError positions : " + ErrorPosition.toString());
    str.deleteCharAt(str.length() - 1);
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
