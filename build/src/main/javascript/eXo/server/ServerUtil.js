eXo.require("eXo.core.IOUtil");

function ServerUtil() { }

ServerUtil.prototype.createEarApplicationXml = function(deployEarDir) {
  var earDir = new java.io.File(deployEarDir) ;
  var b = new java.lang.StringBuilder();
  b.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
  b.append("<!DOCTYPE application PUBLIC \"-//Sun Microsystems, Inc.//DTD J2EE Application 1.3//EN\" \"http://java.sun.com/dtd/application_1_3.dtd\">");
  b.append("\n<application>\n");
  b.append("  <display-name>exoplatform</display-name>\n");
  var file = earDir.list();
  for (var i = 0; i < file.length; i++) {
    if(file[i].endsWith("war")) {
      var idx = file[i].indexOf('.');
      var context = file[i].substring(0, idx);
      b.append("  <module>\n");
      b.append("    <web>\n");
      b.append("      <web-uri>").append(file[i]).append("</web-uri>\n");
      b.append("      <context-root>").append(context).append("</context-root>\n");
      b.append("    </web>\n");
      b.append("  </module>\n");
    } else if(file[i].endsWith("jar")) {
      b.append("  <module>").
        append("    <ejb>").append(file[i]).append("</ejb>\n").
        append("  </module>\n");
    } else if(file[i].endsWith("rar")) {
      b.append("  <module>\n");
      b.append("    <connector>").append(file[i]).append("</connector>\n");
      b.append("  </module>\n");
    }
  }
  b.append("</application>\n");
  eXo.core.IOUtil.createFolder(deployEarDir + "/META-INF");
  var out = 
    new java.io.FileOutputStream(deployEarDir + "/META-INF/application.xml");
  out.write(b.toString().getBytes(), 0, b.length());
  out.close();
}

ServerUtil.prototype.addClasspathForWar = function(earPath) {
  var earDir = new java.io.File(earPath) ;
  var files = earDir.listFiles() ;
  var b  = new java.lang.StringBuilder() ;
  for(var i = 0; i< files.length; i++) {
    var file =  files[i] ;
    if (file.getName().endsWith(".jar")) {
      b.append(file.getName()).append(' ');
    }
  }
  var classpath = b.toString() ;
  for(var i = 0; i< files.length; i++) {
    var file =  files[i] ;
    if (file.getName().endsWith(".war")) {
      manifestAttributes = new java.util.HashMap() ;
      manifestAttributes.put("Class-Path", classpath) ;
      eXo.core.IOUtil.modifyJar(file.getAbsolutePath(), null, manifestAttributes);
    }
  }
}
  
eXo.server.ServerUtil = new ServerUtil();