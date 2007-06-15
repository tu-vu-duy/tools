/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import java.awt.BorderLayout;

import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import org.exoplatform.httpclient.recorder.ProxyServer;
import org.exoplatform.httpclient.recorder.RequestFilter;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class RecorderView extends JPanel {
  private ProxyServer server_ ;
  public JTextArea txt;
  public RecorderView ()  {
    JPanel pnlControl = new JPanel(new FlowLayout());
    
    JButton btnStart = new JButton("Start") ;
    pnlControl.add(btnStart) ;
    btnStart.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent event) {
        try {
          if(server_ != null) {
            System.out.println("Server is already start..........................");
            return ;
          }
          server_ = new ProxyServer() ;
          String[]  pattern = {"/portal/.*"} ;
          RequestFilter filter = new RequestFilter(pattern) ;
          WebUnitCaptor captor = new WebUnitCaptor() ;
          captor.setRequestFilter(filter) ;
          server_.add(captor) ;
          server_.start() ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    }) ;
    JButton btnStop = new JButton("Stop") ;
    pnlControl.add(btnStop) ;
    btnStop.addActionListener(new ActionListener() {
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
    });
 
    txt = new JTextArea("aaa");
    //txt.setEditable(false);
    JScrollPane scrollPane = new JScrollPane(txt);
    scrollPane.setPreferredSize(new Dimension(150, 150));
    
    setLayout(new BorderLayout());
    add(scrollPane, BorderLayout.CENTER);
    add(pnlControl, BorderLayout.SOUTH);
  }
}
