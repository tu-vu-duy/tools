/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/
package org.exoplatform.test.mocks.portlet;

import java.util.*  ;
import javax.portlet.* ;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan08@users.sourceforge.net
 * Date: Jul 27, 2003
 * Time: 2:13:09 AM
 */
public class MockPortletConfig implements PortletConfig {
  
  String portletName_ ;
  PortletContext context_ = null ;
  Hashtable parameters_ = new Hashtable() ;
  ResourceBundle res_ ;
  
  public MockPortletConfig(PortletContext context) {
    parameters_ = new Hashtable() ;
    context_ = context;
    parameters_.put("template-location", "/WEB-INF/templates/html") ;
  }
  
  public String getPortletName () {
    return portletName_ ; 
  }
  public void setPortletName(String name) { portletName_ = name ; }

  public PortletContext getPortletContext () {
    return context_ ; 
  }
  
  public void setResourceBundle(ResourceBundle res) {
    res_ = res ; 
  }
  
  public java.util.ResourceBundle getResourceBundle(java.util.Locale locale) {
    return res_ ;
  }

  public String getInitParameter(java.lang.String name) {
    return (String) parameters_.get(name) ; 
  }

  public void setInitParameter(String name, String value) {
    parameters_.put(name, value) ; 
  }

  public java.util.Enumeration getInitParameterNames() {
    return null ;
  }
}

