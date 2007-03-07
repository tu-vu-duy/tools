package org.exoplatform.test.mocks.servlet;
/*
 * Copyright 2001-2003 The eXo platform SARL All rights reserved.
 * Please look at license.txt in info directory for more license detail.
 * 
 * Created on 21 nov. 2003
 */
/**
 * @author  Mestrallet Benjamin
 *          benjmestrallet@users.sourceforge.net
 *
 */
public class MockPrincipal implements java.security.Principal{

  /* 
   * @see java.security.Principal#getName()
   */
  public String getName() {    
    return "PrincipalMackName";
  }

}
