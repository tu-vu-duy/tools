alias ls="ls --color"
alias cdhome="cd ~"
alias cdwinhome="cd $USER_HOME"
alias cdback='cd  $OLDPWD'

alias mvnrepoclean="rm -rf $M2_REPO/org/exoplatform/* "

alias mvnmodulecleaninstall="mvn clean install"
alias mvnmoduledeploy="mvn clean install exo:deploy "
alias mvnmoduledeployall="mvn clean install exo:deploy "


alias vibuild="vi $USER_HOME/build.properties"
alias visetting="vi $USER_HOME/.m2/settings.xml"

alias cdtomcat="cd $EXO_WORKING_DIR/exo-tomcat"
alias cdtomcatbin="cd $EXO_WORKING_DIR/exo-tomcat/bin"
alias tomcatClean="cd $EXO_WORKING_DIR/exo-tomcat/bin &&
                   rm -rf ../temp/* &&
                   rm -rf ../work/* &&
                   rm -rf ../logs/* "
   
alias tomcatRun="cd $EXO_WORKING_DIR/exo-tomcat/bin && chmod +x *.sh && ./exo-run.sh "

alias tomcatCleanRun="cd $EXO_WORKING_DIR/exo-tomcat/bin &&
		                  rm -rf ../temp/* &&
                      rm -rf ../work/* &&
                      rm -rf ../logs/*  &&
                      chmod +x *.sh && ./exo-run.sh "


alias tomcatPortletDeploy="mvn compile  jar:jar && cp target/*.jar  src/webapp/WEB-INF/lib/"
alias tomcatContextDeploy="cp src/resources/tomcat/*.xml  $EXO_WORKING_DIR/exo-tomcat/conf/Catalina/localhost/"

alias tomcat="exobsh.sh tomcat"
alias exobuild="exobsh.sh exobuild"
alias exosvn="exobsh.sh exosvn"
