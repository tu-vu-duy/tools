/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/

/**
 * Created by The eXo Platform SARL
 * Author : Mestrallet Benjamin
 *          benjmestrallet@users.sourceforge.net
 * Date: Sep 11, 2003
 * Time: 8:26:13 PM
 */
package org.exoplatform.test.mocks.portlet;

import java.io.IOException;
import java.io.Serializable;
import java.util.Map;

import javax.portlet.ActionResponse;
import javax.portlet.PortletMode;
import javax.portlet.PortletModeException;
import javax.portlet.WindowState;
import javax.portlet.WindowStateException;
import javax.xml.namespace.QName;

public class MockActionResponse extends MockPortletResponse implements ActionResponse {

  public void setWindowState(WindowState windowState) throws WindowStateException {
  }

  public void setPortletMode(PortletMode portletMode) throws PortletModeException {
  }

  public void sendRedirect(String s) throws IOException {
  }

  public void sendRedirect(String location, String renderUrlParamName) throws IOException {
  }

  public void setRenderParameters(Map map) {
  }

  public void setRenderParameter(String s, String s1) {
  }

  public void setRenderParameter(String s, String[] strings) {
  }

  public PortletMode getPortletMode() {
    return null;
  }

  public Map<String, String[]> getRenderParameterMap() {
    return null;
  }

  public WindowState getWindowState() {
    return null;
  }

  public void removePublicRenderParameter(String arg0) {
  }

  public void setEvent(QName arg0, Serializable arg1) {
  }

  public void setEvent(String arg0, Serializable arg1) {
  }

}
