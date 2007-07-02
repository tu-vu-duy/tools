/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.BorderLayout;

import javax.swing.JPanel;
import javax.swing.JSplitPane;

import org.exoplatform.swing.JExoTextEditor;


/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 27, 2007  
 */
public class WebUnitDataViewPlugin extends JPanel {
  private JExoTextEditor requestData_, responseData_;
  
  public WebUnitDataViewPlugin() {    
    JPanel pnlTop = new JPanel(new BorderLayout());
    requestData_ = new JExoTextEditor();
    pnlTop.add(requestData_, BorderLayout.CENTER);
    
    JPanel pnlBottom = new JPanel(new BorderLayout());
    responseData_ = new JExoTextEditor();
    pnlBottom.add(responseData_, BorderLayout.CENTER);
    
    JSplitPane splitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT, true, pnlTop, pnlBottom);
    splitPane.setDividerSize(5);
    splitPane.setDividerLocation(200);
    
    setLayout(new BorderLayout());
    add(splitPane, BorderLayout.CENTER);
  }
  
  public void setData(String requestData, String responseData) {
    requestData_.setText(requestData) ;
    responseData_.setText(responseData) ;
  }
}
