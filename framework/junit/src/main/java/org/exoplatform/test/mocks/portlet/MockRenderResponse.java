/*
* Copyright 2001-2004 The eXo platform SARL All rights reserved.
* Please look at license.txt in info directory for more license detail.
*/

package org.exoplatform.test.mocks.portlet;

import javax.portlet.RenderResponse;
import javax.portlet.PortletURL;
import java.io.PrintWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Locale;

/**
 * @author  Mestrallet Benjamin
 *          benjmestrallet@users.sourceforge.net
 * Date: 10 feb. 2004
 * Time: 19:58:17
 */
public class MockRenderResponse extends MockPortletResponse
    implements RenderResponse{
  public String getContentType() {
    return null;  //To change body of implemented methods use File | Settings | File Templates.
  }

  public PortletURL createRenderURL() {
    return null;  //To change body of implemented methods use File | Settings | File Templates.
  }

  public PortletURL createActionURL() {
    return null;  //To change body of implemented methods use File | Settings | File Templates.
  }

  public String getNamespace() {
    return null;  //To change body of implemented methods use File | Settings | File Templates.
  }

  public void setTitle(String string) {
    //To change body of implemented methods use File | Settings | File Templates.
  }

  public void setContentType(String string) {
    //To change body of implemented methods use File | Settings | File Templates.
  }

  public String getCharacterEncoding() {
    return null;  //To change body of implemented methods use File | Settings | File Templates.
  }

  public PrintWriter getWriter() throws IOException {
    return null;  //To change body of implemented methods use File | Settings | File Templates.
  }

  public Locale getLocale() {
    return null;  //To change body of implemented methods use File | Settings | File Templates.
  }

  public void setBufferSize(int i) {
    //To change body of implemented methods use File | Settings | File Templates.
  }

  public int getBufferSize() {
    return 0;  //To change body of implemented methods use File | Settings | File Templates.
  }

  public void flushBuffer() throws IOException {
    //To change body of implemented methods use File | Settings | File Templates.
  }

  public void resetBuffer() {
    //To change body of implemented methods use File | Settings | File Templates.
  }

  public boolean isCommitted() {
    return false;  //To change body of implemented methods use File | Settings | File Templates.
  }

  public void reset() {
    //To change body of implemented methods use File | Settings | File Templates.
  }

  public OutputStream getPortletOutputStream() throws IOException {
    return null;  //To change body of implemented methods use File | Settings | File Templates.
  }
}