#!/bin/sh

# Computes the absolute path of eXo
cd `dirname "$0"`

# Sets some variables
LOG_OPTS="-Dorg.apache.commons.logging.Log=org.apache.commons.logging.impl.SimpleLog"
SECURITY_OPTS="-Djava.security.auth.login.config=../conf/jaas.conf"
EXO_CONFIG_OPTS="-Xshare:auto -Xms128m -Xmx512m -Dorg.exoplatform.container.configuration.debug -Duser.language=en -Duser.timezone=GMT+00:00"
EXO_DEBUG_OPTS="-Dorg.exoplatform.container.configuration.debug"
EXO_DEVELOPER_OPTS="-Dexo.product.developing=true"

JPDA_TRANSPORT=dt_socket
JPDA_ADDRESS=8000

REMOTE_DEBUG="-Xdebug -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n"

# For profiling
#LD_LIBRARY_PATH="/cygdrive/d/tools/YourKit/bin/win32/"
#PATH="$PATH:$LD_LIBRARY_PATH"
#export LD_LIBRARY_PATH
#YOURKIT_PROFILE_OPTION="-agentlib:yjpagent  -Djava.awt.headless=true"

JAVA_OPTS="$YOURKIT_PROFILE_OPTION $JAVA_OPTS $LOG_OPTS $SECURITY_OPTS $EXO_CONFIG_OPTS $EXO_DEBUG_OPTS $EXO_DEVELOPER_OPTS"
export JAVA_OPTS

# Launches the server
exec "$PRGDIR"./catalina.sh "$@"
