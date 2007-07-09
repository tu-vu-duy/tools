/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.explorer;

import java.awt.CardLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;
import java.util.Enumeration;
import java.awt.event.*;

import javax.swing.JComponent;
import javax.swing.JInternalFrame;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTree;
import javax.swing.event.InternalFrameAdapter;
import javax.swing.event.InternalFrameListener;
import javax.swing.event.TreeSelectionEvent;
import javax.swing.event.TreeSelectionListener;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeModel;
import javax.swing.tree.TreePath;
import javax.swing.tree.TreeSelectionModel;
import javax.swing.event.*;

import org.exoplatform.swing.Application;
import org.exoplatform.swing.JExoTextEditor;
import org.exoplatform.swing.ViewPlugin;

import sun.security.action.OpenFileInputStreamAction;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class ExplorerViewPlugin extends JPanel implements ViewPlugin {
  private static DefaultTreeModel tmodel;
  private static FileNode selectFileNode;
  private static JTree jtree = null;
  private boolean menuItemXmlAdded  = false;

  public ExplorerViewPlugin() {
    setName("FileExplorer") ;
    setLayout(new CardLayout());
    JScrollPane scrollPane = new JScrollPane();
    //scrollPane.setViewportView(new FileExplorerPanel());
    add(scrollPane, "ScrollPane") ;
    jtree = new  JTree() ;
    scrollPane.setViewportView(jtree) ;

    final File root = new File("/") ;
    FileNode rootNode = new FileNode(root.getName(), root);
    File[] children = root.listFiles() ;
    for(File file :  children) {
      FileNode fnode = new FileNode(file.getName(), file) ;
      rootNode.add(fnode);
    }
    tmodel = new DefaultTreeModel(rootNode) ;
    jtree.setModel(tmodel);
    jtree.getSelectionModel().setSelectionMode(TreeSelectionModel.SINGLE_TREE_SELECTION);

    jtree.addTreeSelectionListener(new TreeSelectionListener() {
      public void valueChanged(TreeSelectionEvent evt) {
        System.out.println("==> Tree Action Listener") ;
        final JTree jtree  = (JTree)evt.getSource() ; 
        System.out.println("evt : " + evt.getPath().getLastPathComponent());
        if (evt.getPath().getLastPathComponent() == null) selectFileNode = new FileNode(root.getName(), root); 
        else selectFileNode = (FileNode)evt.getPath().getLastPathComponent() ;

        if (menuItemXmlAdded) {
          //System.out.println("removeeee");
          OptionMenu.menuOpenAs.remove(OptionMenu.menuItemXml);
        }

        if(selectFileNode.isLeaf()) {
          String filePath = selectFileNode.getFilePath() ;
          if(filePath.endsWith(".txt")) {
           
            try {
              final JInternalFrame frame = 
                Application.getInstance().getWorkspaces().openFrame(filePath, filePath) ;
              frame.addComponentListener(new ComponentAdapter() {
                public void componentHidden(ComponentEvent e) {
                 System.out.println("select file node" + selectFileNode.getParent()); 
                 if (selectFileNode.getParent() != null) jtree.setSelectionPath(new TreePath(selectFileNode.getParent())); 
                 else jtree.setSelectionPath(new TreePath("D:/"));
                }
              });
              JExoTextEditor textEditor = new JExoTextEditor() ;
              textEditor.opentFile(filePath) ;
              textEditor.setVisible(true) ;
              frame.add(textEditor) ; 
            } catch(Exception ex) {
              ex.printStackTrace() ;
            }
           
          } else if (filePath.endsWith(".xml")) {
            OptionMenu.menuOpenAs.add(OptionMenu.menuItemXml, 1);
            menuItemXmlAdded = true;
          }          
        } else {
          TreePath selectionPaths = null;
          if (jtree.getSelectionPath() != null) {
            selectionPaths = jtree.getSelectionPath()  ;

            System.out.println("Selection Path: " + selectionPaths);
            TreePath parentSelectionPaths = selectionPaths.getParentPath()  ;
            
            FileNode parentFileNode = (FileNode)selectFileNode.getParent() ;
            if ((parentFileNode != null)&&(parentSelectionPaths != null)) {
              Enumeration<FileNode> e = parentFileNode.children() ;
              while(e.hasMoreElements()) {
                FileNode fnode = e.nextElement() ;
                if(fnode != selectFileNode) {
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
        }
        jtree.repaint() ;
        System.out.println("<=== Tree Action Listener") ;
      }
    }) ;

    final JPopupMenu popup = new OptionMenu();

    jtree.addMouseListener(new MouseAdapter() {
      public void mousePressed(MouseEvent evt) {
        if (evt.getButton() == java.awt.event.MouseEvent.BUTTON3) {
          popup.show((JComponent)evt.getSource(), evt.getX(), evt.getY());
        }
      }
    });
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

  static class OptionMenu extends JPopupMenu {
    static JMenuItem menuItemAdmin, menuItemUser, menuItemText, menuItemXml, menuItemDelete, menuItemRename;
    static JMenu menuOpenAs; 

    public OptionMenu() {
      setPreferredSize(new Dimension(150, 150));
      menuItemAdmin = new JMenuItem("Admin");
      menuItemUser = new JMenuItem("User");
      menuItemText = new JMenuItem("text file    ");
      menuItemXml = new JMenuItem("xml file    ");
      menuOpenAs = new JMenu("Open as  >");

      menuOpenAs.add(menuItemText);
      menuOpenAs.add(menuItemAdmin);
      menuOpenAs.add(menuItemUser);
      add(menuOpenAs);
      addSeparator();

      menuItemDelete = new JMenuItem("Delete");
      menuItemRename = new JMenuItem("Rename");
      add(menuItemDelete);
      add(menuItemRename);
      
      menuItemText.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent ae) {
          openFileAs();
        }
      });
      
      menuItemXml.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent ae) {
          openFileAs();
        }
      });
  
      menuItemAdmin.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent ae) {
          System.out.println("Admin"); 
        }
      });
      menuItemUser.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent ae) {
          System.out.println("User"); 
        }
      });

      menuItemDelete.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent ae) {
          if ((selectFileNode != null)&&(selectFileNode.getParent() != null)) {
            System.out.println("select nodeeeee: " + selectFileNode.toString());
            int result = JOptionPane.showConfirmDialog(null, "Are you sure want to delete?", "Confirm", JOptionPane.OK_CANCEL_OPTION, JOptionPane.WARNING_MESSAGE);
            if (result == 0) {
              try {
                System.out.println("file path: " + selectFileNode.getFilePath());
                File f = new File(selectFileNode.getFilePath());

                System.out.println("exist: " + f.exists());
                if (f.isDirectory()) {
                  File[] fileList = f.listFiles();
                  if (fileList.length > 1) {
                    JOptionPane.showMessageDialog(null, "directory is not empty","error", JOptionPane.ERROR_MESSAGE);
                  } else {
                    System.out.println("delete :" + f.delete());
                    tmodel.removeNodeFromParent(selectFileNode);
                  }
                } else {
                  System.out.println("deleted :" + f.delete());
                  tmodel.removeNodeFromParent(selectFileNode);
                }
              } catch (Exception ex) {
                ex.printStackTrace();
              }

            }

          }          
        }
      });
    }
    
    public void openFileAs() {
      if(selectFileNode.isLeaf()) {
        String filePath = selectFileNode.getFilePath() ;
        try {
          final JInternalFrame frame = 
            Application.getInstance().getWorkspaces().openFrame(filePath, filePath) ;
          frame.addComponentListener(new ComponentAdapter() {
            public void componentHidden(ComponentEvent e) {
             if (selectFileNode.getParent() != null)  jtree.setSelectionPath(new TreePath(selectFileNode.getParent()));
             else jtree.setSelectionPath(new TreePath("/"));
            }
          });
          JExoTextEditor textEditor = new JExoTextEditor() ;
          textEditor.opentFile(filePath) ;
          textEditor.setVisible(true) ;
          frame.add(textEditor) ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }          
      }
    }
  }

}