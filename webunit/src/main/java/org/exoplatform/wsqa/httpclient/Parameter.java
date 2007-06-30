/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 28, 2007  
 */
public class Parameter {
  final public String name ;
  final public Object value ;
  
  public Parameter(String name, Object value) {
    this.name = name ;
    this.value = value ;
  }
}
