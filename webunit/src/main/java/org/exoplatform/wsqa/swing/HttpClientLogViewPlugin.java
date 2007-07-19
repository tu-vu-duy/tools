/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.CardLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.JComponent;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTree;
import javax.swing.event.TreeSelectionEvent;
import javax.swing.event.TreeSelectionListener;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeModel;

import org.exoplatform.swing.ViewPlugin;
import org.exoplatform.wsqa.httpclient.WebUnitExecuteContext;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 25, 2007  
 */
public class HttpClientLogViewPlugin extends JPanel implements ViewPlugin {
  final static public String NAME = "HttpClientLogViewPlugin" ;
  private static HttpClientLogViewPlugin  singleton_ =  new HttpClientLogViewPlugin() ;

  private HttpClientResultModel httpClientResultModel_ ;
  private static JTree jtree_ ; 
  private DefaultMutableTreeNode selectNode_ = null ;
  private HttpClientResultPanel resultPanel_ ;
  
  private HttpClientLogViewPlugin() {
    setName(NAME) ;
    setLayout(new CardLayout());
    JSplitPane splitPane = new JSplitPane();
    splitPane.setDividerSize(5);
    splitPane.setDividerLocation(250);
    add(splitPane, "ScrollPane") ;
    
    JScrollPane scrollPane = new JScrollPane();
    httpClientResultModel_ = new HttpClientResultModel("Suites") ;
    jtree_ = new  JTree(httpClientResultModel_) ;
    jtree_.addTreeSelectionListener(new TreeSelectionListener() {
      public void valueChanged(TreeSelectionEvent evt) {
        selectNode_ = (DefaultMutableTreeNode)evt.getPath().getLastPathComponent() ;
        setSelectNode(selectNode_) ;
      }
    }) ;
   
    final HttpClientNodePopupMenu popup = new HttpClientNodePopupMenu(); 
    jtree_.addMouseListener(new MouseAdapter() {
      public void mousePressed(MouseEvent evt) {
        if (evt.getButton() == MouseEvent.BUTTON3) {
          popup.show((JComponent)evt.getSource(), evt.getX(), evt.getY());
          jtree_.updateUI();
        }
      }
    });
    
    
    scrollPane.setViewportView(jtree_) ;
    splitPane.setLeftComponent(scrollPane);
    resultPanel_ = new HttpClientResultPanel() ;
    splitPane.setRightComponent(resultPanel_) ;
  }
  
  public String getTitle() { return "Http Client Log"; }
  
  static public HttpClientLogViewPlugin getInstance() { return singleton_ ; }
  
  public void setSelectNode(DefaultMutableTreeNode  selectNode) {
    selectNode_ = selectNode ;
    try {
      if(selectNode != null && selectNode instanceof HttpClientNodeModel) {
        HttpClientNodeModel selectClientNode = (HttpClientNodeModel) selectNode;
        resultPanel_.updateData(selectClientNode.datas_) ;
      } else {
        resultPanel_.updateData(null) ;
      }
    } catch(Exception ex) {
      ex.printStackTrace() ;
    }
  }

  public void addData(WebUnitExecuteContext context) throws Exception {
    String clientId = context.getHttpClient().getId() ;
    String suiteName = context.getHttpClient().getSuiteName() ;
    DefaultMutableTreeNode suiteNode = httpClientResultModel_.suites_.get(suiteName) ;
    if(suiteNode == null) {
      suiteNode = httpClientResultModel_.addSuite(suiteName) ;
      DefaultTreeModel model = (DefaultTreeModel) jtree_.getModel();
      model.nodeStructureChanged(httpClientResultModel_) ;
    }
    HttpClientNodeModel clientNode = httpClientResultModel_.clients_.get(clientId) ;
    if(clientNode == null) {
      clientNode = new HttpClientNodeModel(clientId);
      suiteNode.add(clientNode) ;
      httpClientResultModel_.clients_.put(clientId, clientNode) ;
      DefaultTreeModel model = (DefaultTreeModel) jtree_.getModel();
      model.nodeStructureChanged(suiteNode) ;
    }
    
    if(clientNode == selectNode_) {
      resultPanel_.addData(context) ;
    } else {
      clientNode.datas_.add(context) ;
    }
  }
  
  class HttpClientNodePopupMenu extends JPopupMenu {
    public HttpClientNodePopupMenu() {
      JMenuItem menuItemDelete = new JMenuItem("Delete");
      menuItemDelete.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent event) {
          final String MESSAGE = "Are you sure want to delete?" ;
          int result = JOptionPane.showConfirmDialog(null, MESSAGE, "Confirm", JOptionPane.OK_CANCEL_OPTION, JOptionPane.WARNING_MESSAGE);
          if (result == 0) {
            httpClientResultModel_.removeNode(selectNode_) ;
            setSelectNode(null) ;
            jtree_.setSelectionRow(0);
            DefaultTreeModel model = (DefaultTreeModel) jtree_.getModel();
            model.nodeStructureChanged(httpClientResultModel_) ;
          }
        }
      });
      add(menuItemDelete);
    }
  }
  
  static public class HttpClientResultModel extends DefaultMutableTreeNode {
    private Map<String, DefaultMutableTreeNode> suites_ = new HashMap<String, DefaultMutableTreeNode>() ;
    private Map<String, HttpClientNodeModel> clients_ = new HashMap<String, HttpClientNodeModel>() ;
    
    public HttpClientResultModel(String label) {
      super(label) ;
    }
    
    public DefaultMutableTreeNode addSuite(String suiteName) {
      DefaultMutableTreeNode suiteNode = new DefaultMutableTreeNode(suiteName) ;
      add(suiteNode) ;
      suites_.put(suiteName, suiteNode) ;
      return suiteNode ;
    }
    
    public void removeNode(DefaultMutableTreeNode node) {
      if(node == null)  return ;
      if(node instanceof HttpClientNodeModel) {
        DefaultMutableTreeNode suiteNode = (DefaultMutableTreeNode)node.getParent() ;
        suiteNode.remove(node) ;
      } else {
        String suiteName = (String)node.getUserObject() ;
        DefaultMutableTreeNode suiteNode = suites_.remove(suiteName) ;
        int childrenSize = suiteNode.getChildCount() ;
        for(int i = 0; i < childrenSize; i++) {
          HttpClientNodeModel child = (HttpClientNodeModel)suiteNode.getChildAt(i) ;
          String id =  (String)child.getUserObject() ;
          clients_.remove(id) ;
        }
        this.remove(suiteNode) ;
      }
    }
  }
  
  static public class HttpClientNodeModel extends DefaultMutableTreeNode {
    List<WebUnitExecuteContext> datas_ = new ArrayList<WebUnitExecuteContext>() ;
    
    public HttpClientNodeModel(String label) {
      super(label) ;
    }
  }
}
