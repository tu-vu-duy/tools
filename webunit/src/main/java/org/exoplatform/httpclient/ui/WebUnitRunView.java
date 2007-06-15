/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class WebUnitRunView extends JPanel {
  private JButton btn;
  public WebUnitRunView () {
    setLayout(new BorderLayout());
    JScrollPane scrollPane = new JScrollPane();
    add(scrollPane, BorderLayout.CENTER);
    JTable table = new JTable();
    table.setModel(new DefaultTableModel(
    new Object[][] {
        { "data 1", "data 2" },
        { "data 1", "data 3" },
        { "data 5", "data 6" },
        { "data 8", "data 9" }
    },
    new String[] { "Name", "Description" }

    ));
    table.addMouseListener(new MouseAdapter() {
      public void mouseClicked(MouseEvent evt) {
        JTable tbl = (JTable) evt.getSource();
        System.out.println("selected row " + tbl.getSelectedRow());
      }
    });
    scrollPane.setViewportView(table);
    
    btn = new JButton("button1");
    JPanel pnlControl = new JPanel();
    pnlControl.add(btn);
    add(pnlControl, BorderLayout.SOUTH);
    
    btn.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        
      }
    });
  }
}