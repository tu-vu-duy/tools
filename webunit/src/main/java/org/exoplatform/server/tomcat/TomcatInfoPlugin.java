/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.server.tomcat;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JInternalFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.border.TitledBorder;

import org.exoplatform.swing.Application;
import org.exoplatform.swing.JExoTextEditor;
import org.exoplatform.swing.ViewPlugin;
import org.exoplatform.wsqa.swing.WebUnitDataViewPlugin;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 27, 2007  
 */
public class TomcatInfoPlugin extends JPanel implements ViewPlugin {
  private JTextField txtLocate;
  private JTextPane txtSysPro;
  private JButton btnStart, btnStop;
  private JPanel centerPanel = new JPanel(new GridBagLayout());
  private GridBagConstraints gbc = new GridBagConstraints();
  
  public TomcatInfoPlugin() {
    setName("TomcatPlugin");    
    setLayout(new BorderLayout());
    setMinimumSize(new Dimension(250, 400));
    
    centerPanel.setPreferredSize(new Dimension(100, 400));
    
    gbc.insets = new Insets(0, 0, 2, 2);
    gbc.anchor = gbc.WEST;
    
    txtLocate = new JTextField("location");
    TitledBorder locateBorder = BorderFactory.createTitledBorder("Location");
    txtLocate.setBorder(locateBorder);
    txtLocate.setPreferredSize(new Dimension(100, 50));
    addComponent(txtLocate, 0, 0, 3, 1, GridBagConstraints.HORIZONTAL, 0, 0);
    
    txtSysPro = new JTextPane();
    txtSysPro.setText("System Pro");
    JScrollPane scroll = new JScrollPane(txtSysPro);
    scroll.setPreferredSize(new Dimension(50, 150));    
    scroll.setBorder(BorderFactory.createTitledBorder("System Properties"));
    addComponent(scroll, 0, 1, 3, 1, GridBagConstraints.BOTH, 1, 0.5d);
    
    final JPanel pnlLeftUp = new JPanel(new BorderLayout());
    pnlLeftUp.setPreferredSize(new Dimension(90, 100));
    pnlLeftUp.setBorder(BorderFactory.createTitledBorder("CPU Usage"));   
    addComponent(pnlLeftUp, 0, 2, 2, 1, GridBagConstraints.NONE, 0, 0);    
    
    final JPanel pnlRightUp = new JPanel(new BorderLayout());
    pnlRightUp.setPreferredSize(new Dimension(100, 100));
    pnlRightUp.setBorder(BorderFactory.createTitledBorder("CPU Usage History"));
    addComponent(pnlRightUp, 2, 2, 1, 1, GridBagConstraints.BOTH, 1, 0);
    
    final JPanel pnlLeftDown = new JPanel(new BorderLayout());
    pnlLeftDown.setPreferredSize(new Dimension(90, 100));
    pnlLeftDown.setBorder(BorderFactory.createTitledBorder("PF Usage"));
    addComponent(pnlLeftDown, 0, 3, 2, 1, GridBagConstraints.NONE, 0, 0);
    
    final JPanel pnlRightDown = new JPanel(new BorderLayout());
    pnlRightDown.setPreferredSize(new Dimension(100, 100));
    pnlRightDown.setBorder(BorderFactory.createTitledBorder("Page file Usage History"));
    addComponent(pnlRightDown, 2, 3, 1, 1, GridBagConstraints.BOTH, 1, 0);
     
    JPanel pnlControl = new JPanel();
    btnStart = new JButton("Start");
    btnStop = new JButton("Stop");
    pnlControl.add(btnStart);
    pnlControl.add(btnStop);
    addComponent(pnlControl, 1, 4, 2, 1, GridBagConstraints.HORIZONTAL, 0, 0);
    
    addComponent(new JPanel(), 0, 5, 3, 1, GridBagConstraints.REMAINDER, 1, 1);
    
    add(centerPanel, BorderLayout.CENTER);
    
    btnStart.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        try {
          JInternalFrame frame = 
            Application.getInstance().getWorkspaces().openFrame("Chart") ;
          
          JPanel pnlRight = new JPanel(new BorderLayout());
          JExoTextEditor textEditor = new JExoTextEditor();
          pnlRight.add(textEditor, BorderLayout.CENTER);
          
          JPanel pnlLeft = new JPanel(new BorderLayout());
          pnlLeft.setBackground(Color.gray);
          JVMMonitor pnlChart = new JVMMonitor();
          JPanel pnlControl = new JPanel();
          JButton btn = new JButton("Refresh");
          pnlControl.setIgnoreRepaint(true);
          pnlControl.add(btn);          
          JSplitPane splitPaneLeft = new JSplitPane(JSplitPane.VERTICAL_SPLIT, false, pnlChart, pnlControl);
          splitPaneLeft.setDividerSize(5);
          splitPaneLeft.setDividerLocation(250);
          pnlLeft.add(splitPaneLeft, BorderLayout.CENTER);
          
          JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, true, pnlLeft, pnlRight);
          splitPane.setDividerSize(5);
          splitPane.setDividerLocation(300);
          
          setLayout(new BorderLayout());
          frame.add(splitPane, BorderLayout.CENTER);
          
        }
        catch(Exception ex) {
          ex.printStackTrace();
        }
       
        JVMMonitor canvasLeftUp = new JVMMonitor();
        JVMMonitor canvasLeftDown = new JVMMonitor();
        pnlLeftUp.add(canvasLeftUp);
        pnlLeftDown.add(canvasLeftDown);
        
        LineChartPanel canvasRightUp = new LineChartPanel(Color.red);
        LineChartPanel canvasRightDown = new LineChartPanel(Color.gray);
        pnlRightUp.add(canvasRightUp);
        pnlRightDown.add(canvasRightDown);  
        updateUI();
      }
    });   
    
   updateUI(); 
    
  }
  public void addComponent(Component comp, int x, int y, int width, int height, int fill,
                                        double  weightx, double  weighty) {
    gbc.gridx = x;
    gbc.gridy = y;
    gbc.gridwidth = width;
    gbc.gridheight = height;
    gbc.fill = fill;
    gbc.weightx = weightx;
    gbc.weighty = weighty;
    centerPanel.add(comp, gbc);
  }
  
  
  public String getTitle() { return "Tomcat"; }
  
}
