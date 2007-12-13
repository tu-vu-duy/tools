eXo.require("eXo.core.TaskDescriptor") ;

function Product() {
  this.name      = null ;
  this.portalwar = null ;
  this.codeRepo  = null ;
  this.dependenciesHolder = new java.util.HashMap() ; 
  this.serverPatches      = new java.util.HashMap() ;

  this.module = null ;
  this.useWorkflow = false;
  this.dependencyModule = null ;
}

Product.GetProduct = function(name, version) {
  // Try to load the product descriptor corresponding to the specified name and version
  eXo.load(version + ".js", eXo.env.eXoProjectsDir + "/tools/trunk/build/src/main/javascript/eXo/products/" + name);
  
  try {
    // The function getProduct() is defined in the loaded product decriptor
    return getProduct(version);
  } catch(error) {
    print(error);
    print("ERROR while loading product descriptor (name=\""
          + name
          + "\", version=\""
          + version
          + "\"). Perhaps it is missing.");
    java.lang.System.exit(1);
  }
}

Product.prototype.addServerPatch = function (serverName, project) {
  var holders = this.serverPatches.get(serverName) ;
  if (holders == null) {
    holders = new java.util.ArrayList(3) ;
    this.serverPatches.put(serverName, holders) ;
  }
  holders.add(project) ;
}

Product.prototype.getServerPatches = function(serverName) { 
  return this.serverPatches.get(serverName) ; 
}
Product.prototype.addDependencies = function(project) {
  this.dependenciesHolder.put(project.relativePath, project) ;  
  if(project.hasDependency()) {
    var list = project.dependencies ;
    for(var i = 0; i < list.size(); i++) {
      this.addDependencies(list.get(i)) ;
    }
  }
}

Product.prototype.getDependencies = function() { 
  return this.dependenciesHolder.values() ; 
}

Product.prototype.DeployTask = function(product, server, repos) {	  
	patches = product.getServerPatches(server.name) ;
  if(patches == null) {
  	var msg = "The server " + server.name + " may not support this product: " + product.name 
  	         +". Please try to use another server" ;
  	eXo.System.info("INFO", msg);
  	return ;    	             	
  }
  var descriptor =  new TaskDescriptor("Deploy Product", server.serverHome) ;
  descriptor.execute = function() {
    eXo.System.info("DELETE", "Delete " + server.serverHome);
    eXo.core.IOUtil.remove(server.serverHome) ;
    eXo.System.info("COPY", "Copy a clean server " + server.cleanServer);
    eXo.core.IOUtil.cp(eXo.env.dependenciesDir + "/" + server.cleanServer, server.serverHome) ;
    server.preDeploy(product) ;    
    for(var i = 0; i <  patches.size(); i++) {
      project = patches.get(i) ;
      var message = "Patch the server " + server.name + 
                       " with project " +  project.artifactId + " " + project.version ;
      eXo.System.info("INFO", message);
      new java.io.File(server.patchDir).mkdirs();
      project.extractTo(repos, server.patchDir, "META-INF/maven.*") ;
    }
    var i = product.getDependencies().iterator();
    counter = 0 ;
    while(i.hasNext()) {
      project = i.next();
      project.deployTo(repos, server) ;
      server.onDeploy(project) ;
      counter++ ;
    }
    eXo.System.info("INFO", "Deploy total " +  counter + " files");
    server.postDeploy(product) ;
  }
  return descriptor ;
}
