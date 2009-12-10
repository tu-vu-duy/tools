rem @echo off

rem #####################VARIABLE TO CUSTOMIZE########################################
set EXO_BASE_DIRECTORY=%cd%
set JAVA_HOME=%EXO_BASE_DIRECTORY%\jdk1.5

rem ##################################################################################

set EXO_V2X_CODE=%EXO_BASE_DIRECTORY%\eXoProjects
set EXO_BSH=%EXO_V2X_CODE%\tools\os\bsh
set EXO_WORKING_DIR=%EXO_BASE_DIRECTORY%\exo-working

set M2_HOME=%EXO_BASE_DIRECTORY%\maven2
set M2_REPOS="file:%EXO_BASE_DIRECTORY%\exo-dependencies\repository, http://vnserver.exoplatform.org/maven2"
set MAVEN_OPTS="-Xshare:auto -Xms128m -Xmx512m" 
set BONITA_HOME=%EXO_WORKING_DIR%\exo-jonas\bonita

set JAVA_OPTS="-Xshare:auto -Xms128m -Xmx512m" 
set PATH=%JAVA_HOME%/bin;%PATH%;%M2_HOME%/bin;%EXO_BSH%

rem ##################### CONSOLE ENVIRONMENT ########################################
set PROMPT=%USERNAME%$$$G

