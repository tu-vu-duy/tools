/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.awt.BorderLayout;

import javax.swing.JPanel;
import javax.swing.JSplitPane;


/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 27, 2007  
 */
public class JExoSplitTextEditor extends JPanel {
  private JExoTextEditor textEditor1_, textEditor2_;
  
  public JExoSplitTextEditor() {    
    JPanel pnlTop = new JPanel(new BorderLayout());
    textEditor1_ = new JExoTextEditor();
    pnlTop.add(textEditor1_, BorderLayout.CENTER);
    
    JPanel pnlBottom = new JPanel(new BorderLayout());
    textEditor2_ = new JExoTextEditor();
    pnlBottom.add(textEditor2_, BorderLayout.CENTER);
    
    JSplitPane splitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT, true, pnlTop, pnlBottom);
    splitPane.setDividerSize(5);
    splitPane.setDividerLocation(200);
    
    setLayout(new BorderLayout());
    add(splitPane, BorderLayout.CENTER);
  }
}
