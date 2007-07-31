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

import javax.swing.BorderFactory;
import javax.swing.JPanel;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 27, 2007  
 */
public class JVMMonitor extends JPanel {
  private JPanel centerPanel = new JPanel(new GridBagLayout());

  public JVMMonitor() {
    setName("JVMMonitor");    
    setLayout(new BorderLayout());
    //setMinimumSize(new Dimension(250, 400));
    setPreferredSize(new Dimension(100, 400));

    centerPanel.setPreferredSize(new Dimension(100, 400));

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

    addComponent(new JPanel(), 0, 5, 3, 1, GridBagConstraints.REMAINDER, 1, 1);

    add(centerPanel, BorderLayout.CENTER);

    Chart canvasLeftUp = new Chart();
    Chart canvasLeftDown = new Chart();
    pnlLeftUp.add(canvasLeftUp);
    pnlLeftDown.add(canvasLeftDown);

    LineChart canvasRightUp = new LineChart(Color.red);
    LineChart canvasRightDown = new LineChart(Color.gray);
    pnlRightUp.add(canvasRightUp);
    pnlRightDown.add(canvasRightDown);  
  }

  public void addComponent(Component comp, int x, int y, int width, int height, int fill,
                           double  weightx, double  weighty) {
    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(0, 0, 2, 2);
    gbc.anchor = GridBagConstraints.WEST;
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
