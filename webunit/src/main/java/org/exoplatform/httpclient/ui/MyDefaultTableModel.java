/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.ui;

import javax.swing.table.DefaultTableModel;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 15, 2007  
 */
public class MyDefaultTableModel extends DefaultTableModel{
  
  public MyDefaultTableModel(Object[][] obj, String[] str) {
    super(obj, str);
  }
  public boolean isCellEditable(int row, int column) {
    return false;
  }
}
