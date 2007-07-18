package org.exoplatform.httpclient;

import java.util.regex.*;
import junit.framework.TestCase;
/**
 * Created by The eXo Platform SARL .
 *
 * @author <a href="mailto:geaz@users.sourceforge.net">Gennady Azarenkov </a>
 * @version $Id: BaseStandaloneTest.java 12004 2007-01-17 12:03:57Z geaz $
 */
public class TestMisc extends TestCase {

  public void testRegex() throws Exception {
    String text = "abcs \n</html> bdfc" ;
    String regex = ".*html.*" ;
    Pattern pattern =  Pattern.compile(regex, Pattern.DOTALL) ;
    Matcher matcher = pattern.matcher(text) ;
    assertTrue("Match expression", matcher.matches()) ;
  }

}