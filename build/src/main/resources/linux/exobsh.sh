#!/bin/bash
BSH_DIR=$BSH_EXO_BASE_DIRECTORY/eXoProjects/tools/trunk/build

CURRENT_DIR=`pwd`
JAVA_CMD=$BSH_JAVA_HOME/bin/java
echo $@
$JAVA_CMD -Xshare:auto -Xms128m -Xmx512m -classpath $BSH_DIR/src/main/resources/java/bsh-2.0b4.jar \
          -Dexo.java.home=$BSH_JAVA_HOME \
          -Dexo.current.dir=$CURRENT_DIR \
          -Dexo.base.dir=$BSH_EXO_BASE_DIRECTORY  \
          -Dexo.m2.repos="$BSH_M2_REPOS"  \
          bsh.Interpreter $BSH_DIR/src/main/script/eXo/eXo.bsh $@
