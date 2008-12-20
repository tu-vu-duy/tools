function Env() {
  this.baseDir = java.lang.System.getProperty("exo.base.dir");
  this.workingDir = java.lang.System.getProperty("exo.working.dir");
  if(this.workingDir == null || this.workingDir.equals("")) this.workingDir = this.baseDir + "/exo-working" ;
  this.dependenciesDir = java.lang.System.getProperty("exo.dep.dir") ;
  if(this.dependenciesDir == null || this.dependenciesDir.equals("")) this.dependenciesDir =  this.baseDir + "/exo-dependencies" ;
  this.eXoProjectsDir = java.lang.System.getProperty("exo.src.dir");
  if (this.eXoProjectsDir == null || this.eXoProjectsDir.equals("")) this.eXoProjectsDir = this.baseDir + "/eXoProjects" ;
  this.javaHome    =  java.lang.System.getProperty("exo.java.home");
  this.currentDir  =  java.lang.System.getProperty("exo.current.dir");
  if(this.currentDir.startsWith("/cygdrive/")) {
    this.currentDir = this.currentDir.substring("/cygdrive/".length) ;
    this.currentDir = this.currentDir.replaceFirst("/", ":/");
  }

  var m2Repos = java.lang.System.getProperty("exo.m2.repos").split(",") ;
  this.m2Repos = new Array() ;
  var j = 0;
  for(var i = 0 ; i< m2Repos.length; i++) if(m2Repos[i].trim() != "") this.m2Repos[j++] = m2Repos[i].trim();
}

var eXo  = {
  core    : { } ,
  projects: { } ,
  server  : { } ,
  command : { } ,

  env     :  new Env() ,

  require : function(module, jsLocation) {
    try {
      if(eval(module + ' != null'))  return ;
    } catch(err) {
      eXo.System.error(err + " : " + module);
      java.lang.System.exit(1) ;
    }
    if(jsLocation == null) {
      jsLocation = eXo.env.eXoProjectsDir +  '/tools/trunk/build/src/main/javascript/' ;
    }
    var path = jsLocation  + module.replace(/\./g, '/')  + '.js';
    try {
      load(path) ;
    } catch(err){
      print("Cannot load the javascript module " + module + " from " + jsLocation);
      print(err);
      java.lang.System.exit(1) ;
    }
  },

  load : function(relativePath, jsLocation) {
    if(jsLocation == null) {
      jsLocation = eXo.env.eXoProjectsDir +  '/tools/trunk/build/src/main/javascript/' ;
    }
    var path = jsLocation  + '/' + relativePath;
	
    try {
      load(path) ;
    } catch(err){
      print("Cannot load the javascript module " + module + " from " + jsLocation);
      print(err);
      java.lang.System.exit(1) ;
    }
  },
} ;

eXo.require("eXo.System")  ;
eXo.require("eXo.core.Util")  ;

if(arguments.length > 0) {
  var  command =  arguments[0] ;
  arguments = eXo.core.Util.shift(arguments) ;
  eXo.require("eXo.command." + command) ; 
}
