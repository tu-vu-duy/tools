/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.server.tomcat;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.GridLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.border.TitledBorder;

import org.exoplatform.swing.ViewPlugin;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 27, 2007  
 */
public class TomcatInfoPlugin extends JPanel implements ViewPlugin {

  public TomcatInfoPlugin() {
    setName("TomcatPlugin");    
    setLayout(new GridLayout(4, 1));

    JTextField tomcatLocationTxt = new JTextField("D:/java/exo-working/exo-tomcat");
    TitledBorder locateBorder = BorderFactory.createTitledBorder("Tomcat Location");
    tomcatLocationTxt.setBorder(locateBorder);
    add(tomcatLocationTxt) ;
    
    JTextPane txtSysPro = new JTextPane();
    txtSysPro.setText("System Pro");
    JScrollPane scroll = new JScrollPane(txtSysPro);
    scroll.setPreferredSize(new Dimension(50, 150));    
    scroll.setBorder(BorderFactory.createTitledBorder("System Properties"));
    add(scroll) ;
    
    add(new JVMMonitor());    

    JPanel pnlControl = new JPanel();
    JButton  btnStart = new JButton("Start");
    btnStart.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        
      }
    });   
    pnlControl.add(btnStart);
    JButton  btnStop = new JButton("Stop");
    pnlControl.add(btnStop);
    add(pnlControl) ;
    updateUI(); 
  }
  
  public String getTitle() { return "Tomcat"; }

}
