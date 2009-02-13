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

import java.util.Enumeration;

import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;

/**
 * Created by The eXo Platform SAS        .
 * @author Gennady Azarenkov
 * @version $Id: $
 */

public class MockFilterConfig implements FilterConfig {
  
  private ServletContext servletContext;
  
  public MockFilterConfig(ServletContext servletContext) {
    super();
    this.servletContext = servletContext;
  }

  public String getFilterName() {
    return "mock-filter";
  }

  public String getInitParameter(String arg0) {
    // TODO Auto-generated method stub
    return null;
  }

  public Enumeration getInitParameterNames() {
    // TODO Auto-generated method stub
    return null;
  }

  public ServletContext getServletContext() {
    return servletContext;
  }

}

