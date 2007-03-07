/**
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 **/

package org.exoplatform.test.mocks.servlet;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.io.IOException;
import java.util.* ;

/**
 * Created by The eXo Platform SARL
 * Author : Mestrallet Benjamin
 *          benjmestrallet@users.sourceforge.net
 * Date: Jul 29, 2003
 * Time: 6:54:45 PM
 */
public class MockServletResponse extends HttpServletResponseWrapper {

  private PrintWriter tmpWriter;
  private ByteArrayOutputStream output;
  private ByteArrayServletOutputStream servletOutput;
  private Locale locale_ ;

  public MockServletResponse(HttpServletResponse httpServletResponse) {
    super(httpServletResponse);
    output = new ByteArrayOutputStream();
    tmpWriter = new PrintWriter(output);
    servletOutput = new ByteArrayServletOutputStream(output);
  }

  public void finalize() throws Throwable {
    super.finalize();
    servletOutput.close();
    output.close();
    tmpWriter.close();
  }

  public String getPortletContent() {
    String s = output.toString();
    reset();
    return s;
  }
  
  /*
  public PrintWriter getWriter() throws IOException {
    //return servletResponse.getWriter();
    return tmpWriter;
  }

  public ServletOutputStream getOutputStream() throws IOException {
    return servletOutput;
  }
  */

  public byte[] toByteArray() {
    return output.toByteArray();
  }
  
  public String getOutputContent() {
    return new String(output.toByteArray());
  }

  public void flushBuffer() throws IOException {
    tmpWriter.flush();
    servletOutput.flush();
  }

  public void reset() {
    output.reset();
  }

  public void close() throws IOException {
    tmpWriter.close();
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
  
  public Locale getLocale() {  return locale_  ; }
  public void setLocale(java.util.Locale loc) {  locale_ = loc ; }
  
}
