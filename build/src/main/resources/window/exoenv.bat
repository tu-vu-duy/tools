@echo off

rem ##################### Working Environment ########################################

set PORTABLE_DIR=d:

rem ##################### VARIABLE TO CUSTOMIZE ########################################

set EXO_BASE_DIRECTORY=%PORTABLE_DIR%\java
set JAVA_HOME=%EXO_BASE_DIRECTORY%\jdk1.5

set EXO_PROJECTS_SRC=%EXO_BASE_DIRECTORY%\eXoProjects
set EXO_BAT_SCRIPT=%EXO_PROJECTS_SRC%\tools\trunk\build\src\main\resources\window
set EXO_WORKING_DIR=%EXO_BASE_DIRECTORY%\exo-working
set EXO_DEPENDENCIES_DIR=%EXO_BASE_DIRECTORY%\exo-dependencies

set CLEAN_SERVER=tomcat-6.0.10

set M2_HOME=%EXO_BASE_DIRECTORY%\maven2
set M2_REPOS="file:%EXO_DEPENDENCIES_DIR%/repository, http://maven2.exoplatform.org/rest/maven2"

rem MAVEN_OPTS will be used as JVM options for the build by 'exobuild' command
set MAVEN_OPTS="-Xshare:auto -Xms128m -Xmx512m -XX:MaxPermSize=256M" 

rem JAVA_OPTS will be used by tomcat
set JAVA_OPTS="-Xshare:auto -Xms128m -Xmx256m -Dexo.directory.base=%EXO_BASE_DIRECTORY%" 
set PATH=%JAVA_HOME%\bin;%M2_HOME%\bin;%EXO_BAT_SCRIPT%;%PATH%
