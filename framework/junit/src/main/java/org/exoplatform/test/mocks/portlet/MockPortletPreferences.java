/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/
package org.exoplatform.test.mocks.portlet;

import java.util.Hashtable ;
import javax.portlet.* ;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan08@users.sourceforge.net
 * Date: Jul 27, 2003
 * Time: 2:13:09 AM
 */
public class MockPortletPreferences implements PortletPreferences {
  private Hashtable map_ ;

  public MockPortletPreferences() {
    map_ = new Hashtable() ;
  }
  
  public boolean isReadOnly(String key) {
    return true ;
  }

  public String getValue(String key, String def) {
    String value = (String) map_.get(key) ;
    if (value == null) value = def ;
    return value ;
  }

  public String[] getValues(String key, String[] def) {
    String[] values = (String[]) map_.get(key) ;
    if (values == null) values = def ;
    return values ;
  }

  public void setValue(String key, String value)  throws ReadOnlyException {
    map_.put(key, value) ;
  }

  public void setValues(String key, String[] values) throws ReadOnlyException {
    map_.put(key, values) ;
  }

  public java.util.Enumeration getNames() {
    return map_.keys() ;
  }

  public java.util.Map getMap() {
    return map_ ;
  }

  public void reset(String key) throws ReadOnlyException {
    map_.remove(key) ; 
  }

  public void store() throws java.io.IOException, ValidatorException {

  }
}
