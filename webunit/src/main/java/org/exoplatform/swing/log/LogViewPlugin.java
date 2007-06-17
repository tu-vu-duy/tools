/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.log;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

import org.exoplatform.swing.ViewPlugin;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class LogViewPlugin extends JPanel implements  ViewPlugin {
  final static public String NAME = "LogViewPlugin" ;
  
  public JTextArea txt;
  private JButton clearBtn_;
  
  public LogViewPlugin() {
    setLayout(new BorderLayout());
    
    txt = new JTextArea("Log Data");
    txt.setEditable(false);
    JScrollPane scroll = new JScrollPane(txt);
    scroll.setPreferredSize(new Dimension());
    add(scroll, BorderLayout.CENTER);
    
    clearBtn_ = new JButton("Clear");
    JPanel pnlControl = new JPanel();
    pnlControl.add(clearBtn_);
    add(pnlControl, BorderLayout.SOUTH);
    
    clearBtn_.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
      }
    });
  }
  
  public String getName() { return NAME ;} ;
  public String getTitle() { return "Log" ; }
}