/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.awt.Insets;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JToolBar;
import javax.swing.border.BevelBorder;
import javax.swing.border.Border;
import javax.swing.border.EmptyBorder;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 25, 2007  
 */
public class JExoToolBar extends JToolBar {
  static final Border raisedBorder_ =  new BevelBorder(BevelBorder.RAISED) ;
  static final Border loweredBorder_ = new BevelBorder(BevelBorder.LOWERED);
  static final Border inactiveBorder_= new EmptyBorder(2, 2, 2, 2) ;
  
  public void addButton(JButton component) {
    component.setBorder(inactiveBorder_);
    component.setMargin(new Insets(1, 1, 1, 1));
    component.addMouseListener(new ToolBarMouseListener());
    setRequestFocusEnabled(false);
    super.add(component) ;
  }
  
  static public class ToolBarMouseListener implements MouseListener {
    
    public void mousePressed(MouseEvent e) {
      JComponent jcomponent = (JComponent)e.getSource() ;
      jcomponent.setBorder(loweredBorder_);
    }

    public void mouseReleased(MouseEvent e) {
      JComponent jcomponent = (JComponent)e.getSource() ;
      jcomponent.setBorder(inactiveBorder_);
    }

    public void mouseClicked(MouseEvent e) {
    }

    public void mouseEntered(MouseEvent e) {
      JComponent jcomponent = (JComponent)e.getSource() ;
      jcomponent.setBorder(raisedBorder_);
    }

    public void mouseExited(MouseEvent e) {
      JComponent jcomponent = (JComponent)e.getSource() ;
      jcomponent.setBorder(inactiveBorder_);
    }
  }
}
