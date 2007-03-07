/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/
package org.exoplatform.test.mocks.portlet;

import javax.portlet.ActionRequest;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan08@users.sourceforge.net
 * Date: Jul 27, 2003
 * Time: 2:13:09 AM
 */
public class MockActionRequest extends MockPortletRequest implements ActionRequest {

  public MockActionRequest() {
    super();
  }

  public java.io.InputStream getPortletInputStream () throws java.io.IOException {
    return null ;
  }


  public void setCharacterEncoding(String enc) throws java.io.UnsupportedEncodingException {
    
  }

  public java.io.BufferedReader getReader() throws java.io.UnsupportedEncodingException, java.io.IOException {
    return null ;
  }
    
  public java.lang.String getCharacterEncoding() {
    return "default" ;
  }

  public java.lang.String getContentType() {
    return "txt/html" ;
  }

  public int getContentLength() {
    return 0 ;
  }
}