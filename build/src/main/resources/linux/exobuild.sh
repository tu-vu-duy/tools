#!/bin/bash

case "`uname`" in
CYGWIN*) cygwin=true;;
esac

function separator() {
  echo -------------------------------------------------------------------------
  echo        $1
  echo -------------------------------------------------------------------------
}

function executeTime() {
  let startTime=$(date +%s) 
  eval $@
  let stopTime=$(date +%s) 
  let runTime=$stopTime-$startTime
  separator "Total execution time is  $runTime seconds"
}

function  runTomcat() {
  cd  $EXO_WORKING_DIR/exo-tomcat/bin
  rm  -rf ../logs/*  ../temp/* && 
  chmod +x *.sh && ./startup.sh
  serverStarted=""
  while [ "" ==  "$serverStarted" ] 
  do
    sleep 5s
    serverStarted=`tail -n 1  $EXO_WORKING_DIR/exo-tomcat/logs/catalina.out | grep ".*Server startup in.*"`
    echo -n "....."
  done
  echo -e "Tomcat Server Status:  $serverStarted"
}

function  killTomcat() {
  tomcatServerId=""
  if [ $cygwin ] 
  then
    tomcatServerId=`ps af | grep java | awk '{print $1}'`
  else
    tomcatServerId=`ps afx | grep .*tomcat.* | grep catalina | awk '{print $1}'`
  fi

  if [ "$tomcatServerId" != "" ] 
  then  
    kill -9 $tomcatServerId   
    echo Kill tomcat server id  $tomcatServerId
  fi 
}

function  buildModules() {
  for module  in "$@" 
  do
    separator "Build and install the module $module"
    cd $EXO_SRC_CODE/$module &&  mvn clean install 
  done
}

function  updateModules() {
  for module  in "$@" 
  do
    separator "Updating the module $module"
    cd $EXO_SRC_CODE/$module &&  svn update
  done
}

function  printInstructions() {
  echo "Usage the exobuild command: "
  echo 
  echo "  exobuild --product=[product-name] [--update]  [--build-dependencies] [--test]"
  echo 
  echo "Options: "
  echo 
  echo "  * --product            is mandatory. The possible names are exo-portal, exo-portal-exp,"
  echo "                         exo-ecm, exo-ecm-exp"
  echo "  * --update             is optional. If you add this option, exobuild  will make a"
  echo "                         svn update before it builds"
  echo "  * --build-dependencies is optional. If you add this option, the exobuild command "
  echo "                         will build the dependant modules of the product,"
  echo "                         for example: exo-platform, exo-portlet-container... "
  echo "  * --test               is optional. The exobuild will run exo webunit test framework"
  echo "                         if you add this option"
}
#exobuild --product=exo-portal --update --build-dependencies --test

function  exobuild() {
  buildDependencies=false
  update=false
  runTest=false
  dependencyModules="exo-tools/build/config exo-tools/maven2/plugins/exo exo-platform exo-test"
  dependencyModules="$dependencyModules exo-portlet-container exo-sso"
  productModule=""
  productDescriptor=""
  mvnTestId=""

  for arg  in "$@" 
  do
    echo $arg
    if [ "$arg" == "--update" ]; then 
      update=true
    elif [ "$arg" == "--test" ]; then 
      runTest=true
    elif [ "$arg" == "--build-dependencies" ]; then 
      buildDependencies=true
    elif [ "$arg" == "--product=exo-portal" ]; then 
      productModule="exo-portal"
      productDescriptor="product-exo-portal.xml"
      mvnTestId="default"
    elif [ "$arg" == "--product=exo-portal-exp" ]; then 
      productModule="experiments/exo-portal"
      productDescriptor="product-exo-portal.xml"      
    elif [ "$arg" == "--product=exo-ecm" ]; then
      dependencyModules="$dependencyModules exo-jcr exo-portal"
      productModule="exo-ecm"
      productDescriptor="product-exo-ecm.xml"
      mvnTestId="ecm"
    elif [ "$arg" == "--product=exo-ecm-exp" ]; then
      dependencyModules="$dependencyModules exo-jcr experiments/exo-portal"
      productModule="experiments/exo-ecm"
      productDescriptor="product-exo-ecm.xml"
    fi 
  done

  if [ "$productModule" == "" ]; then
    printInstructions
    return
  fi

  separator "Stop Tomcat Server if there is one" && killTomcat 


  if [ $update == true ]; then
    if [ $buildDependencies == true ]; then
      executeTime updateModules $dependencyModules
    fi
    executeTime updateModules $productModule
  fi

  if [ $buildDependencies == true ]; then
    executeTime buildModules $dependencyModules
  fi

  executeTime buildModules $productModule &&

  separator "Deploy Product"  &&
  cd $EXO_SRC_CODE/$productModule && executeTime mvn -f $productDescriptor -Dclean deploy &&

  if [ $runTest == true ]; then
    separator "Start Tomcat Server" && runTomcat &&

    separator "Run Web unit test" && 
    cd $EXO_SRC_CODE/exo-test/webunit-suites/ && mvn -e exo:execute -DexecuteId=$mvnTestId &&

    separator "Kill Tomcat Server" && killTomcat 
  fi
}
