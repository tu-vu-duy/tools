/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/
package org.exoplatform.test.mocks.portlet;

import java.util.* ;
import javax.portlet.* ;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan08@users.sourceforge.net
 * Date: Jul 27, 2003
 * Time: 2:13:09 AM
 */
public class MockPortletSession implements PortletSession {
  HashMap attributes_ ;
  HashMap appAttributes_ ;
  
  public MockPortletSession() {
    super();
    attributes_ = new HashMap() ;
    appAttributes_ = new HashMap() ;
  }

  public Object getAttribute(String name) {
    return attributes_.get(name) ;
  }

  public Object getAttribute(String name, int scope) {
    if (scope == PortletSession.APPLICATION_SCOPE) {
      return appAttributes_.get(name) ;
    } else {
      return attributes_.get(name) ;
    }
  }

  public void setAttribute(String name, Object obj) {
    attributes_.put(name, obj) ;
  }

  public void setAttribute(String name, Object obj , int scope) {
    if (scope == PortletSession.APPLICATION_SCOPE) {
      appAttributes_.put(name, obj) ;
    } else {
      attributes_.put(name, obj) ;
    }
  }

  public void removeAttribute(String name) {
    attributes_.remove(name) ;
  }

  public void removeAttribute(String name, int scope) {
    if (scope == PortletSession.APPLICATION_SCOPE) {
      appAttributes_.remove(name) ;
    } else {
      attributes_.remove(name) ;
    }
  }

  public java.util.Enumeration getAttributeNames() {
    return null ;
  }

  public java.util.Enumeration getAttributeNames(int scope) {
    return null ;
  }

  public long getCreationTime() {
    return 0 ;
  }
  
  public java.lang.String getId() { 
    return new String(Integer.toString(this.hashCode())) ;
  }
  
  public long getLastAccessedTime() {
    return 0 ;
  }

  public int getMaxInactiveInterval() {
    return 0 ;
  }


  public void invalidate() {} 


  public boolean isNew() {
    return false ;
  }
  
  public void setMaxInactiveInterval(int interval) {
    
  }


  public PortletContext getPortletContext () {
    return null ;
  }

}
