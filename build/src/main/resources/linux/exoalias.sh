#alias ls="ls -G"
alias cdhome="cd ~"
alias cdwinhome="cd $USER_HOME"
alias cdback='cd  $OLDPWD'

alias mvnrepoclean="rm -rf $M2_REPO/org/exoplatform/* $M2_REPO/javax/portlet/*"
source exoct.sh
alias cdtomcat="cd $EXO_WORKING_DIR/tomcat"
alias cdtomcatbin="cd $EXO_WORKING_DIR/tomcat/bin"
alias tomcatClean="cd $EXO_WORKING_DIR/tomcat/ &&
                   rm -rf temp &&
		               rm -rf gatein/data &&
                   rm -rf gatein/logs &&
                   rm -rf work &&
                   rm -rf logs && cdback"
   
alias tomcatRun="$EXO_WORKING_DIR/tomcat/bin/gatein.sh run"
alias tomcatCleanRun="tomcatClean && gtnrun"

alias openfireRun="cd $EXO_WORKING_DIR/exo-openfire/bin && chmod +x openfire && ./openfire start"

alias exoproject="js.sh exoproject"
alias gtnproject="js.sh gtnproject"

alias exobuild="js.sh exobuild"
alias exosvn="js.sh exosvn"
alias rmdb="rm -rf $EXO_WORKING_DIR/exo-tomcat/temp/data"

alias jbossRun="cd $EXO_WORKING_DIR/exo-jboss/bin && chmod +x *.sh && ./eXo.sh run"

alias gtnrun="$EXO_WORKING_DIR/tomcat/bin/gatein-dev.sh run"
alias gtncleanrun="cd $EXO_WORKING_DIR/tomcat &&
                   rm -rf temp/* work/* logs/* gatein/data &&
                   cdback && gtnrun"
alias module="gtnproject --deploy=module && cd $EXO_WORKING_DIR/tomcat/lib &&  find -depth -name *sources.jar -exec rm -rf {} \; && cdback"
alias quickks="mvn clean install -Dmaven.test.skip=true &&
             cp target/*.war $EXO_WORKING_DIR/tomcat/webapps &&
             cd $EXO_WORKING_DIR/tomcat/webapps &&
	     find -depth -maxdepth 1 -mindepth 1 -type d -exec rm -rf {} \; &&
	     cp -rf $EXO_WORKING_DIR/tempks/* $EXO_WORKING_DIR/tomcat/webapps &&
	     chmod +x * -R && cdback"
alias quickcs="mvn clean install &&
             cp target/*.war $EXO_WORKING_DIR/tomcat/webapps &&
             cd $EXO_WORKING_DIR/tomcat/webapps &&
	     find -depth -maxdepth 1 -mindepth 1 -type d -exec rm -rf {} \; &&
	     cp -rf $EXO_WORKING_DIR/tempcs/* $EXO_WORKING_DIR/tomcat/webapps &&
	     chmod +x * -R && cdback"

alias war12x="mvn clean install &&
             cp target/*.war ../../../packaging/pkg/target/exo-tomcat/webapps &&
             cd ../../../packaging/pkg/target/exo-tomcat/webapps &&
	     mkdir ../../temp && chmod +x ../../temp -R && 
	     cp -rf examples host-manager manager ROOT ../../temp &&
	     find -depth -maxdepth 1 -mindepth 1 -type d -exec rm -rf {} \; &&
	     cp -rf ../../temp/* ../webapps && rm -rf ../../temp &&
	     chmod +x * -R && cdback"

alias cdprs="cd $EXO_PROJECTS_SRC"

alias cdfml="cd $EXO_PROJECTS_SRC/hongxanh/myfamily/trunk"
alias cdhx="cd $EXO_PROJECTS_SRC/hongxanh"


alias mdfalias="gedit $EXO_PROJECTS_SRC/tools/trunk/build/src/main/resources/linux/exoalias.sh &"
alias mdfnote="gedit $EXO_PROJECTS_SRC/Dropbox/Public/Notes.txt &"


alias mvnclin="mvn clean install"
alias mvninstall="mvn clean install -Dmaven.test.skip=true"
alias mvnbuildnottc="mvn clean install -Dmaven.test.skip=true -P !pkg-tomcat"
alias mvnnottomcat="mvn clean install -P !pkg-tomcat"
alias mvntomcattarget="mvn clean install -Dgatein.working.dir=target"
alias mvntest="mvn clean test"
alias mvneclipse="mvn eclipse:eclipse"
alias mvnclean="mvn eclipse:clean"

alias cdpathfile="cd $PATCH_FILES/"
alias crpatch='if [ $JIRA_NUMBER == "TEMP" ]; then export JIRA_NUMBER="$(date -u +%h%M)"; fi &&
               echo "Tao file diff cho issue: $JIRA_NUMBER Va save xuong thu muc: $PATCH_FILES" &&
	       svn diff > $PATCH_FILES/$(date -u +%Y-%m-%d)-$JIRA_NUMBER.patch'

alias crnowpatch='if [ $JIRA_NUMBER == "TEMP" ]; then echo "Ban chua nhap ten issue, nhap = lenh export JIRA_NUMBER=ten issue, hien tai issue la ngau nhien"; fi &&
		  if [ $JIRA_NUMBER == "TEMP" ]; then export JIRA_NUMBER="$(date -u +%h%M)"; fi &&
                  echo "Tao file diff cho issue: $JIRA_NUMBER (name file: $(date -u +%Y-%m-%d)-$JIRA_NUMBER.patch)Va save xuong thu muc: $PWD" && 
                  svn diff > $PWD/$(date -u +%Y-%m-%d)-$JIRA_NUMBER.patch'

alias mdfpath='if [ $JIRA_NUMBER == "$(date -u +%h%M)" ]; then gedit $JIRA_NUMBER.patch; fi && 
      if [ $JIRA_NUMBER != "$(date -u +%h%M)" ]; then gedit $PATCH_FILES/$(date -u +%Y-%m-%d)-$JIRA_NUMBER.patch; fi'

alias opsrc="nautilus $EXO_PROJECTS_SRC"
alias opwkd="nautilus $EXO_WORKING_DIR"
alias opjava="nautilus $JAVA_DIR"


alias savealias="cp $EXO_PROJECTS_SRC/tools/trunk/build/src/main/resources/linux/exoalias.sh $EXO_PROJECTS_SRC/Dropbox/NotesFiles/exoalias.sh"
alias udalias="cp $EXO_PROJECTS_SRC/Dropbox/NotesFiles/exoalias.sh $EXO_PROJECTS_SRC/tools/trunk/build/src/main/resources/linux/exoalias.sh"

alias dlloging="cp $EXO_WORKING_DIR/logging.properties $EXO_WORKING_DIR/tomcat/conf/logging.properties"

