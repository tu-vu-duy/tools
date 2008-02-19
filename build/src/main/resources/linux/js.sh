#!/bin/bash
SCRIPT_DIR=$BSH_EXO_BASE_DIRECTORY/eXoProjects/tools/trunk/build
CURRENT_DIR=`pwd`
JAVA_CMD=$JAVA_HOME/bin/java
echo $@
echo "MAVEN_OPTS: $MAVEN_OPTS"
$JAVA_CMD $MAVEN_OPTS -classpath $SCRIPT_DIR/src/main/resources/java/js.jar \
          -Dexo.java.home=$JAVA_HOME \
          -Dexo.current.dir=$CURRENT_DIR \
          -Dexo.base.dir=$BSH_EXO_BASE_DIRECTORY  \
          -Dexo.m2.repos="$BSH_M2_REPOS"  \
          -Dclean.server=$CLEAN_SERVER  \
          org.mozilla.javascript.tools.shell.Main $SCRIPT_DIR/src/main/javascript/eXo/eXo.js $@
