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

import javax.swing.JMenuItem;
import javax.swing.JPopupMenu;


public class WebUnitPopupMenu extends JPopupMenu {
  public static boolean showDialog = true;
  public WebUnitPopupMenu() {
  
    JMenuItem menuItem = new JMenuItem("Insert Row");
    menuItem.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent evt) {
        System.out.println("=============================");
      }});
    add(menuItem);
    
    menuItem = new JMenuItem("Add Row");
    menuItem.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent evt) {
        System.out.println("=============================");
        if (showDialog == true) {
          new AddRowDialog();
          showDialog = false;
        }
      }});
    add(menuItem);
    
    menuItem = new JMenuItem("Remove Row");
    menuItem.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent evt) {
        System.out.println("=============================");
       
      }});
    add(menuItem);
  }
}