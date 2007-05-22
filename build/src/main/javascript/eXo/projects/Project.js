eXo.require("eXo.core.IOUtil")  ;

function Project(gid, id, ptype, version) {
  this.groupId =  gid ;
  this.artifactId = id ;
  this.version = version ;
  this.type = ptype ;
  this.deloyName = null ;

  this.extension = ptype ;
  if(ptype == "exo-portlet" || ptype == "exo-portal") this.extension = "war" ;
  this.relativePath = gid.replace(/\./g, '/') + "/" + id + "/" + version + "/" + 
                      id + "-" + version + "." + this.extension ;
  
  this.tomcatDependency =  true ;
  this.jbossDependency =  true ;
  this.jonasDependency =  true ;
  
  this.dependencies = null ;
}

Project.prototype.setServerDependency = function (name, b) {
  if("tomcat" == name) this.tomcatDependency = b ;
  else if("jboss" == name) this.jbossDependency = b ;
  else if("jonas" == name) this.jonasDependency = b ;
}

Project.prototype.addDependency =  function(project) {
  if(this.dependencies == null) this.dependencies = new java.util.ArrayList() ;
  this.dependencies.add(project) ;
  return this ;
}

//Project.prototype.addDependencies() =  function(project) {
//  if(this.dependencies == null) this.dependencies = new java.util.ArrayList() ;
//  for(var i = 0; i < project.length; i++) {
//    this.dependencies.add(project[i]) ;
//  }
//  return this ;
//}

Project.prototype.hasDependency = function() {return this.dependencies != null ;}

Project.prototype.extractTo = function(repository, dir, ignore) {
  eXo.System.vinfo("EXTRACT" , "To " + dir) ;
  print ("          " + repository[0]);
  print ("          " + repository[1]);
  for( var i = 0; i < repository.length; i++) {
    try {
      var url = new java.net.URL(repository[i] + "/" + this.relativePath);
      var is = new java.util.jar.JarInputStream(url.openStream()) ;
      var entry = is.getNextEntry() ;
      while(entry != null) {
        if(!entry.isDirectory()) {
          var name = entry.getName() ;
          if(ignore == null || !name.matches(ignore)) {
            var file = new File(dir + "/" + name);
            var parentFolder = new File(file.getParent()) ;
            if(!parentFolder.exists()) parentFolder.mkdirs() ;
            var out = new java.io.FileOutputStream(file) ;
            var buf = new eXo.core.IOUtil.createByteArray(14) ;
            var read =  is.read(buf);
            while(read != -1) {
              out.write(buf, 0, read) ;
              read =  is.read(buf);
            }
            out.close();
            eXo.System.vinfo(entry.getName()) ;
          }
        }
        entry = is.getNextEntry() ;
      }
      is.close() ;
      eXo.System.vinfo("EXTRACT", "Done.................................... ") ;
      return ;
    } catch(err) { 
      eXo.System.error(err.message) ;
    }

  }
  throw("Error while extracting the project : " + this.relativePath) ;
}

Project.prototype.deployTo = function(repository, server) {
  for(var i = 0; i < repository.length; i++) {
    try {
      eXo.System.vinfo("GET", this.relativePath + "\n From " + repository[i]) ;
      var url = new java.net.URL(repository[i] + "/" + this.relativePath);
      eXo.System.vinfo("TEST", "Use the repository " + repository[i]) ;
      var warName = null, fileName = null ;
      if(this.extension == "war") {
        if(this.deployName != null) {
          warName = this.deployName ;
        } else {
          warName = this.artifactId ;
          var temp = warName.substring(warName.length - 7);
          if(temp.match(".webapp")) {
            warName = warName.substring(0, warName.lastIndexOf(".")) ;
          }
          warName = warName.substring(warName.lastIndexOf(".") + 1) ;
        }
        fileName = warName + ".war" ;
        fileName = server.deployWebappDir + "/"  + fileName  ;
      } else {
        fileName = server.deployLibDir + "/" + this.artifactId + "-" +this.version + "." + this.type ;
      }
      var out = new java.io.FileOutputStream(fileName) ;

      var is = url.openStream() ;

      eXo.System.vprintIndentation() ;                        
      eXo.System.vprint("[") ;

      var buf = new eXo.core.IOUtil.createByteArray(14) ;
      var read =  0, totalRead = 0, chunkOf100k = 0, chunkCount = 0 ;
      while(read != -1) {
        read =  is.read(buf);
        if(read > 0) {
          out.write(buf, 0, read) ;
          chunkOf100k += read ;
          totalRead += read ;
          if(chunkOf100k > 100000) {
            chunkOf100k = chunkOf100k - 100000 ; 
            chunkCount++ ;
            eXo.System.vprint(".");  
          }
        }
      }
      for(i = chunkCount; i < 60; i++) eXo.System.vprint(" ") ;
      eXo.System.vprint("] " + totalRead/1024 + "kb\n");
      out.close();
      is.close() ;
      return ;
    } catch(err) {  print(err.message); }
  }
  throw("Error while deploying the project : " + this.relativePath) ;
}
//  return this ;

eXo.projects.Project = Project.prototype.constructor ;
