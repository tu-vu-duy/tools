package org.exoplatform.httpclient;

import junit.framework.TestCase;

import org.exoplatform.wsqa.httpclient.ApacheCommonHttpClient;
import org.exoplatform.wsqa.recorder.ProxyServer;
import org.exoplatform.wsqa.recorder.RequestFilter;
import org.exoplatform.wsqa.swing.WebUnitCaptor;
import org.exoplatform.wsqa.webunit.WebUnit;
/**
 * Created by The eXo Platform SARL .
 *
 * @author <a href="mailto:geaz@users.sourceforge.net">Gennady Azarenkov </a>
 * @version $Id: BaseStandaloneTest.java 12004 2007-01-17 12:03:57Z geaz $
 */
public class TestHttpClient extends TestCase {
  private static String url = "http://vnserver.exoplatform.org/";

public void testHttpClient() throws Exception {
//    HttpClient client = new ApacheCommonHttpClient() ;
//    WebUnit unit = new WebUnit(url, "GET", "HTTP 1.1") ;
//    client.execute(unit) ;

  ProxyServer server = new ProxyServer() ;
  Runtime.getRuntime().addShutdownHook(new ShutdownThread(server)) ;
  String[]  pattern = {"/portal/.*"} ;
    RequestFilter filter = new RequestFilter(pattern) ;
    WebUnitCaptor captor = new WebUnitCaptor() ;
    captor.setRequestFilter(filter) ;
    server.add(captor) ;
    server.start() ;
    Thread.sleep(100000000) ;
  }
  
  static class ShutdownThread extends Thread {
    ProxyServer server_ ;

    ShutdownThread(ProxyServer server) {  
    	server_ = server ; 
	    }
   
    public void run() { 
    	server_.stopServer() ;
    	try {
    	 Thread.sleep(20000) ;
    	} catch (Exception ex) {
    		ex.printStackTrace() ;
    	}
    }
  }

}