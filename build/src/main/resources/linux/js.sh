#!/bin/bash
SCRIPT_DIR=$BSH_EXO_BASE_DIRECTORY/eXoProjects/tools/trunk/build

CURRENT_DIR=`pwd`

JAVA_CMD=$BSH_JAVA_HOME/bin/java

echo $@

$JAVA_CMD -Xshare:auto -Xms128m -Xmx512m -classpath $SCRIPT_DIR/src/main/resources/java/js.jar \
          -Dexo.java.home=$BSH_JAVA_HOME \
          -Dexo.current.dir=$CURRENT_DIR \
          -Dexo.base.dir=$BSH_EXO_BASE_DIRECTORY  \
          -Dexo.m2.repos="$BSH_M2_REPOS"  \
          org.mozilla.javascript.tools.shell.Main $SCRIPT_DIR/src/main/javascript/eXo/eXo.js $@
