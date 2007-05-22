importClass(Packages.java.lang.System) ;
importClass(Packages.java.io.File) ;
importClass(Packages.java.io.FileInputStream) ;
importClass(Packages.java.io.FileOutputStream) ;
importClass(Packages.java.io.ByteArrayOutputStream) ;

function IOUtil() {
}

IOUtil.prototype.shift = function(args) {
  if(args.length == 0) return args ;
  var newargs =  new Array() ;
  for(var i = 0; i < args.length - 1; i++)  newargs[i] = args[i + 1] ;
  return newargs ;
}


IOUtil.prototype.emptyFolder = function(folder) {
  if(typeof(folder) == 'string') {
    this.emptyFolder(new File(folder)) ;
  } else {
    if(folder.exists() &&  folder.isDirectory()) {
      var child =  folder.listFiles();
      for(var i = 0; i < child.length; i++) {
        var  file =  child[i] 
        if(file.isDirectory()) this.emptyFolder(file) ;
        var method = file.getClass().getMethod('delete', null);
        var result = method.invoke(file, null);
        if(result) {
          print("[DELETE] " + file.getAbsolutePath());
        } else {
          print("[ERROR]  Cannot delete " + file.getAbsolutePath());
        }
      }
    }
  }
}

IOUtil.prototype.remove = function(path) {
  var file = path ;
  if(typeof(path) == 'string') file = new File(path) ;

  if(file.exists())  {
    this.emptyFolder(file) ;
    var method = file.getClass().getMethod('delete', null);
    var result = method.invoke(file, null);
    if(result) {
      print("[DELETE] " + file.getAbsolutePath());
    } else {
      print("[ERROR]  Cannot delete " + file.getAbsolutePath());
    }
  } else {
    print("[ERROR]  Cannot  find " + path);
  }
}

IOUtil.prototype.createByteArray = function(size)  {
  var  buff = new java.io.ByteArrayOutputStream(size) ;
  buff.write(1) ;
  for(var i = 0; i < size; i++) {
   var innerBuff = buff.toByteArray() ;
   buff.write(innerBuff, 0, innerBuff.length) ;
  }
  var bytes =  buff.toByteArray() ;
  return bytes ;
}

IOUtil.prototype.cp = function(src, dest) {
  var srcFolder = new File(src) ;
  if(!srcFolder.exists()) {
    throw(src + " is not existed") ;
  } else if(srcFolder.isFile()) {
    var destFolder = new File(dest);
    if (destFolder.exists()) {
      dest = dest + "/" + srcFolder.getName();
    }
    var input = new FileInputStream(srcFolder) ;
    var output = new FileOutputStream(dest) ;
    var buff = this.createByteArray(12) ;
    var len = 0 ;
    while ((len = input.read(buff)) > 0) {
      output.write(buff, 0, len);
    }
    input.close();  
    output.close(); 
    eXo.System.vinfo("COPY", "Copy file " + src) ;
  } else {
    var destFolder = new File(dest) ;
    if(!destFolder.exists()) {
      destFolder.mkdirs() ;
      eXo.System.vinfo("MKDIR", "Create a directory " + dest) ;
    }
    var child =  srcFolder.listFiles();
    for(var i = 0; i < child.length; i++) {
      var file =  child[i] ;
      if(file.isFile())  {
        this.cp(file.getAbsolutePath(), 
                destFolder.getAbsolutePath() + "/" +  file.getName());
      } else {
        this.cp(file.getAbsolutePath(), 
                destFolder.getAbsolutePath() + "/" + file.getName());
      }
    }
  }
}


IOUtil.prototype.createFile = function( path, content) {
  var tmp = new java.lang.String(content) ;
  var bytes = tmp.getBytes() ;
  var out = new FileOutputStream(path);
  out.write(bytes, 0, bytes.length);
  out.close();
  eXo.System.vinfo("NEW", "Create file " +  path) ;
}
  

IOUtil.prototype.createFolder = function( path) {
  var folder = new File(path);
  if(!folder.exists()) {
    folder.mkdirs();
    eXo.System.vinfo("MKDIR", "Create a directory " + path) ;
  } else {
    eXo.System.vinfo("INFO", "Directory is exists" ) ;
  }
}

