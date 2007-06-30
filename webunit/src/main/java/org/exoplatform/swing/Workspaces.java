/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.util.HashMap;
import java.util.Map;

import javax.swing.JDesktopPane;
import javax.swing.JInternalFrame;
import javax.swing.event.InternalFrameEvent;
import javax.swing.event.InternalFrameListener;

import org.exoplatform.swing.explorer.ListOpenedFileViewPlugin;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class Workspaces extends JDesktopPane {
  private Map<String, ViewFrame> openFrames_ = new HashMap<String,ViewFrame>();
  public static ViewFrame frame;
  
  public Workspaces() {
    setDragMode(JDesktopPane.OUTLINE_DRAG_MODE);
    setName("Workspaces") ;
  }
  
  public void closeFrame(JInternalFrame frame) throws Exception {
    openFrames_.remove(frame) ;
  }
  
  public JInternalFrame openFrame(String id, String label) throws Exception {
    frame = new ViewFrame(label) ;
    
    //
    //ListOpenedFileViewPlugin().addButton(label);
    
    frame.setSize(700, 500) ;
    frame.setLocation(15 * openFrames_.size(), 20 * openFrames_.size());
    frame.setVisible(true) ;
    frame.setSelected(true) ;   
    frame.addInternalFrameListener(new FrameEventListener()) ;
    add(frame);
    openFrames_.put(id, frame) ;
    frame.toFront() ;
    return frame ;
  }
  
  public JInternalFrame getFrame(String id) {
    return openFrames_.get(id) ;
  }
  
  public Map<String, ViewFrame> getOpenFrames() { return openFrames_ ; }
  
  static class ViewFrame  extends JInternalFrame {
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
    }

    public void internalFrameOpened(InternalFrameEvent event) {
    }
  }
}