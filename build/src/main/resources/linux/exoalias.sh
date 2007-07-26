alias ls="ls --color"
alias cdhome="cd ~"
alias cdwinhome="cd $USER_HOME"
alias cdback='cd  $OLDPWD'

alias mvnrepoclean="rm -rf $M2_REPO/org/exoplatform/* "

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

alias exoproject="js.sh exoproject"
alias exobuild="js.sh exobuild"
alias exosvn="exobsh.sh exosvn"
alias rmdb="rm -rf d:/java/exo-working/exo-tomcat/temp/data"