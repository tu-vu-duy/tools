/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import java.awt.CardLayout;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTabbedPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class WebUnitListView extends JPanel {
  public WebUnitListView () {
    setLayout(new CardLayout());
    JScrollPane scrollPane = new JScrollPane();
    add(scrollPane, "WebUnitListViewScroller");
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
  }
}
