importPackage(java.io);
importPackage(java.lang);
importClass(Packages.java.lang.System) ;


eXo.System = {
  verbose : true  ,

  info : function(tag, message) {
    if(message == null) {
      message = tag ;
      tag = "INFO" ;
    }      
    System.out.print("[" + tag + "]") ;
    for (var i = tag.length + 2; i < 10; i++) System.out.print(" ") ;
    
    var tmp = message.split("\n") ;
    System.out.println(tmp[0]) ;
    for(var i = 1; i < tmp.length; i++) {
      System.out.println("         " + tmp[i]  ) ;
    }
  }, 

  error : function(message) {
    this.info("ERROR", message);
    System.exit(1) ;
  } ,

  vinfo : function(tag, message) {
    if(this.verbose) this.info(tag, message);
  } ,


  print : function (message) {  
    System.out.print(message) ; 
  },

  vprint : function (message) {  
    if(this.verbose) System.out.print(message) ; 
  },

  printIndentation : function() { 
    print("          "); 
  } ,

  vprintIndentation : function() { 
    if(this.verbose) print("          "); 
  },
  
  run : function(args, printResult, printError) {
    var proc = java.lang.Runtime.getRuntime().exec(args) ;
    var din = new java.io.DataInputStream( proc.getInputStream() );
    var b = new java.lang.StringBuilder() ;
    var line = null ;
    while((line = din.readLine()) != null )  {
      b.append(line).append('\n') ;
      if(printResult) print(line) ;
    }

    if(printError) {
      var errStream = new java.io.DataInputStream(proc.getErrorStream());
      while((line = errStream.readLine()) != null ) print(line) ;
    }

    return b.toString() ;
  },

  readInput : function(message) {
    System.out.print(message + ": ") ;
    var b = new java.lang.StringBuilder() ;
    var systemin =  System['in'] ;
    while(true) {
      var val =  systemin.read() ;
      if(val == 13) continue ;
      if(val == 10) break ;
      b.appendCodePoint(val) ;
    }
    return b.toString();
  }
}

//var input = eXo.System.readInput("Enter some value") ;
//print("input = " +  input) ;
