importClass(Packages.java.lang.System) ;

function Env() {
  this.baseDir    =  System.getProperty("exo.base.dir");
  this.workingDir =   this.baseDir + "/exo-working" ;
  this.dependenciesDir =  this.baseDir + "/exo-dependencies"  ;
  this.eXoProjectsDir = this.baseDir + "/eXoProjects" ;
  this.javaHome    =  System.getProperty("exo.java.home");
  this.currentDir  =  System.getProperty("exo.current.dir");
  if(this.currentDir.startsWith("/cygdrive/")) {
    this.currentDir = this.currentDir.substring("/cygdrive/".length) ;
    this.currentDir = this.currentDir.replaceFirst("/", ":/");
  }
  this.m2Repos = System.getProperty("exo.m2.repos").split(",") ;
  for(var i = 0 ; i< this.m2Repos.length; i++) this.m2Repos[i] = this.m2Repos[i].trim();
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
      eXo.error(err + " : " + module);
      System.exit(1) ;
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
      System.exit(1) ;
    }
  },
} ;

eXo.require("eXo.System")  ;
eXo.require("eXo.core.IOUtil")  ;

if(arguments.length > 0) {
  var  command =  arguments[0] ;
  arguments = eXo.core.IOUtil.shift(arguments) ;
  eXo.require("eXo.command." + command) ; 
}
print("===============>  " + nam );
