/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.recorder;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class RequestFilter {
  private String[]  pattern_ ;
  
  public RequestFilter(String[] pattern) {
    pattern_ =  pattern ;
  }
  
  public boolean match(String url) {
    for(String pattern : pattern_)  {
      if(url.matches(pattern)) return true  ;
    }
    return false ;
  }
}
