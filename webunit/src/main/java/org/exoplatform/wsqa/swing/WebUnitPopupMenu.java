package org.exoplatform.wsqa.swing;
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
  public JMenuItem menuItemRemove;
  
  public WebUnitPopupMenu() {
  
    JMenuItem menuItemInsert = new JMenuItem("Insert Row");
    menuItemInsert.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent evt) {
        System.out.println("=============================");
      }});
    add(menuItemInsert);
    
    JMenuItem menuItemAdd = new JMenuItem("Add Row");
    menuItemAdd.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent evt) {
        System.out.println("=============================");
        if (showDialog == true) {
          new AddRowDialog();
          showDialog = false;
        }
      }});
    add(menuItemAdd);
    
    menuItemRemove = new JMenuItem("Remove Row");
    menuItemRemove.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent evt) {
        System.out.println("=============================");
       
      }});
    add(menuItemRemove);
  }
}