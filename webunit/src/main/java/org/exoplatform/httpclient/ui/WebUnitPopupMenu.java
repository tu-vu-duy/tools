package org.exoplatform.httpclient.ui;
/*
Java Swing, 2nd Edition
By Marc Loy, Robert Eckstein, Dave Wood, James Elliott, Brian Cole
ISBN: 0-596-00408-7
Publisher: O'Reilly 
*/
// PopupMenuExample.java
// A simple example of JPopupMenu. 
//

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.border.BevelBorder;
import javax.swing.event.PopupMenuEvent;
import javax.swing.event.PopupMenuListener;

public class WebUnitPopupMenu extends JPopupMenu {
  public WebUnitPopupMenu() {
    JMenuItem popupInsertRow = new JMenuItem("Insert Row");
    popupInsertRow.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent evt) {
        System.out.println("=============================");
      }});
    add(popupInsertRow);
  }
}