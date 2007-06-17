/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.webunit;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class Suite {
  private List<WebUnit> units_ = new ArrayList<WebUnit>();
  
  public List<WebUnit> getWebUnits() { return units_ ; }
  public void setWebUnits(List<WebUnit> units) { units_ = units ; }
  public void addWebUnit(WebUnit unit) { units_.add(unit) ; }
}
