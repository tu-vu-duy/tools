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

  public void testJcr1_9() {
    System.out.println(">>> TestChecker.testJcr1_9 = ");
    ProductChecker.ISLOG = Boolean.parseBoolean(System.getProperty("exo.product.checker.log"));
    int errors = ProductChecker.check("jcr", "1.9");
    System.out.println(">>> TestChecker.testJcr1_9 All errors for jcr 1.9 = " + errors);
  }

  public void testPc() {
    System.out.println(">>> TestChecker.testPc = ");
    ProductChecker.ISLOG = Boolean.parseBoolean(System.getProperty("exo.product.checker.log"));
    ProductChecker.check("pc");
  }

  public void testAll() {
    System.out.println(">>> TestChecker.testAll = ");
    ProductChecker.ISLOG = Boolean.parseBoolean(System.getProperty("exo.product.checker.log"));
    ProductChecker.check();
  }
}
