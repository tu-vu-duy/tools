@echo off

set BUILD_DIR=%EXO_BASE_DIRECTORY%\eXoProjects\tools\trunk\build
set CURRENT_DIR=%cd%
set JAVA_CMD=%JAVA_HOME%\bin\java

set JAVA_MEM_OPTS=-Xshare:auto -Xms128m -Xmx512m
set JAVA_CLASSPATH=-classpath %BUILD_DIR%\src\main\resources\java\js.jar

set EXO_OPTS=-Dexo.java.home=%BSH_JAVA_HOME% -Dexo.current.dir=%CURRENT_DIR%
set EXO_OPTS=%EXO_OPTS% -Dexo.base.dir=%EXO_BASE_DIRECTORY% 
set EXO_OPTS=%EXO_OPTS% -Dexo.working.dir=%EXO_WORKING_DIR%
set EXO_OPTS=%EXO_OPTS% -Dexo.src.dir=%EXO_PROJECTS_SRC%
set EXO_OPTS=%EXO_OPTS% -Dexo.dep.dir=%EXO_DEPENDENCIES_DIR%
set EXO_OPTS=%EXO_OPTS% -Dexo.m2.repos=%BSH_M2_REPOS%
 
java %JAVA_MEM_OPTS% %JAVA_CLASSPATH% %EXO_OPTS% org.mozilla.javascript.tools.shell.Main %BUILD_DIR%\src\main\javascript\eXo\eXo.js %*
