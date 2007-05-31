/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.httpclient.webunit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 31, 2007  
 */
public class WebUnit {
  final static  public int GET_METHOD = 0 ;
  final static  public int POST_METHOD = 1 ;
  
  private String name_ ;
  private String url_ ;
  private List<Param>  params_ ;
  private Map<String, Object>  attrs_ ;
  private int method_  = GET_METHOD ;
  
  public WebUnit(String name, String url) {
    name_  = name ;
    url_ = url ;
  }
  
  
  public String getName()  { return name_ ; }
  public String getUrl()  { return url_ ; }
  
  public int  getMethod()  { return method_ ; }
  public void setMethod(int method) { method_ = method ; }
  
  public void addParam(String name, String value) {
    if(params_ ==  null)  params_ = new ArrayList<Param>() ;
    params_.add(new Param(name, value)) ;
  }
  
  public Object  getAttribute(String name) { 
    if(attrs_ == null)  return null ;
    return attrs_.get(name) ;
  }
  
  public void setAttribute(String name, Object value) {
    if(attrs_ == null) attrs_ = new HashMap<String, Object>() ;
    attrs_.put(name, value) ;
  }
  
  static public class Param {
    private String name ;
    private String value ;
    
    public Param(String name, String value) {
      this.name = name; 
      this.value = value ;
    }
    
    public String getName() { return name ;}
    public String getValue() {  return value ;}
  }
}
