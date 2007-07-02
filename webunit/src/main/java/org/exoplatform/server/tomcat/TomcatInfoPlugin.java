/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.server.tomcat;

import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.CardLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Locale;

import javax.swing.JButton;
import javax.swing.JInternalFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.border.*;
import javax.swing.*;

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
  
  public TomcatInfoPlugin() {
    setName("TomcatPlugin");
    setLayout(new BorderLayout());
    setMinimumSize(new Dimension(500, 400));
    setPreferredSize(new Dimension(300, 400));
    setMaximumSize(new Dimension(1000, 500));
    resize(new Dimension(200, 400));
    
    JPanel pnl = new JPanel(new BorderLayout());
    
    txtLocate = new JTextField();
    TitledBorder locateBorder = BorderFactory.createTitledBorder("Location");
    locateBorder.setTitleJustification(TitledBorder.LEFT);
    txtLocate.setBorder(locateBorder);
    pnl.add(txtLocate, BorderLayout.NORTH);
    
    JPanel pnlSysPro = new JPanel(new BorderLayout());
  
    txtSysPro = new JTextPane();
    JScrollPane scroll = new JScrollPane(txtSysPro);
    scroll.setPreferredSize(new Dimension(50, 150));    
    scroll.setBorder(BorderFactory.createTitledBorder("System Properties"));
    pnlSysPro.add(scroll, BorderLayout.CENTER);
    pnl.add(pnlSysPro, BorderLayout.CENTER);
    
    
    JPanel pnlControl = new JPanel();
    
    btnStart = new JButton("Start");
    btnStop = new JButton("Stop");
    pnlControl.add(btnStart);
    pnlControl.add(btnStop);
    
    add(pnl, BorderLayout.NORTH);
    
    updateUI();
    
    JButton btnShowText = new JButton("Text");
    pnlControl.add(btnShowText);
    
    
    btnShowText.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        try {
          JInternalFrame frame = 
            Application.getInstance().getWorkspaces().openFrame("aaa", "New text Editor") ;
          WebUnitDataViewPlugin newTextEditor = new WebUnitDataViewPlugin() ;          
          newTextEditor.setVisible(true) ;
          frame.add(newTextEditor) ;
        }
        catch(Exception ex) {
          ex.printStackTrace();
        }
      }
    });
    
    final JPanel pnlCenter = new JPanel(new BorderLayout());
    final JPanel leftPanelChart = new JPanel(new GridLayout(2, 1));
    
    final JPanel centerPanelChart = new JPanel(new BorderLayout());
    centerPanelChart.setBorder(BorderFactory.createTitledBorder("CPU Usage History"));
    
    leftPanelChart.setPreferredSize(new Dimension(100, 200));
    
    pnlCenter.add(leftPanelChart, BorderLayout.WEST);
    
    
    btnStart.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent ae) {
        try {
          JInternalFrame frame = 
            Application.getInstance().getWorkspaces().openFrame("bbb", "Chart") ;
          
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
        
        JVMMonitor canvasUp, canvasDown;
        canvasUp = new JVMMonitor();
        canvasDown = new JVMMonitor();
        
        JPanel pnlUp = new JPanel(new BorderLayout());
        JPanel pnlDown = new JPanel(new BorderLayout());
        pnlUp.add(canvasUp);
        pnlDown.add(canvasDown);
        pnlUp.setBorder(BorderFactory.createTitledBorder("CPU Usage"));        
        pnlDown.setBorder(BorderFactory.createTitledBorder("PF Usage"));
        
        leftPanelChart.add(pnlUp);
        leftPanelChart.add(pnlDown);
        leftPanelChart.updateUI();
        
        LineChartPanel canvas1 = new LineChartPanel(Color.red);
        LineChartPanel canvas2 = new LineChartPanel(Color.gray);
        
        JPanel lineChart1 = new JPanel(new BorderLayout());
        JPanel lineChart2 = new JPanel(new BorderLayout());
        lineChart1.add(canvas1);
        lineChart2.add(canvas2);
        
        lineChart1.updateUI();
        lineChart2.updateUI();
        
        JSplitPane splitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT, true, lineChart1, lineChart2);
        splitPane.setDividerSize(5);
        splitPane.setDividerLocation(200);
        centerPanelChart.add(splitPane, BorderLayout.CENTER);    
        
      }
    });
    
    pnlCenter.add(centerPanelChart, BorderLayout.CENTER);
    centerPanelChart.setPreferredSize(new Dimension(100, 200));
    leftPanelChart.setPreferredSize(new Dimension(100, 200));
    
    pnlCenter.updateUI();
    
    centerPanelChart.updateUI();
    leftPanelChart.updateUI();
    updateUI();
    
    
    pnlCenter.setPreferredSize(new Dimension(250, 300));
    JPanel pnlAdd = new JPanel();
    pnlAdd.setPreferredSize(new Dimension(100, 200));
    pnlAdd.add(new JButton("gg"));
    pnlCenter.add(pnlAdd, BorderLayout.EAST);
   
    
    setIgnoreRepaint(false);
    add(pnlCenter, BorderLayout.CENTER);
    pnlControl.updateUI();
    add(pnlControl, BorderLayout.SOUTH);
  }
  
  public String getTitle() { return "Tomcat"; }
  
}
