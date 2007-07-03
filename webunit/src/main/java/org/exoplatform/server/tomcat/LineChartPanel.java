/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.server.tomcat;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.awt.*;

import javax.swing.JPanel;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 28, 2007  
 */
public class LineChartPanel extends JPanel {
  Color color;
  
  public LineChartPanel(Color c) {
    color = c;
    setPreferredSize(new Dimension(30, 30));
  }

  public void paintComponent(Graphics g) {
    Graphics2D g2 = (Graphics2D)g;

    BufferedImage bufferedImg = (BufferedImage) createImage(200, 80);
    
    Graphics2D gc = bufferedImg.createGraphics();    
    gc.setColor(color);
    gc.drawLine(10, 10, 100, 100);
    
    //g2.setColor(Color.red);
    g2.drawImage(bufferedImg, null, 10 , 10);
    
  }
}
