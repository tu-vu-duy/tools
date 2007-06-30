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
public class FileParameter extends Parameter {
  final public String filename ;
  final public String filetype ;
  
  public FileParameter(String name, String filename, String filetype, Object value) {
    super(name, value) ;
    this.filename =  filename ;
    this.filetype = filetype ;
  }
}
