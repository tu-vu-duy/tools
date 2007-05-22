eXo.require("eXo.core.TaskDescriptor");
eXo.require("eXo.projects.eXoProduct")  ;

function maven() {

}
maven.prototype.MavenTask = function(projectDir, args) {
  var descriptor = new TaskDescriptor("Maven Task", projectDir) ;
  descriptor.description = "Run mvn " + args + " again module " + projectDir ;
  descriptor.projectDir = projectDir;
  descriptor.mavenArgs = args;

  descriptor.execute = function() {
    var m2Home= eXo.env.baseDir + "/maven2" ;
    System.setProperty("maven.home", m2Home) ;
    System.setProperty("classworlds.conf", m2Home + "/bin/m2.conf") ;

    java.lang.System.setProperty("user.dir", this.workingDir) ;
    print("path: " + m2Home) ;
    var mvnClasspath = [
      new java.net.URL("file:" + m2Home + "/core/boot/classworlds-1.1.jar"),
      new java.net.URL("file:" + m2Home + "/boot/classworlds-1.1.jar")
    ] ;

    var contextLoader= java.lang.Thread.currentThread().getContextClassLoader();
    var mvnLoader = new java.net.URLClassLoader(mvnClasspath, contextLoader);
    java.lang.Thread.currentThread().setContextClassLoader(mvnLoader);
    var  type = mvnLoader.loadClass("org.codehaus.classworlds.Launcher") ;
    var exitCode = type.newInstance().mainWithExitCode(this.mavenArgs);
    java.lang.System.gc() ;
    if(exitCode != 0) {
      throw new Exception("BUILD MODULE :" + this.workingDir + " IS FAIL");
    }
    java.lang.Thread.currentThread().setContextClassLoader(contextLoader); 
  }
  return descriptor ;
}

eXo.command.maven = maven.prototype.constructor ;

/*
var maven = new maven() ;
product = new eXo.projects.eXoProduct.portal();
eXo.require("eXo.server.Tomcat");
server = new eXo.server.Tomcat(eXo.env.workingDir + "/exo-tomcat") ;
var args = ['clean', 'install'] ; 
var task = maven.MavenTask("d:/java/eXoProjects/tools/trunk", args) ;
task.execute();


print("[TEST] ===============>");
*/
