/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.event;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 16, 2007  
 */
abstract public class EventListener<E extends Event> {
  abstract public String getListenedEventName() ;
  abstract public void onEvent(E event) throws Exception ;
}
