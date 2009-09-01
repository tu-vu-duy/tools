eXo.require("eXo.projects.Project");

function Module() {
    this.version = null;
    this.relativeMavenRepo = null;
    this.relativeSRCRepo = null;
    this.name = null;
}

Module.GetModule = function(path, params) {
    // Try to load the module descriptor corresponding to the specified name and
    // version
    print("Loading module: " + eXo.env.eXoProjectsDir + "/tools/trunk/build/src/main/javascript/eXo/modules/" + path);
    eXo.load("module.js", eXo.env.eXoProjectsDir + "/tools/trunk/build/src/main/javascript/eXo/modules/" + path);

    try {
        // The function getModule() is defined in the loaded module descriptor
        return getModule(params);
    } catch (error) {
        print("ERROR while loading module descriptor (name=\"" + name + "\", version=\"" + version + "\"). Perhaps it is missing.");
        java.lang.System.exit(1);
    }
}