IOUtil.prototype.getJarEntryContent = function(fileName, entryName) {
  var jar = new java.util.jar.JarFile(fileName) ;
  var entries = jar.entries() ;
  while(entries.hasMoreElements()) {
    var entry = entries.nextElement() ;
    if(entry.getName() == entryName) {
      var entryStream = jar.getInputStream(entry);
      var buffer = this.createByteArray(12) ;
      var bytesRead;
      var out = new java.io.ByteArrayOutputStream();
      while ((bytesRead = entryStream.read(buffer)) != -1) {
        out.write(buffer, 0, bytesRead);
      }
      entryStream.close();
      jar.close() ;
      return out.toByteArray() ;
    }
  }
  jar.close() ;
  return null;
}

IOUtil.prototype.modifyJarEntry = function(moduleFile, configEntry, properties) {
  var  file = new java.io.File(moduleFile) ;
  if(!file.exists())  return ;
  var content = new java.lang.String(getJarEntryContent(moduleFile, configEntry)) ;
  var i = properties.entrySet().iterator();
  while(i.hasNext()) {
    var entry = i.next() ;
    content = content.replace(entry.getKey(), entry.getValue()) ;
  }

  mentries = new HashMap() ;
  mentries.put(configEntry, content.getBytes("UTF-8")) ;
  eXo.core.IOUtil.modifyJar(moduleFile, mentries, null);
}

/**
 * This method allow you to modify the content of one/multiple entries and the manifiest of 
 * a jar file.
 * 
 * fileName: The absolute path to the jar file that you want to modify 
 * entries:  A java.util.Map  object. The key should be the entry name  that you want to
 *           modify, and the value should be a java  byte array (byte[])  
 */
IOUtil.prototype.modifyJar = function(fileName,mentries, mattrs) {
  var file = new java.io.File(fileName); 
  var jar = new java.util.jar.JarFile(fileName) ;
  var mf = jar.getManifest() ;
  if(mattrs != null) {
    var i = mattrs.entrySet().iterator();
    while(i.hasNext()) {
      var entry = i.next();
      mf.getMainAttributes().putValue(entry.getKey(), entry.getValue()) ;
    }
  }
  var tmpFile = new java.io.File(fileName + ".tmp") ;
  var jos = new JarOutputStream(new FileOutputStream(tmpFile), mf) ;
  var entries = jar.entries() ;
  var buffer = this.createByteArray(12) ;
  var bytesRead;
  while(entries.hasMoreElements()) {
    var entry = entries.nextElement() ;
    var entryName = entry.getName() ; 
    if(entryName.match("MANIFEST.MF")) {
    } else if(mentries != null && mentries.containsKey(entryName)) {
      entry = new JarEntry(entryName) ;
      jos.putNextEntry(entry) ;
      var content = mentries.get(entryName) ;
      jos.write(content, 0, content.length) ;
      mentries.remove(entryName) ;
    } else  {
      var entryStream = jar.getInputStream(entry);
      jos.putNextEntry(entry) ;
      while ((bytesRead = entryStream.read(buffer)) != -1) jos.write(buffer, 0, bytesRead);
    }
  }
  jar.close() ;
  jos.close() ;
  this.remove(file) ;
  tmpFile.renameTo(file) ;
}

eXo.core.IOUtil = new IOUtil() ;

var nam="testing";

//eXo.core.IOUtil.remove("target") ;
//eXo.core.IOUtil.cp("nam.txt", "target");
//eXo.core.IOUtil.cp("target", "target1");
//eXo.core.IOUtil.createFile("test2.txt","jhkjhyibnkjhyiu");

//var rentries = new java.util.HashMap() ;
////var content = new java.lang.String("This is a test 1") ;
//rentries.put("linux/exobsh.sh", "linux/exobsh.sh") ;
//rentries.put("linux/exobuild.sh", content.getBytes()) ;
//eXo.core.IOUtil.modifyJar("target/exo.tool.build-2.0.jar", rentries, null);

//var test = eXo.core.IOUtil.getJarEntryContent("target/exo.tool.build-2.0.jar", "linux/exobuild.sh");
//print (new java.lang.String(test));
