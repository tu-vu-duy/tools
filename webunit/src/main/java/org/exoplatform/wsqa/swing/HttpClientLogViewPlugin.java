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
import javax.swing.tree.DefaultMutableTreeNode;

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
  
  private Map<String, HttpClientResult>  results_ = new HashMap<String, HttpClientResult>() ;
  
  private HttpClientLogViewPlugin() {
    setName(NAME) ;
    setLayout(new CardLayout());
    JSplitPane splitPane = new JSplitPane();
    splitPane.setDividerSize(5);
    splitPane.setDividerLocation(250);
    add(splitPane, "ScrollPane") ;
    
    JScrollPane scrollPane = new JScrollPane();
    JTree jtree = new  JTree() ;
    scrollPane.setViewportView(jtree) ;
    splitPane.setLeftComponent(scrollPane);
    
    HttpClientResultPanel resultPanel = new HttpClientResultPanel() ;
    splitPane.setRightComponent(resultPanel) ;
  }

  public String getTitle() { return "Http Client Log"; }
  
  static public HttpClientLogViewPlugin getInstance() { 
    return singleton_ ;
  }
  
  public void addData(WebUnitExecuteContext context) {
    String id = context.getHttpClient().getId() ;
    HttpClientResult  clientResult = results_.get(id) ;
    if(clientResult == null) {
      synchronized(results_) {
        clientResult = new HttpClientResult(id) ;
        results_.put(id, clientResult)  ;
      }
    }
  }
  
  static public class SuiteNode extends DefaultMutableTreeNode {
    private List<WebUnitExecuteContext> runDatas_ = new ArrayList<WebUnitExecuteContext>() ;
    
    public SuiteNode(String label) {
      super(label) ;
    }
  }
  
  static public class HttpClientResult extends DefaultMutableTreeNode {
    private List<WebUnitExecuteContext> runDatas_ = new ArrayList<WebUnitExecuteContext>() ;
    
    public HttpClientResult(String label) {
      super(label) ;
    }
  }
  
}
