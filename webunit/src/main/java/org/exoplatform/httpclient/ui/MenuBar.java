/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class MenuBar extends JMenuBar{

  public MenuBar() {
    JMenu menu ;
    JMenuItem menuItem ;
    
    menu = new JMenu();
    menu.setText("File");
    menuItem = new JMenuItem() ;
    menuItem.setText("Exit");
    menu.add(menuItem);
    menuItem.addActionListener(new ActionListener() {
      @SuppressWarnings("unused")
      public void actionPerformed(ActionEvent evt) {
        System.exit(0);
      }
    });
    add(menu);
    
    menu = new JMenu();
    menu.setText("Settings");
    menuItem = new JMenuItem() ;
    menuItem.setText("Configure");
    menu.add(menuItem);
    add(menu);
  }
}
