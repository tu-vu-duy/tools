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
import java.awt.event.*;
import java.awt.*;
import java.util.Map;


import javax.swing.*;
import javax.swing.border.*;
import javax.swing.plaf.basic.BasicInternalFrameUI;
import javax.swing.text.ViewFactory;

import org.exoplatform.swing.Application;
import org.exoplatform.swing.ViewPlugin;
import org.exoplatform.swing.Workspaces;
import org.exoplatform.swing.Workspaces.ViewFrame;
//import org.exoplatform.swing.explorer.OpenedFileViewPlugin.ViewFrame;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class ListOpenedFileViewPlugin extends JPanel implements ViewPlugin {
  
  
  public ListOpenedFileViewPlugin() {
    setLayout(new BorderLayout());
    setName("ListOpenedFiles") ;
    setPreferredSize(new Dimension(200, 500));
    setMinimumSize(new Dimension(200, 400));
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
    JButton btnWSQA = new SmallButton(actionWSQA);
    JButton btnLog = new SmallButton(actionLog);
    JButton btnText = new SmallButton(actionText);
    
    btnWSQA.setHorizontalAlignment(SwingConstants.LEFT);
    btnLog.setHorizontalAlignment(SwingConstants.LEFT);
    btnText.setHorizontalAlignment(SwingConstants.LEFT);
    
    JPanel pnlTop = new JPanel(new GridLayout(4, 1));
    pnlTop.add(btnWSQA);
    pnlTop.add(btnLog);
    pnlTop.add(btnText);
    add(pnlTop, BorderLayout.PAGE_START);
   
    JPanel pnlDown = new JPanel();
    final JButton btnShowHide = new JButton("Hide All");
    JButton btnCascade = new JButton("Cascade");
    pnlDown.add(btnShowHide);
    pnlDown.add(btnCascade);
    add(pnlDown, BorderLayout.SOUTH);
    
    btnShowHide.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        Workspaces workspaces = Application.getInstance().getWorkspaces() ;
        Map<String, Workspaces.ViewFrame> frames = workspaces.getOpenFrames() ;
        Object[] objFrames = frames.values().toArray(); 
        ViewFrame[] viewFrames = new ViewFrame[objFrames.length];
        for (int i = 0; i < objFrames.length; i ++) {
          viewFrames[i] = (ViewFrame)objFrames[i];
        }
        
        if (btnShowHide.getText().equalsIgnoreCase("Hide All")) {
          for (int i = 0; i < objFrames.length; i ++) {
            try {
              minimizeFrame(viewFrames[i]);
            }
            catch (Exception ex) {
              ex.printStackTrace();
            }
          }
          btnShowHide.setText("Show All");
        }
        else {
          for (int i = 0; i < objFrames.length; i ++) {
            try {
              maximizeFrame(viewFrames[i]);
            }
            catch (Exception ex) {
              ex.printStackTrace();
            }
          }
          btnShowHide.setText("Hide All");
        }
      }
    });
    
    btnCascade.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        Workspaces workspaces = Application.getInstance().getWorkspaces() ;
        Map<String, Workspaces.ViewFrame> frames = workspaces.getOpenFrames() ;
        Object[] objFrames = frames.values().toArray(); 
        ViewFrame[] viewFrames = new ViewFrame[objFrames.length]; ;
        for (int i = 0; i < objFrames.length; i ++) {
          viewFrames[i] = (ViewFrame)objFrames[i];
          viewFrames[i].setLocation(15 *i, 20*i);
          viewFrames[i].toFront();
        }
      }
    });
  }
  
  public void minimizeFrame(JInternalFrame frame) throws Exception {
    frame.setIcon(true);
  }
  
  public void maximizeFrame(JInternalFrame frame) throws Exception {
    //JDesktopPane pane = new JDesktopPane();
    //pane.getDesktopManager().maximizeFrame(frame);
    frame.setVisible(true);
    frame.setIcon(false);
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