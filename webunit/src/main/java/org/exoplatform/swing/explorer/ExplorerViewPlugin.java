/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.explorer;

import java.awt.CardLayout;
import java.io.File;
import java.util.Enumeration;

import javax.swing.JInternalFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTree;
import javax.swing.event.TreeSelectionEvent;
import javax.swing.event.TreeSelectionListener;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeModel;
import javax.swing.tree.TreePath;
import javax.swing.tree.TreeSelectionModel;

import org.exoplatform.swing.Application;
import org.exoplatform.swing.ViewPlugin;
import org.exoplatform.swing.Workspaces;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class ExplorerViewPlugin extends JPanel implements ViewPlugin {
  
  public ExplorerViewPlugin() {
    setName("FileExplorer") ;
    setLayout(new CardLayout());
    JScrollPane scrollPane = new JScrollPane();
    //scrollPane.setViewportView(new FileExplorerPanel());
    add(scrollPane, "ScrollPane") ;
    JTree jtree = new  JTree() ;
    scrollPane.setViewportView(jtree) ;

    File root = new File("/") ;
    FileNode rootNode = new FileNode(root.getName(), root);
    File[] children = root.listFiles() ;
    for(File file :  children) {
      FileNode fnode = new FileNode(file.getName(), file) ;
      rootNode.add(fnode);
    }
    DefaultTreeModel tmodel = new DefaultTreeModel(rootNode) ;
    jtree.setModel(tmodel);
    jtree.getSelectionModel().setSelectionMode(TreeSelectionModel.SINGLE_TREE_SELECTION);
    
    jtree.addTreeSelectionListener(new TreeSelectionListener() {
      public void valueChanged(TreeSelectionEvent evt) {
        System.out.println("==> Tree Action Listener") ;
        JTree jtree  = (JTree)evt.getSource() ; //
        FileNode selectFileNode = (FileNode)evt.getPath().getLastPathComponent() ;
        if(selectFileNode.isLeaf()) {
          String filePath = selectFileNode.getFilePath() ;
          if(filePath.endsWith(".txt")) {
            try {
              JInternalFrame frame = 
                Application.getInstance().getWorkspaces().openFrame(filePath, filePath) ;
              TextEditor textEditor = new TextEditor() ;
              textEditor.opentFile(filePath) ;
              textEditor.setVisible(true) ;
              frame.add(textEditor) ;
            } catch(Exception ex) {
              ex.printStackTrace() ;
            }
          }
        } else {
          TreePath selectionPaths = jtree.getSelectionPath()  ;
          System.out.println("Selection Path: " + selectionPaths);
          TreePath parentSelectionPaths = selectionPaths.getParentPath()  ;
          FileNode parentFileNode = (FileNode)selectFileNode.getParent() ;
          if(parentFileNode != null) {
            Enumeration<FileNode> e = parentFileNode.children() ;
            while(e.hasMoreElements()) {
              FileNode fnode = e.nextElement() ;
              if(fnode != selectFileNode) {
                //fnode.removeAllChildren() ;
                if(!fnode.isLeaf()) {
                  jtree.collapsePath( parentSelectionPaths.pathByAddingChild(fnode));
                }
         
              }
            }
          }

          if(selectFileNode.getChildCount() <= 0) {
            File  selectFile = new File(selectFileNode.getFilePath()) ;
            File[] children = selectFile.listFiles() ;
            if(children != null) {
              for(File file :  children) {
                FileNode fnode = new FileNode(file.getName(), file) ;
                selectFileNode.add(fnode);
              }
            }
          }
        }
        jtree.repaint() ;
        System.out.println("<=== Tree Action Listener") ;
      }
    }) ;  // het treeSelectionListenner;
  }
  
  public String getTitle() { return "File Explorer"; }
  
  static class FileNode extends DefaultMutableTreeNode {
    private String filePath_ ;
    private boolean directory_ ;
    
    public FileNode(String label, File file) {
      super(label) ;
      filePath_ = file.getAbsolutePath();
      directory_ = file.isDirectory() ;
      if(directory_) setAllowsChildren(true) ;
      else  setAllowsChildren(false) ;
    }
    
    public boolean isLeaf() { return !directory_ ; }
    
    public String getFilePath() { return filePath_ ; } 
  }
}