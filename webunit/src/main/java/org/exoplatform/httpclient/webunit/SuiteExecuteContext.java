/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.webunit;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class SuiteExecuteContext {
  
  private long startTime_ ;
  private long endTime_ ;
  
  public SuiteExecuteContext() {
  
  }

  public long getStartTime() { return startTime_; }
  public void setStartTime(long time) { startTime_ = time ; }
  
  public long getEndTime() { return endTime_; }
  public void setEndTime(long time) { endTime_ = time ; }
}
