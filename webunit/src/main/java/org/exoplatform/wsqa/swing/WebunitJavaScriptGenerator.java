/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.wsqa.swing;

import java.util.Map;

import org.exoplatform.wsqa.httpclient.FileParameter;
import org.exoplatform.wsqa.httpclient.Parameter;
import org.exoplatform.wsqa.httpclient.Suite;
import org.exoplatform.wsqa.httpclient.WebUnit;
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
     "importPackage(Packages.org.exoplatform.wsqa.swing); \n\n" +
     
     "if(console == null) console = java.lang.System.out ; \n" +
     "var client = new ExoHttpClient('Default') ; \n" +
     "client.add(new HttpClientLogListener()) ;\n" +
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
    if(unit.getContentType() != null) {
      b.append(". \n") ;
      b.append("  setContentType('").append(unit.getContentType()).append("')") ;
    }
    if(unit.getReferer() != null) {
      b.append(". \n") ;
      b.append("  setReferer('").append(unit.getReferer()).append("')") ;
    }
    
    Map<String, Parameter> params = unit.getParameters() ;
    if(params != null ) {
      int counter = 0 ;
      b.append(". \n") ;
      for(Parameter param :  params.values()) {
        if(param instanceof Parameter) {
          b.append("  addParameter('").append(param.name).append("','").append(param.value).append("')") ;
          if(counter != params.size() - 1) b.append(". \n") ;
        }
        counter++ ;
      }
    }
    if("POST".equals(unit.getMethod())) {
      Map<String, Parameter> bodyParams = unit.getBodyParameters() ;
      if(bodyParams != null ) {
        int counter = 0 ;
        b.append(". \n") ;
        for(Parameter param :  bodyParams.values()) {
          if(param instanceof FileParameter) {  
            FileParameter fparam = (FileParameter) param ;
            b.append("  addBodyFileParameter('").append(param.name).append("', '").
            append(fparam.filename).append("', '").append(fparam.filetype).append("', '").append(fparam.value).
            append("')");
          } else {
            b.append("  addBodyParameter('").append(param.name).append("','").append(param.value).append("')") ;
          }
          if(counter != bodyParams.size() - 1) b.append(". \n") ;
          counter++ ;
        }
      }
    }
    b.append("; \n") ;
    b.append("executeContext = client.execute(unit) ; \n") ;
    
  }
}
