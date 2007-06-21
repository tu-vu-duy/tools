/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.explorer;

import java.awt.CardLayout;
import java.awt.Dimension;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;

import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextPane;
import javax.swing.text.DefaultStyledDocument;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class TextEditor extends JPanel {
  private DefaultStyledDocument document_ = new DefaultStyledDocument();
  private JTextPane textPane_ = new JTextPane(document_); 
  
  public TextEditor() {
    setLayout(new CardLayout());
    JScrollPane scrollPane = new JScrollPane(textPane_);
    scrollPane.setViewportView(textPane_) ;
    add(scrollPane, "ScrollPane")  ;
  }
  
  public TextEditor(String text) {
    this() ;
    setVisible(true) ;
    textPane_.setText(text) ;
  }
  
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
  
  public void setText(String text) { textPane_.setText(text) ; }
  
}