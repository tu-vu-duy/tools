importClass(Packages.java.lang.System) ;

function IOUtil() {
  System.out.println("Hello IOUtil") ;
}

IOUtil.prototype.hello = function() {
  print("Calll  IOUtil.hello() "); 
}

eXo.core.IOUtil = new IOUtil() ;
