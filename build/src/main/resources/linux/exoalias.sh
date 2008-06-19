alias ls="ls --color"
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

alias exoproject="js.sh exoproject"

alias exobuild="js.sh exobuild"
#alias exosvn="exobsh.sh exosvn"
alias exosvn="js.sh exosvn"
alias rmdb="rm -rf $EXO_WORKING_DIR/exo-tomcat/temp/data"

alias bdECM.trunk="cd $JAVA_DIR/eXoProjects/ecm/trunk &&
									 exobuild --product=ecm --exclude=all --update --build --deploy"
alias allECM.trunk="cd $JAVA_DIR/eXoProjects/ecm/trunk &&
									 exobuild --product=ecm --update --build --deploy"
alias bdECM.2.0="cd $JAVA_DIR/eXoProjects/ecm/branches/2.0 &&
								 exobuild --product=ecm --exclude=all --build --update --deploy --version=2.0"		
alias allECM.2.0="cd $JAVA_DIR/eXoProjects/ecm/branches/2.0 &&
									exobuild --product=ecm --update --build --deploy --version=2.0"
alias bPortal.trunk="cd $JAVA_DIR/eXoProjects/portal/trunk &&
									 exobuild --product=portal --exclude=all --update --build"
alias bPortal.2.0.2="cd $JAVA_DIR/eXoProjects/portal/branches/2.0.1 &&
									 exobuild --product=portal --update --build --version=2.0.1"									
alias ecm="cd $JAVA_DIR/eXoProjects/ecm"
alias portal="cd $JAVA_DIR/eXoProjects/portal"
alias wcm="cd $JAVA_DIR/eXoProjects/wcm"
alias tools="cd $JAVA_DIR/eXoProjects/tools/trunk"
alias jcr="cd $JAVA_DIR/eXoProjects/jcr"
alias core="cd $JAVA_DIR/eXoProjects/core"
alias kernel="cd $JAVA_DIR/eXoProjects/kernel"
alias src="cd $JAVA_DIR && source exoenv.new.sh"
alias root="cd $JAVA_DIR/eXoProjects"