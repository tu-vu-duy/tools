/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.explorer;

import javax.swing.JPanel;

import org.exoplatform.swing.ViewPlugin;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class ListOpenedFileViewPlugin extends JPanel implements ViewPlugin {
  
  public ListOpenedFileViewPlugin() {
    setName("ListOpenedFiles") ;
  }

  public String getTitle() { return "Open  Files"; }
  
}