/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.awt.Container;

import javax.swing.JComponent;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 20, 2007  
 */
public class SwingUtil {
  static public <T> T getAncestorOfType(JComponent component, Class<T> type) {
    Container ancestor = component.getParent() ;
    while(ancestor != null) {
      System.out.println("Check  parent : " + ancestor) ;
      if(type.isInstance(ancestor))  return (T)ancestor ;
      ancestor = ancestor.getParent() ;
    }
    return null ;
  }
}
