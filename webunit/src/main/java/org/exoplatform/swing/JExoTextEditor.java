/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.awt.BorderLayout;
import java.awt.Dialog;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.awt.event.MouseListener;
import java.awt.Insets;
import java.awt.event.*;
import java.awt.FileDialog;
import java.io.*;
import java.util.*;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextPane;
import javax.swing.JToolBar;
import javax.swing.filechooser.FileFilter;
import javax.swing.text.DefaultStyledDocument;
import javax.swing.filechooser.FileSystemView;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class JExoTextEditor extends JPanel {
  protected DefaultStyledDocument document_ = new DefaultStyledDocument();
  protected JTextPane textPane_ = new JTextPane(document_); 
  protected JExoToolBar toolBar_ = new JExoToolBar();
  protected JScrollPane scrollPane;
  
  public JExoTextEditor() {
    setLayout(new BorderLayout());
    
    //parent = (JFrame) this.getParent();
    
    scrollPane = new JScrollPane(textPane_);
    scrollPane.setViewportView(textPane_) ;
    
    
    JButton btnNew = new JButton("New");
    toolBar_.addButton(btnNew);
    JButton btnOpen = new JButton("Open");
    toolBar_.addButton(btnOpen);
    JButton btnSave = new JButton("Save");
    toolBar_.addButton(btnSave);    
    
    btnSave.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) { 
        saveFile();
      }
    });
    
    addComponents();
  }
  
  public void addComponents() {
    add(scrollPane, BorderLayout.CENTER)  ;
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
  
  private void saveFile() {
    JFileChooser fileChooser = new JFileChooser();    
    int returnVal = fileChooser.showSaveDialog(this);    
    if (returnVal == JFileChooser.APPROVE_OPTION) {
      File file = fileChooser.getSelectedFile();
      try {
        textPane_.write(new FileWriter(file));     
      }
      catch (IOException exp) {
        exp.printStackTrace();
      }
    }
  }
  
}