/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import javax.swing.JTree;
import javax.swing.event.TreeSelectionEvent;
import javax.swing.event.TreeSelectionListener;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.TreeNode;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class ControllerView extends JTree {
  public ControllerView() {
    super(createTree()) ;
    addTreeSelectionListener(new TreeSelectionListener() {
      public void valueChanged(TreeSelectionEvent evt) {
        System.out.println(evt.getPath().toString());
      }
    });
  }
  
  static TreeNode createTree() {
    DefaultMutableTreeNode suites = new DefaultMutableTreeNode("Available Suites");
    suites.add(new DefaultMutableTreeNode("Suite 1"));
    suites.add(new DefaultMutableTreeNode("Suite 2"));
    return suites;
  }
}
