/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 16, 2007  
 */
public interface Plugin {
  public String getName()  ;
  public String getDescription() ;
  
  public void onInitApplication(Application app) throws Exception ;
  public void onDestroyApplication(Application app) throws Exception ;
}
