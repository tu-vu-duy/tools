/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.explorer;

import java.awt.BorderLayout;
import java.awt.CardLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.*;
import java.awt.*;


import javax.swing.BoxLayout;
import javax.swing.*;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.border.*;

import org.exoplatform.swing.ViewPlugin;
import org.exoplatform.swing.Workspaces;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class ListOpenedFileViewPlugin extends JPanel implements ViewPlugin {
  JButton btnWSQA, btnLog, btnText, btnShowHide, btn1, btn2;
  
  public ListOpenedFileViewPlugin() {
    setLayout(new BorderLayout());
    setName("ListOpenedFiles") ;
    setPreferredSize(new Dimension(200, 500));
    
    Action actionWSQA = new AbstractAction("WSQA") {
      public void actionPerformed(ActionEvent ae) {
        System.out.println("a");
      }
    };
    
    Action actionLog = new AbstractAction("Log") {
      public void actionPerformed(ActionEvent ae) {
        System.out.println("a");
      }
    };
    
    Action actionText = new AbstractAction("Text") {
      public void actionPerformed(ActionEvent ae) {
        System.out.println("a");
      }
    };
    btnWSQA = new SmallButton(actionWSQA);
    btnLog = new SmallButton(actionLog);
    btnText = new SmallButton(actionText);
    
    JPanel pnlTop = new JPanel(new GridLayout(4, 1));
    pnlTop.add(btnWSQA);
    pnlTop.add(btnLog);
    pnlTop.add(btnText);
    //pnlTop.add(new JButton("addddddddddd"));
    add(pnlTop, BorderLayout.PAGE_START);
   
    JPanel pnlDown = new JPanel();
    btnShowHide = new JButton("Hide");
    btn1 = new JButton("Cascade");
    btn2 = new JButton("Min");
    pnlDown.add(btnShowHide);
    pnlDown.add(btn1);
    pnlDown.add(btn2);
    add(pnlDown, BorderLayout.SOUTH);
    
    btnText.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        
      }
    });
  }
  
  public String getTitle() { return "Open  Files"; }
  
  
  class SmallButton extends JButton implements MouseListener {
    protected Border m_inactive = new EmptyBorder(3, 3, 3, 3);
    protected Border m_border = m_inactive;
    protected Border m_lowered = new SoftBevelBorder(BevelBorder.LOWERED);
    protected Border m_raised = new SoftBevelBorder(BevelBorder.RAISED);
    protected Insets m_ins = new Insets(4, 4, 4, 4);
  
    public SmallButton() {
      super();
      setBorder(m_inactive);
      setMargin(m_ins);
      setRequestFocusEnabled(false);
      addMouseListener(this);
    }
  
    public SmallButton(Action act) {
      this();
      setAction(act);
      setRequestFocusEnabled(false);
  
      //      addActionListener(act);
      addMouseListener(this);
    }
    
    public float getAlignmentY() {
      return 0.5f;
    }

    public Border getBorder() {
      return m_border;
    }
  
    public Insets getInsets() {
      return m_ins;
    }

    public void mouseClicked(MouseEvent e) {
    }

    public void mouseEntered(MouseEvent e) {
      if (isEnabled()) {
        m_border = m_raised;
        setBorder(m_raised);
      }
    }
  
    public void mouseExited(MouseEvent e) {
      m_border = m_inactive;
      setBorder(m_inactive);
    }

    public void mousePressed(MouseEvent e) {
      m_border = m_lowered;
      setBorder(m_lowered);
    }
  
    public void mouseReleased(MouseEvent e) {
      m_border = m_inactive;
      setBorder(m_inactive);
    }
  }

}