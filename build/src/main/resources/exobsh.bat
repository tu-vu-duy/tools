@echo off
set CURRENT_DIR=%cd%
set BSH_CLASSPATH=-classpath %EXO_BSH%/lib/bsh-2.0b4.jar
set JAVA_SYS_PROPS=-Dexo.base.dir=%EXO_BASE_DIRECTORY% -Dexo.current.dir=%CURRENT_DIR% -Dexo.java.home=%JAVA_HOME%
set JAVA_SYS_PROPS=%JAVA_SYS_PROPS% -Dexo.m2.repos=%M2_REPOS%

java %BSH_CLASSPATH% %JAVA_SYS_PROPS% bsh.Interpreter %EXO_BSH%/script/eXo/eXo.bsh %*
