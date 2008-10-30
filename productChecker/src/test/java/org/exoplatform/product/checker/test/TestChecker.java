/*
 * Copyright (C) 2003-2008 eXo Platform SAS.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see<http://www.gnu.org/licenses/>.
 */
package org.exoplatform.product.checker.test;

import junit.framework.TestCase;

import org.exoplatform.product.checker.ProductChecker;

/**
 * Created by The eXo Platform SAS Author : Alexey Zavizionov
 * alexey.zavizionov@exoplatform.com.ua
 */
public class TestChecker extends TestCase {

  public TestChecker(String s) {
    super(s);
    System.out.println("TestChecker constructor");
  }

  public void setUp() throws Exception {
    System.out.println("TestChecker setUp");
  }

  public void tearDown() throws Exception {
    System.out.println("TestChecker tearDown");
  }

  public void testProduct() {
    System.out.println(">>> TestChecker.testProduct = ");
    ProductChecker.ISLOG = Boolean.parseBoolean(System.getProperty("exo.product.checker.log"));
    String productName = System.getProperty("exo.product.checker.productname");
    String productVersion = System.getProperty("exo.product.checker.productversion");
    if (productName != null && !productName.startsWith("${") && productVersion != null
        && !productVersion.startsWith("${")) {
      ProductChecker.check(productName, productVersion);
    } else if (productName != null && !productName.startsWith("${")) {
      ProductChecker.check(productName);
    } else {
      ProductChecker.check();
    }

  }

}
