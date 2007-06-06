/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import java.awt.GridBagLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.event.AncestorListener;
import javax.swing.event.TreeSelectionEvent;
import javax.swing.event.TreeSelectionListener;

import org.exoplatform.httpclient.recorder.ProxyServer;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class RecorderView extends JPanel {
  private ProxyServer server_ ;
  
  public RecorderView ()  {
    setLayout(new GridBagLayout());
    JButton button = new JButton("Start") ;
    button.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent event) {
        try {
          if(server_ != null) {
            System.out.println("Server is already start..........................");
            return ;
          }
          server_ = new ProxyServer() ;
          server_.start() ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    }) ;
    add(button) ;
    button = new JButton("Stop") ;
    button.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent event) {
        try {
          if(server_ == null) {
            System.out.println("Server is already stop..........................");
            return ;
          }
          server_.stopServer() ;
          server_ = null ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    }) ;
    add(button) ;
  }
}
