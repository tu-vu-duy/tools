/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.httpclient.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.exoplatform.wsqa.httpclient.WebUnitExecuteContext;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jul 17, 2007  
 */
public class ResponseBodyValidator implements Validator {
  private Pattern pattern ;
  
  public ResponseBodyValidator(String regex) {
    pattern =  Pattern.compile(regex, Pattern.DOTALL) ;
  }

  public boolean validate(WebUnitExecuteContext context) {
    String text = new String(context.getResponse().getHttpResponseBody().getBodyDataAsByte()) ;
    if(text == null)  return false ;
    Matcher matcher = pattern.matcher(text) ;
    return  matcher.matches();
  }
}
