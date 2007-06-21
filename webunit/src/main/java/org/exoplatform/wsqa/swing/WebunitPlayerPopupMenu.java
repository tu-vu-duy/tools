package org.exoplatform.wsqa.swing;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JInternalFrame;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.JPopupMenu;

import org.exoplatform.swing.Application;
import org.exoplatform.swing.explorer.TextEditor;
import org.exoplatform.wsqa.webunit.WebUnitExecuteContext;

public class WebunitPlayerPopupMenu extends JPopupMenu {
  private WebunitPlayerViewPlugin player_ ;
  
  public WebunitPlayerPopupMenu(WebunitPlayerViewPlugin player) {
    player_  = player ;
    JMenuItem menuItem = new JMenuItem("Remove");
    menuItem.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent evt) {
        System.out.println("--> Remove , source : " + evt.getSource());
      }});
    add(menuItem);

    add(createRequestMenu());
    add(createReponseMenu());
  }

  private JMenu createRequestMenu() {
    JMenu reqMenu = new JMenu("Request");
    JMenuItem menuItem = new JMenuItem("View Request Header");
    menuItem.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent evt) {
        System.out.println("View Response");
        try {
          WebUnitExecuteContext rundata = player_.getSelectedRunData() ;
          String text = rundata.getRequest().getHeaders().toString() ;
          JInternalFrame frame = 
            Application.getInstance().getWorkspaces().openFrame("HttpRequestHeader", "Http Request Header") ;
          frame.add(new TextEditor(text)) ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    });
    reqMenu.add(menuItem);
    
    menuItem = new JMenuItem("View Request Body");
    menuItem.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent evt) {
        System.out.println("View Response");
        try {
          WebUnitExecuteContext rundata = player_.getSelectedRunData() ;
          String text = "NOT AVAILABLE";
          JInternalFrame frame = 
            Application.getInstance().getWorkspaces().openFrame("HttpRequestBody", "Http Request Body") ;
          frame.add(new TextEditor(text)) ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    });
    reqMenu.add(menuItem);
    return reqMenu ;
  }
  
  private JMenu createReponseMenu() {
    JMenu resMenu = new JMenu("Response");
    JMenuItem menuItem = new JMenuItem("View Response Header");
    menuItem.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent evt) {
        System.out.println("View Response");
        try {
          WebUnitExecuteContext rundata = player_.getSelectedRunData() ;
          String text = rundata.getResponse().getHeaders().toString() ;
          JInternalFrame frame = 
            Application.getInstance().getWorkspaces().openFrame("HttpResponse", "Http Response") ;
          frame.add(new TextEditor(text)) ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    });
    resMenu.add(menuItem);
    
    menuItem = new JMenuItem("View Response Data");
    menuItem.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent evt) {
        System.out.println("View Response");
        try {
          WebUnitExecuteContext rundata = player_.getSelectedRunData() ;
          String responseText = new String(rundata.getResponse().getResponseBody().toByteArray()) ;
          JInternalFrame frame = 
            Application.getInstance().getWorkspaces().openFrame("HttpResponse", "Http Response") ;
          frame.add(new TextEditor(responseText)) ;
        } catch(Exception ex) {
          ex.printStackTrace() ;
        }
      }
    });
    resMenu.add(menuItem);
    return resMenu ;
  }
}