@echo off

set BSH_DIR=%EXO_BASE_DIRECTORY%\eXoProjects\tools\trunk\build
set CURRENT_DIR=%cd%
set JAVA_CMD=%JAVA_HOME%\bin\java

set JAVA_MEM_OPTS=-Xshare:auto -Xms128m -Xmx512m
set JAVA_CLASSPATH=-classpath %BSH_DIR%\src\main\resources\java\bsh-2.0b4.jar
set BSH_OPTS=-Dexo.java.home=%BSH_JAVA_HOME% -Dexo.current.dir=%CURRENT_DIR%
set BSH_OPTS=%BSH_OPTS% -Dexo.base.dir=%EXO_BASE_DIRECTORY% -Dexo.m2.repos=%BSH_M2_REPOS%  
java %JAVA_MEM_OPTS% %JAVA_CLASSPATH% %BSH_OPTS% bsh.Interpreter %BSH_DIR%\src\main\script\eXo\eXo.bsh %*
