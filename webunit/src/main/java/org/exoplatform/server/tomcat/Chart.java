/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.server.tomcat;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.awt.*;


import javax.swing.JPanel;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 27, 2007  
 */
public class Chart extends JPanel {
  
  public Chart() {
    setPreferredSize(new Dimension(30, 30));
  }
  
  public void paintComponent(Graphics g) {
      
      Graphics2D g2 = (Graphics2D)g;
      
      BufferedImage bufferedImg = (BufferedImage) createImage(30, 80);
      
      Graphics2D gc = bufferedImg.createGraphics();    
      gc.setColor(Color.green);
      gc.fillRect(10, 10, 30, 100); 
      
      g2.setColor(Color.red);
      g2.drawImage(bufferedImg, null, 10, 10);
    
  }
}