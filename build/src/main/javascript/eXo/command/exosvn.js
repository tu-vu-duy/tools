eXo.require("eXo.core.TaskDescriptor") ;
eXo.require("eXo.core.Util");

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
  this.proc = java.lang.Runtime.getRuntime().exec("svn st " + param.workingDir) ;
  var din = new java.io.DataInputStream(this.proc.getInputStream() );
  this.files = new java.util.ArrayList() ;
  //var line = din.readLine();
  while( (line=din.readLine()) != null ) {
    if(line.matches(param.include) && !line.matches(param.exclude)) {
      this.files.add(line) ;
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

exosvn.prototype.AddTask = function() {
    var descriptor =  new TaskDescriptor("svn add", eXo.env.currentDir) ;

    descriptor.execute = function() {
      var param = exosvn.Param({}) ;
      if(param.workingDir == null)  param.workingDir = descriptor.workingDir ;
      if(param.include == null) param.include = "^\\?.*" ;
	  if(param.exclude == null) param.exclude = ".*target$";
	  java.lang.System.setProperty("user.dir",  param.workingDir) ;
	  
      var matches =  exosvn.MatchFile(param) ;
      var proc =  matches.proc ;
      var exitValue = proc.exitValue();
      if(exitValue == 0 && matches.files.size() > 0) {
        input = eXo.System.readInput("Do you want to add the above files[yes]") ;
        if("yes".equals(input)) {
          var b = new java.lang.StringBuilder() ;
          b.append("svn add ");
          for(i = 0; i < matches.files.size();i++) { 
            b.append(matches.files.get(i).substring(6)); 
          }
          proc = java.lang.Runtime.getRuntime().exec(b.toString()) ;
        }
      } else {
        print("Cannot perform the svn command, svn exit with the code " + exitValue); 
      }
      errStream = new java.io.DataInputStream( proc.getInputStream() );
      while( (line = errStream.readLine()) != null ) print(line) ;
    }
    return descriptor ;
  }

var args = arguments;

function printInstructions() {
	print(
      "\n\n" +
      "Usage of exosvn command: \n\n" +
      "  exosvn add | up | rm \n\n" +
      "Options: \n" +
      "  * add             adds the new files from the module on svn\n" +
      "  * rm          	   removes files in the module\n"
    );
}

if(args.length == 0) {
	printInstructions() ;
	java.lang.System.exit(1);
}

exosvn = new exosvn();

args = args[0];

if ("add".equals(args)) {
	exosvn.AddTask().execute() ;
} else if ("rm".equals(args)) {
	//exosvn.RemoveTask().execute() ;
}

//eXo.command.exosvn = exosvn.prototype.constructor;
//exosvn = new exosvn();
//var task = exosvn.UpdateTask(eXo.env.eXoProjectsDir + "/portal/trunk");
//task.execute();
