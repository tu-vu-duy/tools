package org.exoplatform.httpclient;

import junit.framework.TestCase;

import org.exoplatform.httpclient.impl.ApacheCommonHttpClient;
import org.exoplatform.httpclient.recorder.ProxyServer;
import org.exoplatform.httpclient.recorder.RequestFilter;
import org.exoplatform.httpclient.webunit.WebUnit;
import org.exoplatform.httpclient.webunit.WebUnitCaptor;
/**
 * Created by The eXo Platform SARL .
 *
 * @author <a href="mailto:geaz@users.sourceforge.net">Gennady Azarenkov </a>
 * @version $Id: BaseStandaloneTest.java 12004 2007-01-17 12:03:57Z geaz $
 */
public class TestHttpClient extends TestCase {
  private static String url = "http://vnserver.exoplatform.org/";

  public void testHttpClient() throws Exception {
    HttpClient client = new ApacheCommonHttpClient() ;
    WebUnit unit = new WebUnit(url, "GET", "HTTP 1.1") ;
    client.execute(unit) ;
    ProxyServer server = new ProxyServer() ;
    String[]  pattern = {"/portal/.*"} ;
    RequestFilter filter = new RequestFilter(pattern) ;
    WebUnitCaptor captor = new WebUnitCaptor() ;
    captor.setRequestFilter(filter) ;
    server.add(captor) ;
    server.start() ;
  }
}