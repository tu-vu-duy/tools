#!/bin/bash
SCRIPT_DIR=$EXO_BASE_DIRECTORY/eXoProjects/tools/trunk/build
CURRENT_DIR=`pwd`
JAVA_CMD=$JAVA_HOME/bin/java
echo $@
$JAVA_CMD -Xshare:auto -Xms128m -Xmx512m -classpath $SCRIPT_DIR/src/main/resources/java/js.jar \
          -Dexo.java.home=$JAVA_HOME \
          -Dexo.current.dir=$CURRENT_DIR \
          -Dexo.base.dir=$EXO_BASE_DIRECTORY  \
          -Dexo.m2.repos="$M2_REPO"  \
          org.mozilla.javascript.tools.shell.Main $SCRIPT_DIR/src/main/javascript/eXo/eXo.js $@