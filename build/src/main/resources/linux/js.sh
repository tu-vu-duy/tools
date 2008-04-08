#!/bin/bash

# OS specific support (must be 'true' or 'false').
cygwin=false;
case "`uname`" in
    CYGWIN*)
        cygwin=true
        ;;
esac

SCRIPT_DIR=$EXO_BASE_DIRECTORY/devel/eXoProjects/tools/trunk/build

if $cygwin ; then
	EXO_BASE_DIRECTORY=`cygpath -w $EXO_BASE_DIRECTORY`
	SCRIPT_DIR=`cygpath -w $EXO_BASE_DIRECTORY/eXoProjects/tools/trunk/build`
fi

CURRENT_DIR=`pwd`
JAVA_CMD=$JAVA_HOME/bin/java
echo $@
$JAVA_CMD $MAVEN_OPTS -classpath $SCRIPT_DIR/src/main/resources/java/js.jar \
          -Dexo.java.home=$JAVA_HOME \
          -Dexo.current.dir=$CURRENT_DIR \
          -Dexo.base.dir=$EXO_BASE_DIRECTORY  \
          -Dexo.m2.repos="file:$EXO_BASE_DIRECTORY/devel/exo-dependencies/repository, http://vnserver.exoplatform.org/maven2"  \
          -Dclean.server=$CLEAN_SERVER  \
          org.mozilla.javascript.tools.shell.Main $SCRIPT_DIR/src/main/javascript/eXo/eXo.js $@
