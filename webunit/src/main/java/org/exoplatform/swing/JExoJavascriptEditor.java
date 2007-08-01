/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.HashMap;
import java.util.Map;

import javax.swing.JButton;

import org.exoplatform.javascript.JSEngine;
import org.exoplatform.swing.event.EventManager;
import org.exoplatform.swing.log.LogPlugin;
import org.mozilla.javascript.Script;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 25, 2007  
 */
public class JExoJavascriptEditor extends JExoTextEditor {
  public JExoJavascriptEditor() throws Exception {
    JExoToolBar toolbar = getToobar() ;
    toolbar.addSeparator();
    JButton button = new JButton("exec");
    button.addActionListener(new ExecutecScriptListener()) ;
    toolbar.addButton(button);
  }
  
  public class ExecutecScriptListener implements ActionListener {
    public void actionPerformed(ActionEvent event) {
      try {
        Map<String, Object> variables = new HashMap<String, Object>() ;
        variables.put("console", new Console()) ;
        JavascriptRunner runner = new JavascriptRunner("Script", getText(), variables) ;
        runner.start() ;
      } catch(Exception ex) {
        
        ex.printStackTrace() ;
      }
    }
  }
  
  static public class Console {
    public void print(String message) throws Exception {
      EventManager.getInstance().broadcast(LogPlugin.INFO_EVENT_NAME, null, message);
    }
    
    public void println(String message) throws Exception {
      EventManager.getInstance().broadcast(LogPlugin.INFO_EVENT_NAME, null, message);
    }
  }
  
  public class JavascriptRunner extends Thread {
    private String id_ ;
    private String script_ ;
    private Map<String, Object> variables_ ;
    
    public JavascriptRunner(String id, String script, Map<String, Object> variables) throws Exception {
      id_ = id ;
      script_ = script ;
      variables_ = variables ;
    }

    public void run() {
      try {
        JSEngine engine = new JSEngine() ;
        Script sobject = engine.compileScript(id_, script_) ;
        engine.execute(sobject, variables_) ;
      } catch(Exception ex) {
        ex.printStackTrace() ;
      }
    }
  }
}