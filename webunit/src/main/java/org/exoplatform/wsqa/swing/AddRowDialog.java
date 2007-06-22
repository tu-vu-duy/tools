/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;



/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 14, 2007  
 */
public class AddRowDialog {
  private JTextArea txt;
  private JButton btnOk, btnCancel;
  
  public AddRowDialog() {
    
    txt = new JTextArea();
    JScrollPane scroll = new JScrollPane(txt);
    scroll.setPreferredSize(new Dimension(50, 50));
    
    JPanel pnlControl = new JPanel();
    btnOk = new JButton("Ok");
    btnCancel = new JButton("Cancel");
    pnlControl.add(btnOk);
    pnlControl.add(btnCancel);
    
    final JDialog dlg = new JDialog();
    dlg.setLayout(new BorderLayout());
    dlg.add(scroll, BorderLayout.CENTER);
    dlg.add(pnlControl, BorderLayout.SOUTH);
    dlg.setSize(300, 200);
    dlg.setVisible(true);
    
    btnOk.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        dlg.setVisible(false);
        WebUnitPopupMenu.showDialog = true;
      }
    });
    
    btnCancel.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        dlg.setVisible(false);
        WebUnitPopupMenu.showDialog = true;
      }
    });
  }
}
