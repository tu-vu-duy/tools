/***************************************************************************
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.test.jvm15;

/**
 * Apr 22, 2004
 * @author: Tuan Nguyen
 * @email:   tuan08@users.sourceforge.net
 * @version: $Id: Dummy.java 5799 2006-05-28 17:55:42Z geaz $
 **/
public class Dummy {
	private String str;
	
  public Dummy() {
    this.str = new String("test");
  }
  
	public void setter(String str) {
		this.str = str;
	}
	
	public String getter() {
		return this.str ;
	}
	
  synchronized public String getterSynchronized() {
    return str ; 
  }
  
  synchronized public void setterSynchronized(String s) {
    str = s; 
  }
  
  public void empty() {
  }
}