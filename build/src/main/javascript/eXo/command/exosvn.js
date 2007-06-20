eXo.require("eXo.core.TaskDescriptor") ;

function exosvn() {


};

exosvn.prototype.Param = function(args) {
  var param = {} ;
  for(var i = 0; i < args.length; i++ ) {
    if(args[i].match("--include=")) {
      param.include = args[i].substring("--include=".length()) ;
    } else if(args[i].match("--exclude=")) {
      param.exclude = args.substring("--exclude=".length()) ;
    } else {
      param.workingDir =  args[i] ;
    }
  }
  return param ;
}

exosvn.prototype.MatchFile = function (param) {
  var proc = java.lang.Runtime.getRuntime().exec("svn st " + param.workingDir) ;
  var din = new java.io.DataInputStream(proc.getInputStream() );
  var files = new java.util.ArrayList() ;
  var line = din.readLine()
  while( line  != null ) {
    if(line.matches(param.include)) {
      files.add(line) ;
      print(line);
    }
  }
  return this ;
}

exosvn.prototype.UpdateTask = function(module) {
  
  var task =  new TaskDescriptor("svn update", module) ;
  task.description = "Run svn update again module " + module ;

  task.execute = function() {
    //java.lang.Runtime.getRuntime().exec("svn update " + module) ;
    var args = ['svn', 'update', module] ;
    print("Module: " + module) ;
    var result = eXo.System.run(args, true, true) ;
  } 
  return task;
}

eXo.command.exosvn = exosvn.prototype.constructor;
//exosvn = new exosvn();
//var task = exosvn.UpdateTask(eXo.env.eXoProjectsDir + "/portal/trunk");
//task.execute();
