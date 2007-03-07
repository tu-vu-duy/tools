/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/

package org.exoplatform.test.mocks.servlet;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionContext;
import javax.servlet.ServletContext;
import java.util.Enumeration;
import java.util.Map;
import java.util.HashMap;
import java.util.Vector;

/**
 * Created by The eXo Platform SARL
 * Author : Mestrallet Benjamin
 *          benjmestrallet@users.sourceforge.net
 * Date: Jul 27, 2003
 * Time: 2:13:09 AM
 */
public class MockHttpSession implements HttpSession {

  private Map map = new HashMap();

  public long getCreationTime() {
    return 0;
  }

  public String getId() {
    return "MockSessionId";
  }

  public long getLastAccessedTime() {
    return 0;
  }

  public ServletContext getServletContext() {
    return null;
  }

  public void setMaxInactiveInterval(int i) {
  }

  public int getMaxInactiveInterval() {
    return 0;
  }

  public HttpSessionContext getSessionContext() { return null; }

  public Object getAttribute(String s) {
    return map.get(s);
  }

  public Object getValue(String s) {
    return null;
  }

  public Enumeration getAttributeNames() {
    return new Vector(map.keySet()).elements();
  }

  public String[] getValueNames() {
    return new String[0];
  }

  public void setAttribute(String s, Object o) {
    map.put(s, o);
  }

  public void putValue(String s, Object o) {
  }

  public void removeAttribute(String s) {
    map.remove(s);
  }

  public void removeValue(String s) {
  }

  public void invalidate() {
  }

  public boolean isNew() {
    return false;
  }

}
