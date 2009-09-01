#alias ls="ls -G"
alias cdhome="cd ~"
alias cdwinhome="cd $USER_HOME"
alias cdback='cd  $OLDPWD'

alias mvnrepoclean="rm -rf $M2_REPO/org/exoplatform/* $M2_REPO/javax/portlet/*"

alias cdtomcat="cd $EXO_WORKING_DIR/exo-tomcat"
alias cdtomcatbin="cd $EXO_WORKING_DIR/exo-tomcat/bin"
alias tomcatClean="cd $EXO_WORKING_DIR/exo-tomcat/bin &&
                   rm -rf ../temp/* &&
                   rm -rf ../work/* &&
                   rm -rf ../logs/* "
   
alias tomcatRun="cd $EXO_WORKING_DIR/exo-tomcat/bin && chmod +x *.sh && ./eXo.sh run"
alias tomcatCleanRun="cd $EXO_WORKING_DIR/exo-tomcat/bin &&
		                  rm -rf ../temp/* &&
                      rm -rf ../work/* &&
                      rm -rf ../logs/*  &&
                      chmod +x *.sh && ./eXo.sh run "

alias openfireRun="cd $EXO_WORKING_DIR/exo-openfire/bin && chmod +x openfire && ./openfire start"

alias exoproject="js.sh exoproject"

alias exobuild="js.sh exobuild"
alias exosvn="js.sh exosvn"
alias rmdb="rm -rf $EXO_WORKING_DIR/exo-tomcat/temp/data"

alias jbossRun="cd $EXO_WORKING_DIR/exo-jboss/bin && chmod +x *.sh && ./eXo.sh run"