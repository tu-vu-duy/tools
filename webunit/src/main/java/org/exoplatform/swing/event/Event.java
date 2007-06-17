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
public class Event<S, D> {
  private String name_ ;
  private S source_ ;
  private D data_ ; 
  
  public Event(String name, S source, D data) {
    name_ = name ;
    source_ = source ;
    data_ = data ;
  }
  
  public String getEventName() { return name_ ; }
  
  public S getSource()  { return source_ ; }
  
  public D getData() { return data_ ; }
}
