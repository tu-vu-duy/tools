@echo off

rem Computes the absolute path of eXo
setlocal ENABLEDELAYEDEXPANSION
for %%i in ( !%~f0! ) do set BIN_DIR=%%~dpi
cd %BIN_DIR%

rem Sets some variables
set LOG_OPTS="-Dorg.apache.commons.logging.Log=org.apache.commons.logging.impl.SimpleLog"
set SECURITY_OPTS="-Djava.security.auth.login.config=..\conf\jaas.conf"
set EXO_CONFIG_OPTS="-Xshare:auto -Xms128m -Xmx512m -Dorg.exoplatform.container.configuration.debug -Duser.language=en -Duser.timezone=GMT+00:00"
set EXO_DEBUG_OPTS="-Dorg.exoplatform.container.configuration.debug"
set EXO_DEVELOPER_OPTS="-Dexo.product.developing=true"

set JAVA_OPTS= %LOG_OPTS% %SECURITY_OPTS% %EXO_CONFIG_OPTS% %EXO_DEBUG_OPTS% %EXO_DEVELOPER_OPTS%
set JPDA_TRANSPORT=dt_socket
set JPDA_ADDRESS=8000

rem Launches the server
call catalina.bat %*
