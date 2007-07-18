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
public class RequestHeaderValidator implements Validator {
  private String key_ ;
  private String valueRegex_ ;
  
  public RequestHeaderValidator(String key, String regex) {
    key_ = key ;
    valueRegex_ = regex ;
  }

  public boolean validate(WebUnitExecuteContext context) {
    String value = context.getRequest().getHeaders().get(key_) ;
    if(value == null)  return false ;
    return value.matches(valueRegex_);
  }
}
