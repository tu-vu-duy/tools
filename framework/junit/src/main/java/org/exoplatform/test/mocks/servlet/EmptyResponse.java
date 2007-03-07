/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/
package org.exoplatform.test.mocks.servlet;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.ServletOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Locale;
/**
 * Created by The eXo Platform SARL
 * Author : Mestrallet Benjamin
 *          benjmestrallet@users.sourceforge.net
 * Date: Jul 29, 2003
 * Time: 5:44:28 PM
 */
public class EmptyResponse implements HttpServletResponse {

  public void addCookie(Cookie cookie) { }

  public boolean containsHeader(String s) { return false; }

  public String encodeURL(String s) { return null; }

  public String encodeRedirectURL(String s) { return null; }

  public String encodeUrl(String s) { return null; }

  public String encodeRedirectUrl(String s) { return null; }

  public void sendError(int i, String s) throws IOException { }

  public void sendError(int i) throws IOException { }

  public void sendRedirect(String s) throws IOException { }

  public void setDateHeader(String s, long l) { }

  public void addDateHeader(String s, long l) { }

  public void setHeader(String s, String s1) { }

  public void addHeader(String s, String s1) { }

  public void setIntHeader(String s, int i) { }

  public void addIntHeader(String s, int i) { }

  public void setStatus(int i) { }

  public void setStatus(int i, String s) { }

  public String getCharacterEncoding() { return null; }

  public ServletOutputStream getOutputStream() throws IOException { return null; }

  public PrintWriter getWriter() throws IOException { return null; }

  public void setContentLength(int i) { }

  public void setContentType(String s) { }

  public void setBufferSize(int i) { }

  public int getBufferSize() { return 0; }

  public void flushBuffer() throws IOException { }

  public void resetBuffer() { }

  public boolean isCommitted() { return false; }

  public void reset() { }

  public void setLocale(Locale locale) { }

  public Locale getLocale() { return null; }
  
  public void setCharacterEncoding(String charset){ }
  
  public String getContentType(){ return null; }
}
