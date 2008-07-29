/*
 * Copyright (C) 2003-2007 eXo Platform SAS.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see<http://www.gnu.org/licenses/>.
 */

package org.exoplatform.test.mocks.servlet;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Locale;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by The eXo Platform SAS        .
 * @author Gennady Azarenkov
 * @version $Id: $
 */

public class MockHttpServletResponse implements HttpServletResponse {
  
  private PrintWriter writer;
  private ByteArrayOutputStream stream;
  private ByteArrayServletOutputStream output; 

  public MockHttpServletResponse() {
    stream = new ByteArrayOutputStream();
    writer = new PrintWriter(stream);
    output = new ByteArrayServletOutputStream(stream);
  }
  
  
  public String getOutputContent() {
    return new String(stream.toByteArray());
  }

  public void flushBuffer() throws IOException {
    // TODO Auto-generated method stub

  }

  public int getBufferSize() {
    // TODO Auto-generated method stub
    return 0;
  }
  
  public ServletOutputStream getOutputStream() throws IOException {
    return this.output;
  }

  public PrintWriter getWriter() throws IOException {
    return this.writer;
  }

  public boolean isCommitted() {
    return false;
  }

  public void reset() {
    // TODO Auto-generated method stub

  }

  public void resetBuffer() {
    // TODO Auto-generated method stub

  }
  
  
  
  public void addCookie(Cookie arg0) {
    // TODO Auto-generated method stub

  }

  public void addDateHeader(String arg0, long arg1) {
    // TODO Auto-generated method stub

  }

  public void addHeader(String arg0, String arg1) {
    // TODO Auto-generated method stub

  }

  public void addIntHeader(String arg0, int arg1) {
    // TODO Auto-generated method stub

  }

  public boolean containsHeader(String arg0) {
    // TODO Auto-generated method stub
    return false;
  }

  public String encodeRedirectURL(String arg0) {
    // TODO Auto-generated method stub
    return null;
  }

  public String encodeRedirectUrl(String arg0) {
    // TODO Auto-generated method stub
    return null;
  }

  public String encodeURL(String arg0) {
    // TODO Auto-generated method stub
    return null;
  }

  public String encodeUrl(String arg0) {
    // TODO Auto-generated method stub
    return null;
  }

  public void sendError(int arg0) throws IOException {
    // TODO Auto-generated method stub

  }

  public void sendError(int arg0, String arg1) throws IOException {
    // TODO Auto-generated method stub

  }

  public void sendRedirect(String arg0) throws IOException {
    // TODO Auto-generated method stub

  }

  public void setDateHeader(String arg0, long arg1) {
    // TODO Auto-generated method stub

  }

  public void setHeader(String arg0, String arg1) {
    // TODO Auto-generated method stub

  }

  public void setIntHeader(String arg0, int arg1) {
    // TODO Auto-generated method stub

  }

  public void setStatus(int arg0) {
    // TODO Auto-generated method stub

  }

  public void setStatus(int arg0, String arg1) {
    // TODO Auto-generated method stub

  }



  public String getCharacterEncoding() {
    // TODO Auto-generated method stub
    return null;
  }

  public Locale getLocale() {
    // TODO Auto-generated method stub
    return null;
  }



  public void setBufferSize(int arg0) {
    // TODO Auto-generated method stub

  }

  public void setContentLength(int arg0) {
    // TODO Auto-generated method stub

  }

  public void setContentType(String arg0) {
    // TODO Auto-generated method stub

  }

  public void setLocale(Locale arg0) {
    // TODO Auto-generated method stub

  }

  private static class ByteArrayServletOutputStream extends ServletOutputStream {
    ByteArrayOutputStream baos;

    public ByteArrayServletOutputStream(ByteArrayOutputStream baos) {
      this.baos = baos;
    }

    public void write(int i) throws IOException {
      baos.write(i);
    }
  }
}

