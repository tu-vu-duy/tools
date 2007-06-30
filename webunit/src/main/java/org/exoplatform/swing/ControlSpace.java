/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

import java.awt.BorderLayout;
import java.awt.CardLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.HashMap;
import java.util.Map;

import javax.swing.DefaultComboBoxModel;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JPanel;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 3, 2007  
 */
public class ControlSpace extends JPanel {
  private Map<String, ViewPlugin> viewPlugins_ = new HashMap<String, ViewPlugin>();
  private DefaultComboBoxModel model = new DefaultComboBoxModel();
  private JPanel controlPanel ;
  
  public ControlSpace() {
    setLayout(new BorderLayout());
    JComboBox combo = new JComboBox(model);
    
    combo.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        System.out.println("selected item : " + model.getSelectedItem().toString());
        controlPanel.remove(0) ;
        SelectionModel smodel = (SelectionModel)model.getSelectedItem() ;
        ViewPlugin view =  viewPlugins_.get(smodel.name);  
        JComponent jcomponent = (JComponent) view ;
        controlPanel.add(jcomponent, view.getName());
        controlPanel.updateUI() ;
      }
    });
   
    add(combo, BorderLayout.NORTH);
    controlPanel = new JPanel();
    controlPanel.setLayout(new CardLayout()) ;
    add(controlPanel, BorderLayout.CENTER);
  }
  
  public ViewPlugin getViewPlugin(String name) { return viewPlugins_.get(name) ; }
  
  public void addView(ViewPlugin view) {
    JComponent jcomponent = (JComponent) view;
    viewPlugins_.put(view.getName(), view);
    jcomponent.setVisible(true);
    if(controlPanel.getComponentCount() == 0) {
      controlPanel.add(jcomponent, view.getName());
    }
    SelectionModel smodel = new SelectionModel(view.getName(), view.getTitle()) ;
    model.addElement(smodel);
  }
  
  public void changeView(String id) throws Exception {
    
  }
  
  static public class SelectionModel {
    String name, title ;
    
    SelectionModel(String name, String title) {
      this.name = name ;
      this.title = title ;
    }
    
    public String toString() { return title ; }
  }
}