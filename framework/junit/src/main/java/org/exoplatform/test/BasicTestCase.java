package org.exoplatform.test;

import java.util.Collection;
import java.util.Comparator;
import java.util.Iterator;

import junit.framework.TestCase;

public  class BasicTestCase extends TestCase {
  private static int testNumber_ = 1;
  protected int counter_ ;

  public BasicTestCase() {
  }
  
  public BasicTestCase(String name) {
    super(name);
  }
  
  protected int getTestNumber() {
    return testNumber_ ;
  }

  protected void setTestNumber(int num) {
    testNumber_ = num ;
  }
  
  protected int getCounter() {
    return counter_  + 1;
  }

  protected void runTest() throws Throwable {
    long t = System.currentTimeMillis() ;
    long firstRun = 0  ;
    int testNum = getTestNumber() ;
    System.out.println(getDescription());
    System.out.println("\n********************************************************\n" +
    		                 "                   BEGIN TEST CASE                     \n" +
    		                 "\t\t" + getName() + "\n" +
    		                 "********************************************************\n" );
    for(counter_= 0; counter_ < testNum; counter_++) {
      super.runTest() ;
      if (counter_ == 0) {
        firstRun = System.currentTimeMillis() - t;
      }
    }
    t = System.currentTimeMillis() - t;
    System.out.println("\n\n\n=====> TEST CASE: run " + getName() + "() " + 
                       getTestNumber() + " time in " + t + 
                       "ms, first run: " + firstRun + "ms, " +
                       "average: " + t/testNum+ "ms <==============\n\n\n");
  }
  
  protected  static void info(String s) {
    System.out.println("  INFO: " + s);
  }

  protected  static void error(String s) {
    System.out.println("ERROR: " + s);
  }

  protected String getDescription()  {
  	return "Run test " + getClass().getName() ;
  }
  
  protected static void hasObjectInCollection(Object obj, Collection c, Comparator comparator) throws Exception {
    Iterator iter = c.iterator() ;
    while(iter.hasNext()) {      
      Object o = iter.next() ;
      if(comparator.compare(obj,o)==0) return ;  
    }
    throw new Exception("Object " + obj + " hasn't in collection "+ c) ;
   }
  
  protected static void assertCollection(Collection c1 , Collection c2, Comparator comparator) throws Exception {
    if(c1.size() != c2.size()) {
      throw new Exception("Size of collection_1:" +c1.size() + " is not equals to collection_2:" + c2.size()) ;
    }
    
    for(Object o : c1) hasObjectInCollection(o,c2,comparator) ;
   }
  
  protected void assertObject(Object o1, Object o2, Comparator comparator) throws Exception {
    if(comparator.compare(o1,o2)!=0) {
      throw new Exception ("Object "+ o1 + "not equals to" +o2) ;}  
  }
}
