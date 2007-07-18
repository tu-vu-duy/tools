/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient.validator;

import org.exoplatform.wsqa.httpclient.WebUnitExecuteContext;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jul 17, 2007
 */
public interface Validator {
  public boolean validate(WebUnitExecuteContext context) ;
}
