/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.explorer;

import java.util.HashMap;
import java.util.Map;

import javax.swing.JDesktopPane;
import javax.swing.JInternalFrame;
import javax.swing.event.InternalFrameEvent;
import javax.swing.event.InternalFrameListener;

import org.exoplatform.swing.ViewPlugin;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class OpenedFileViewPlugin extends JDesktopPane implements ViewPlugin {
  private Map<String, ViewFrame> frames_ = new HashMap<String, ViewFrame>() ;
  
  public OpenedFileViewPlugin() {
    setDragMode(JDesktopPane.OUTLINE_DRAG_MODE);
    setName("OpenFiles") ;
  }
  
  public String getTitle() { return "Open Files"; }
  
  public void openFile(String filePath) throws Exception {
    ViewFrame frame = frames_.get(filePath) ;
    if(frame != null)  return ;
    frame = new ViewFrame(filePath) ;
    frame.setSize(700, 500) ;
    frame.setVisible(true);
    frame.setSelected(true);
    frame.toFront() ;
    TextEditor textEditor = new TextEditor() ;
    textEditor.opentFile(filePath) ;
    frame.add(textEditor) ;
    frame.addInternalFrameListener(new FrameEventListener()) ;
    frames_.put(filePath, frame) ;
    add(frame);
  }
  
  static class ViewFrame  extends JInternalFrame {
    public ViewFrame(String label) {
      super(label, true, true, true, true);
      setLocation(30, 30);
    }
  }
  
  static public class FrameEventListener implements InternalFrameListener {

    public void internalFrameActivated(InternalFrameEvent event) {
    }

    public void internalFrameClosed(InternalFrameEvent event) {
    }

    public void internalFrameClosing(InternalFrameEvent event) {
      System.out.println("Close Frame: " + event.getInternalFrame()) ;
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