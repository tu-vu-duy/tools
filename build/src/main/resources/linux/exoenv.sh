##################### Working Environment ##########################################
#PORTABLE_DIR=/Users/tuannguyen

##################### VARIABLE TO CUSTOMIZE ########################################
PORTABLE_DIR=`echo $PORTABLE_DIR | sed -e 's/\\\/\\//g'`
PORTABLE_DIR=`echo $PORTABLE_DIR | sed -e 's/\\/$//g'`
JAVA_DIR=$PORTABLE_DIR/java

cd $JAVA_DIR
EXO_BASE_DIRECTORY=$PWD
cd $OLDPWD
JAVA_HOME=$EXO_BASE_DIRECTORY/jdk1.5

BSH_EXO_BASE_DIRECTORY=$JAVA_DIR
BSH_JAVA_HOME=$JAVA_HOME
BSH_M2_REPOS="file:$BSH_EXO_BASE_DIRECTORY/exo-dependencies/repository, http://maven2.exoplatform.org/maven"

##################################################################################
USER_HOME='/cygdrive/c/Documents\ and\ Settings/$USERNAME'

EXO_PROJECTS_SRC=$EXO_BASE_DIRECTORY/eXoProjects
EXO_SH_SCRIPT=$EXO_PROJECTS_SRC/tools/trunk/build/src/main/resources/linux
EXO_WORKING_DIR=$EXO_BASE_DIRECTORY/exo-working

M2_HOME=$EXO_BASE_DIRECTORY/maven2
M2_REPO=$EXO_BASE_DIRECTORY/exo-dependencies/repository
M2_REPOS="file:$EXO_BASE_DIRECTORY/exo-dependencies/repository"
MAVEN_OPTS="-Xshare:auto -Xms128m -Xmx512m" 

#echo "This is a test"
JAVA_OPTS="-Xshare:auto -Xms128m -Xmx256m -Dexo.directory.base=$EXO_BASE_DIRECTORY" 
PATH=/usr/local/bin:$JAVA_HOME/bin:$PATH:$M2_HOME/bin:$EXO_SH_SCRIPT


export JAVA_OPTS JAVA_HOME M2_HOME M2_REPO MAVEN_OPTS M2_REPOS
export EXO_BASE_DIRECTORY EXO_PROJECTS_SRC  BSH_EXO_BASE_DIRECTORY  BSH_M2_REPOS BSH_JAVA_HOME
##################################################################################
# allways put and do not edit these following lines at the end this file 
################################################################################## 
if [ -e "$EXO_PROJECTS_SRC/tools/trunk/config/maven2/template-settings.xml" ] ; then
  JAVA_DIR_SUB=`echo $JAVA_DIR | sed -e 's/\\//\\\\\//g'`
  # echo $JAVA_DIR_SUB
  eval "sed -e 's/@java.dir@/$JAVA_DIR_SUB/g' $EXO_PROJECTS_SRC/tools/trunk/config/maven2/template-settings.xml > maven2/conf/settings.xml"
fi

if [ -e "${PORTABLE_DIR}/tools/env.sh" ] ; then
  source "${PORTABLE_DIR}/tools/env.sh"
fi

if [ -e "${EXO_SH_SCRIPT}/exoscript.sh" ] ; then
  source "${EXO_SH_SCRIPT}/exoscript.sh"
fi
