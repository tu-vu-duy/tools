/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentListener;
import java.awt.event.ContainerAdapter;
import java.util.HashMap;
import java.util.Map;
import java.awt.event.ComponentEvent;


import javax.swing.DefaultDesktopManager;
import javax.swing.JDesktopPane;
import javax.swing.JInternalFrame;
import javax.swing.event.InternalFrameAdapter;
import javax.swing.event.InternalFrameEvent;
import javax.swing.event.InternalFrameListener;
import javax.swing.plaf.InternalFrameUI;
import javax.swing.tree.TreePath;

import org.exoplatform.swing.event.EventManager;
import org.exoplatform.swing.explorer.ExplorerViewPlugin;
import org.exoplatform.swing.log.LogPlugin;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class Workspaces extends JDesktopPane {
  final static public String OPEN_FRAME_EVENT =  "app.event.open-frame" ;
  final static public String CLOSE_FRAME_EVENT = "app.event.close-frame" ;
  
  private static Map<String, ViewFrame> openFrames_ = new HashMap<String,ViewFrame>();
  public static ViewFrame frame;

  
  
  public Workspaces() {
    setDragMode(JDesktopPane.OUTLINE_DRAG_MODE);
    setName("Workspaces") ;

  }
  
  public void closeFrame(JInternalFrame frame) throws Exception {
    openFrames_.remove(Integer.toString(frame.hashCode())) ;
    EventManager.getInstance().broadcast(CLOSE_FRAME_EVENT, this, frame);
  }
  
  public JInternalFrame openFrame(String label) throws Exception {
    frame = new ViewFrame(label) ;
    frame.setSize(700, 500) ;
    frame.setLocation(15 * openFrames_.size(), 15 * openFrames_.size());
    frame.setVisible(true) ;
    frame.setSelected(true) ;   
    frame.addInternalFrameListener(new FrameEventListener()) ;
    add(frame);
    openFrames_.put(Integer.toString(frame.hashCode()), frame) ;
    frame.toFront() ;
    System.out.println("frame:" + frame.getTitle());
    EventManager.getInstance().broadcast(OPEN_FRAME_EVENT, this, frame);
    return frame ;
  }
  
  public JInternalFrame getFrame(String id) {
    return openFrames_.get(id) ;
  }
  
  public Map<String, ViewFrame> getOpenFrames() { return openFrames_ ; }
  
  static public class ViewFrame  extends JInternalFrame {
    public ViewFrame(String label) {
      super(label, true, true, true, true) ;
    }
  }
  
  static public class FrameEventListener implements InternalFrameListener {

    public void internalFrameActivated(InternalFrameEvent event) {
    }

    public void internalFrameClosed(InternalFrameEvent event) {
    }

    public void internalFrameClosing(InternalFrameEvent event) {
      Workspaces workspaces = Application.getInstance().getWorkspaces() ;
      JInternalFrame frame = (JInternalFrame)event.getSource() ;
      try { 
        workspaces.closeFrame(frame) ;
      } catch(Exception ex) {
        ex.printStackTrace() ;
      }
    }

    public void internalFrameDeactivated(InternalFrameEvent event) {
    }

    public void internalFrameDeiconified(InternalFrameEvent event) {
    }

    public void internalFrameIconified(InternalFrameEvent event) {     
    
      event.getInternalFrame().hide();
    }

    public void internalFrameOpened(InternalFrameEvent event) {
    }
  }
}