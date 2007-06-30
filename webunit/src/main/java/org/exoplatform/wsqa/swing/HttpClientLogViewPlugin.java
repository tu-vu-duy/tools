/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.awt.CardLayout;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.JPanel;
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
  private JTree jtree_ ; 
  private HttpClientNodeModel selectClientNode_ = null ;
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
        DefaultMutableTreeNode selectNode = (DefaultMutableTreeNode)evt.getPath().getLastPathComponent() ;
        if(selectNode instanceof HttpClientNodeModel) {
          HttpClientNodeModel selectClientNode = (HttpClientNodeModel) selectNode ;
          if(selectClientNode != selectClientNode_) {
            try {
              selectClientNode_ = selectClientNode;
              resultPanel_.update(selectClientNode_.datas_) ;
            } catch(Exception ex) {
              ex.printStackTrace() ;
            }
          }
        }
      }
    }) ;
    scrollPane.setViewportView(jtree_) ;
    splitPane.setLeftComponent(scrollPane);
    resultPanel_ = new HttpClientResultPanel() ;
    splitPane.setRightComponent(resultPanel_) ;
  }

  public String getTitle() { return "Http Client Log"; }
  
  static public HttpClientLogViewPlugin getInstance() { 
    return singleton_ ;
  }
  
  public void addData(WebUnitExecuteContext context) throws Exception {
    String clientId = context.getHttpClient().getId() ;
    String suiteName = context.getHttpClient().getSuiteName() ;
    DefaultMutableTreeNode suiteNode = httpClientResultModel_.suites_.get(suiteName) ;
    if(suiteNode == null) {
      suiteNode = new DefaultMutableTreeNode(suiteName);
      httpClientResultModel_.add(suiteNode) ;
      httpClientResultModel_.suites_.put(suiteName, suiteNode) ;
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
    
    if(clientNode == selectClientNode_) {
      resultPanel_.addData(context) ;
    } else {
      clientNode.datas_.add(context) ;
    }
  }
  
  static public class HttpClientResultModel extends DefaultMutableTreeNode {
    private Map<String, DefaultMutableTreeNode> suites_ = new HashMap<String, DefaultMutableTreeNode>() ;
    private Map<String, HttpClientNodeModel> clients_ = new HashMap<String, HttpClientNodeModel>() ;
    
    public HttpClientResultModel(String label) {
      super(label) ;
    }
  }
  
  static public class HttpClientNodeModel extends DefaultMutableTreeNode {
    List<WebUnitExecuteContext> datas_ = new ArrayList<WebUnitExecuteContext>() ;
    
    public HttpClientNodeModel(String label) {
      super(label) ;
    }
  }
}
