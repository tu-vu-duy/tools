/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.util.Map;

import org.exoplatform.wsqa.webunit.Suite;
import org.exoplatform.wsqa.webunit.WebUnit;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 25, 2007  
 */
public class WebunitJavaScriptGenerator {
  static String generate(Suite suite) {
    StringBuilder b = new StringBuilder() ;
    b.append(
     "importPackage(Packages.org.exoplatform.wsqa.webunit); \n" +
     "importPackage(Packages.org.exoplatform.wsqa.httpclient); \n" +
     "if(console == null) console = java.lang.System.out ; \n" +
     "var client = new ExoHttpClient() ; \n" +
     "var executeContext =  null ; \n" +
     "var unit = null ;\n"
    ) ;
    for(WebUnit unit : suite.getWebUnits())  {
      b.append("\n") ;
      addWebUnit(b, unit) ;
    }
    return b.toString() ;
  }
  
  static void addWebUnit(StringBuilder b, WebUnit unit) {
    b.append("unit = \n") ;
    b.append("  new WebUnit('").append(unit.getName()).append("'). \n") ;
    b.append("  setPathInfo('").append(unit.getPathInfo()).append("')") ;
    Map<String, String> params = unit.getParameters() ;
    if(params != null ) {
      int counter = 0 ;
      b.append(". \n") ;
      for(Map.Entry<String, String> entry :  params.entrySet()) {
        b.append("  addParameter('").append(entry.getKey()).append("','").append(entry.getValue()).append("')") ;
        if(counter != params.size() - 1) b.append(". \n") ;
        counter++ ;
      }
    }
    b.append("; \n") ;
    b.append("executeContext = client.execute(unit) ; \n") ;
    
  }
}
