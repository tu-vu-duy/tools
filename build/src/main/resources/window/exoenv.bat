@echo off

rem ##################### Working Environment ########################################

set PORTABLE_DIR=d:

rem ##################### VARIABLE TO CUSTOMIZE ########################################

set EXO_BASE_DIRECTORY=%PORTABLE_DIR%\java
set JAVA_HOME=%EXO_BASE_DIRECTORY%\jdk1.5

set BSH_M2_REPOS="file:%EXO_BASE_DIRECTORY%/exo-dependencies/repository, http://vnserver.exoplatform.org/maven2"

rem ##################################################################################

set EXO_PROJECTS_SRC=%EXO_BASE_DIRECTORY%\eXoProjects
set EXO_BAT_SCRIPT=%EXO_PROJECTS_SRC%\tools\trunk\build\src\main\resources\window
set EXO_WORKING_DIR=%EXO_BASE_DIRECTORY%\exo-working
set EXO_DEPENDENCIES_DIR=%EXO_BASE_DIRECTORY%\exo-dependencies

set M2_HOME=%EXO_BASE_DIRECTORY%\maven2
set M2_REPO=%EXO_BASE_DIRECTORY%\exo-dependencies\repository
set MAVEN_OPTS="-Xshare:auto -Xms128m -Xmx512m" 

set JAVA_OPTS="-Xshare:auto -Xms128m -Xmx256m -Dexo.directory.base=%EXO_BASE_DIRECTORY%" 
set PATH=%JAVA_HOME%\bin;%M2_HOME%\bin;%EXO_BAT_SCRIPT%;%PATH%
