/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.awt.BorderLayout;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.awt.event.MouseListener;
import java.awt.Insets;
import java.awt.event.MouseEvent;
import java.awt.event.*;

import javax.swing.ImageIcon;
import javax.swing.Icon;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextPane;
import javax.swing.JToolBar;
import javax.swing.text.DefaultStyledDocument;
import javax.swing.AbstractAction;
import javax.swing.border.Border;
import javax.swing.border.BevelBorder;
import javax.swing.border.EmptyBorder;
import javax.swing.Action;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class JExoTextEditor extends JPanel {
  private DefaultStyledDocument document_ = new DefaultStyledDocument();
  private JTextPane textPane_ = new JTextPane(document_); 
  private JExoToolBar toolBar_ = new JExoToolBar();
  
  public JExoTextEditor() {
    setLayout(new BorderLayout());
    
    JScrollPane scrollPane = new JScrollPane(textPane_);
    scrollPane.setViewportView(textPane_) ;
    add(scrollPane, BorderLayout.CENTER)  ;
    
    JButton bNew = new JButton("New");
    toolBar_.addButton(bNew);
    JButton bOpen = new JButton("Open");
    toolBar_.addButton(bOpen);
    JButton bSave = new JButton("Save");
    toolBar_.addButton(bSave);    
    
    add(toolBar_, BorderLayout.NORTH);
  }
  
  public JExoTextEditor(String text) {
    this() ;
    setVisible(true) ;
    textPane_.setText(text) ;
  }
  
  public JExoToolBar getToobar() { return toolBar_ ; }
  
  public void opentFile(String filePath) throws Exception {
    FileInputStream is = new FileInputStream(filePath) ;
    ByteArrayOutputStream os = new ByteArrayOutputStream() ;
    byte[] buf = new byte[4092] ;
    while(true) {
      int read = is.read(buf) ;
      if(read < 0)  break ;
      os.write(buf, 0, read) ;
    }
    textPane_.setText(new String(os.toByteArray())) ;
  }
  
  public String getText() { return textPane_.getText() ; }
  
  public void setText(String text) { textPane_.setText(text) ; }
}