importPackage(java.io);
importPackage(java.util.jar);
importClass(Packages.java.lang.System) ;

function Env() {
  this.baseDir    =  System.getProperty("exo.base.dir");
  this.workingDir =   this.baseDir + "/exo-working" ;
  this.dependenciesDir =  this.baseDir + "/exo-dependencies"  ;
  this.eXoProjectsDir = this.baseDir + "/eXoProjects" ;
  this.javaHome    =  System.getProperty("exo.java.home");
  this.currentDir  =  System.getProperty("exo.current.dir");
  if(this.currentDir.startsWith("/cygdrive/")) {
    this.currentDir =  this.currentDir.substring("/cygdrive/".length()) ;
    this.currentDir = this.currentDir.replaceFirst("/", ":/");
  }
  this.m2Repos = System.getProperty("exo.m2.repos").split(",") ;
  for(var i = 0 ; i< this.m2Repos.length; i++) this.m2Repos[i] = this.m2Repos[i].trim();
}

var eXo  = {
  core : { } ,
  env :  new Env() ,

  info : function(message) { System.out.println(message) ; } ,
  error :  function(message) {
    System.err.println(message) ;
    System.exit(1) ;
  },

  require : function(module, jsLocation) {
    try {
      if(eval(module + ' != null'))  return ;
    } catch(err) {
      eXo.error(err + " : " + module);
    }
    eXo.info("Loading Javascript Module " + module );
    if(jsLocation == null) jsLocation = 'src/main/javascript/' ;
    var path = jsLocation  + module.replace(/\./g, '/')  + '.js';
    try {
      eXo.info("Path: " + path) ;
      load(path) ;
    } catch(err){
      eXo.error(err);
    }
  },
} ;

eXo.require("eXo.core.IOUtil")  ;
