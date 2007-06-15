/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class JavascriptView extends JPanel {
  public JTextArea txt;
  private JButton btn1, btn2;
  
  public JavascriptView () {
    //setLayout(new GridBagLayout());
    setLayout(new BorderLayout());
    
    txt = new JTextArea("hhhh");
    txt.setEditable(false);
    JScrollPane scroll = new JScrollPane(txt);
    scroll.setPreferredSize(new Dimension());
    add(scroll, BorderLayout.CENTER);
    
    btn1 = new JButton("show");
    btn2 = new JButton("button2");
    JPanel pnlControl = new JPanel();
    pnlControl.add(btn1);
    pnlControl.add(btn2);
    add(pnlControl, BorderLayout.SOUTH);
    
    btn1.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        txt.setText(WebUnitListView.str);
      }
    });
    btn2.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        
      }
    });
  }
}
