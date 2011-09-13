#!/bin/bash

function npatchhelp() {
      echo "Usage the npatch command:"
      echo "       npatch [--issue] [--patchdir]"
      echo 
      echo "Options: "
      echo 
      echo "*--issue       is optional. It is issue for create patch, if not, it is ramdom"
      echo "*--patchdir    is optional. It is dir of folder storage patch, if not --> current dir"
      echo 
}

function gotohelp() {
  echo "+ Goto projects: (We can use command for quick goto project)"
  echo " * ks22x ks21x ks12x kst ks2.1.x ... same for cs projects"
}

function tomcatHelp() {
  echo "+ Run tomcat:  "
  echo "        runtomcat [--version or --wk]"
  echo " * tcrun (or runtc): help you can quick run tomcat in project you doing"
  echo " * runtomcat (options): help you run tomcat via options is name of project ex: runtomcat --ks21x, runtomcat --ks22x v.v..."
  echo " If you not use options, the command will run same tcrun (or runtc)."
}

function qmhelp() {
  echo "+ Quickwar and Module"
  echo "* ctmodule : apply for build service of produce (build create a *.jar file). It will build produce --> replate new jar in lib/ of tomcat"
  echo "* ctquickwar : apply for build webapp of produce (build create a *.war file). It will build --> replate new war and remove old folder + old war in tomcat/webapps"
}

function cthelp() {
  echo
  echo "Wellcome command working for eXo Collaboration."
  echo
  echo "Feature : "
  echo
  gotohelp
  echo
  tomcatHelp
  echo
  qmhelp
  echo 
  npatchhelp
  echo "==========Using command cthelp for display this help.==========="
}

CM_DIR=$EXO_PROJECTS_SRC/tools/trunk/build/src/main/resources/linux
EXO_KS=$EXO_PROJECTS_SRC/ks
EXO_KS_TRUNK=$EXO_KS/trunk
EXO_KS_22X=$EXO_KS/branches/2.2.x
EXO_KS_21X=$EXO_KS/branches/2.1.x
EXO_KS_12X=$EXO_KS/branches/1.2.x

EXO_CS=$EXO_PROJECTS_SRC/cs
EXO_CS_TRUNK=$EXO_CS/trunk
EXO_CS_22X=$EXO_CS/branches/2.2.x
EXO_CS_21X=$EXO_CS/branches/2.1.x
EXO_CS_13X=$EXO_CS/branches/1.3.x
CRPRJ=""
EXO_TOMCAT_DIR=$EXO_WORKING_DIR/tomcat

alias ks="CD $EXO_KS"
alias kst="cd $EXO_KS_TRUNK && export CRPRJ=$EXO_KS_TRUNK"
alias ks12x="cd $EXO_KS_12X  && export CRPRJ=$EXO_KS_12X"
alias ks21x="cd $EXO_KS_21X && export CRPRJ=$EXO_KS_21X"
alias ks22x="cd $EXO_KS_22X && export CRPRJ=$EXO_KS_22X"

alias cs="cd $EXO_CS && export CRPRJ=$EXO_CS"
alias cst="cd $EXO_CS_TRUNK && export CRPRJ=$EXO_CS_TRUNK"
alias cs13x="cd $EXO_CS_13X && export CRPRJ=$EXO_CS_13X"
alias cs21x="cd $EXO_CS_21X && export CRPRJ=$EXO_CS_21X"
alias cs22x="cd $EXO_CS_22X && export CRPRJ=$EXO_CS_22X"

alias eclipse="$JAVA_DIR/eclipse/eclipse &"
alias mdfcm="gedit $CM_DIR/exoct.sh &"
alias udcm="cd $EXO_PROJECTS_SRC/tools/trunk/build/src/main/resources/linux && svn up && cdback"
alias cicm="cd $EXO_PROJECTS_SRC/tools/trunk/build/src/main/resources/linux && eval 'svn ci -m \"Update tools collaboration\"' && cdback"
alias mdfsetting="gedit $JAVA_DIR/maven2.2.1/conf/settings.xml &"
alias mdfalias="gedit $EXO_PROJECTS_SRC/tools/trunk/build/src/main/resources/linux/exoalias.sh &"
alias cdtomcat="cd $EXO_TOMCAT_DIR"
alias cdcm="cd $EXO_PROJECTS_SRC/tools/trunk/build/src/main/resources/linux"
alias optomcat="nautilus $EXO_TOMCAT_DIR"

alias tomcatClean="cd $EXO_TOMCAT_DIR/ &&
                                 rm -rf temp &&
		                             rm -rf gatein/data &&
                                 rm -rf gatein/logs &&
                                 rm -rf work &&
                                 rm -rf logs && cdback"
alias tomcatCleanRun="tomcatClean && runtomcat"
alias runtc="runtomcat"
alias tcrun="runtomcat"

function crash() {
  vs=$1
  if [ "$vs" != "" ]; then 
    CD $vs
  fi
  eval "getCrproject $PWD"
  export EXO_TOMCAT_DIR="$CRPRJ/packaging/pkg/target/tomcat"
  cdback
  if [  -e "$EXO_TOMCAT_DIR/webapps/crsh.shell.jcr-1.0.0-beta17.war" ]; then 
      INFO "Run crash version 1.0.0-beta17"
     else
      getCrsh
  fi
  sleep 10s 
  eval "telnet localhost 5000"
}

function getCrsh() {
   crdir="$JAVA_DIR/exo-dependencies/repository/org/crsh/crsh.shell.jcr/1.0.0-beta17"
   if [  -e "$crdir/crsh.shell.jcr-1.0.0-beta17.war" ]; then
     cp $crdir/crsh.shell.jcr-1.0.0-beta17.war $EXO_TOMCAT_DIR/webapps/
     chmod +x  $EXO_TOMCAT_DIR/webapps/crsh.shell.jcr-1.0.0-beta17.war
     INFO "Run crash version 1.0.0-beta17"
     return
   else
     eval "mkdir -p -m 777 $crdir"
     cd $crdir
     wget "http://repository.exoplatform.org/service/local/repositories/crsh-releases/content/org/crsh/crsh.shell.jcr/1.0.0-beta17/crsh.shell.jcr-1.0.0-beta17.war"
     cdback
     sleep 5s 
     getCrsh
   fi
}

function INFO() {
 echo "[INFO] [$1]"
}

function getCrproject() {
 DIR=$1;
 TDIR=""
 ODIR=$PWD
  if [  -e "$DIR/packaging/pom.xml" ]; then
      export CRPRJ=$DIR
      if [  -e "$DIR/packaging/pkg/target/tomcat" ]; then
        export EXO_WORKING_DIR=$DIR/packaging/pkg/target
        export EXO_TOMCAT_DIR=$EXO_WORKING_DIR/tomcat
      elif [  -e "$DIR/packaging/pkg/target/exo-tomcat" ]; then
        export EXO_WORKING_DIR=$DIR/packaging/pkg/target
        export EXO_TOMCAT_DIR=$EXO_WORKING_DIR/exo-tomcat
      else 
        export EXO_WORKING_DIR=$EXO_PROJECTS_SRC/exo-working
        export EXO_TOMCAT_DIR=$EXO_WORKING_DIR/tomcat
      fi
  else
      TDIR=${DIR/$EXO_PROJECTS_SRC/}
       cd $DIR && cd ../
       DIR=$PWD
       cd $ODIR
      if [ ${#TDIR} -gt 	9 ]; then
         eval "getCrproject $DIR "
      else
         INFO "Can not get project dir. You must use command for goto project, Ex: ks22x."
      fi
  fi
}

function CD() {
src=""
  for arg	in "$@"
    do
      if [  -e "$arg" ]; then
          cd "$arg"
     else
          src="${arg/--/}" 
          src="${src//./}"
          eval "$src"
      fi
  done 
}

function runtomcat() {
  project=$1
  SRC=""
  oldprj="$CRPRJ"
  if [  "$project" == "" ]; then
     eval "runByOtherDir $PWD"
     return
  elif [	 "$project" == "--wk" ]; then
      eval "tcstart $EXO_WORKING_DIR"
      return
  else 
      eval "runByParam $project"
  fi
}

function runByOtherDir() {
  DIR=$1;
  oldprj="$CRPRJ"
  eval "getCrproject $DIR"
  DIR="$CRPRJ"
  CRPRJ=$oldprj
  eval "tcstart $DIR/packaging/pkg/target"
}

function runByParam() {
  project=$1;
  project="${project/--/}"
  project="${project/-/}" 
  project="${project//./}"
  oldprj=$CRPRJ
  olddir=$PWD
  eval "$project"
  SRC=$PWD
  CRPRJ=$oldprj
  cd $olddir 
  eval "tcstart $SRC/packaging/pkg/target"
}

function tcstart() {
  SRC=$1
  if [  -e "$SRC/tomcat/bin/gatein-dev.sh" ]; then
     export EXO_TOMCAT_DIR=$SRC/tomcat
     export EXO_WORKING_DIR=$SRC
     eval   "INFO 'Run tomcat in $SRC' && $SRC/tomcat/bin/gatein-dev.sh run" 
  elif [  -e "$SRC/exo-tomcat/bin/eXo.sh" ]; then
     export EXO_WORKING_DIR=$SRC
     export EXO_TOMCAT_DIR=$EXO_WORKING_DIR/exo-tomcat/
     eval   "INFO 'Run tomcat in $SRC' && $SRC/exo-tomcat/bin/eXo-dev.sh run" 
  else
       INFO   "Can not get tomcat dir. You must use command for goto project for set tomcat dir, Ex: ks22x... and run again this command"
       INFO   "Or use command runtomcat --project+version, Ex: runtomcat --ks22x or runtomcat -wk for run tomcat in exo-working"
  fi
}

function npatch() {
  patchdir=$PWD
  issue="$(date -u +%h%M)"
  for arg	in "$@" 
	  do
		  if [ ${#arg} -gt 	20  ]; then 
        patchdir="${arg/--patchdir=/}"
      elif [	${#arg} -gt 	8 ]; then
        issue="${arg/--issue=/}"
      elif [	 "$arg" == "--help" ]; then
        npatchhelp
        return
      fi 
	  done
  INFO "Create new patch for issue: $issue (file name: $(date -u +%Y-%m-%d)-$issue.patch) And save into folder : $patchdir"
  svn diff > $patchdir/$(date -u +%Y-%m-%d)-$issue.patch
  return
}

function updatebuilds() {
src=""
 for arg	in "$@" 
	do
    src="${arg/--/}"
    src="${src//./}"
    eval "$src" &&
    INFO "Updating now $PWD" && svn up &&  mvn clean install && cdback
	done
 return
}

function updates() {
src=""
 for arg	in "$@" 
	do
    src="${arg/--/}" 
    src="${src//./}"
    eval "$src" &&
    INFO "Updating now $PWD" &&  svn up && cdback
	done
 return
}

function builds() {
src=""
 for arg	in "$@" 
	do
    src="${arg/--/}" 
    src="${src//./}"
    eval "$src" &&
    INFO "Building now $PWD" &&  mvn clean install && cdback
	done
 return
}

function ctmodule () {
   help=$1
   if [ "$help" == "--help" ]; then 
      qmhelp
   fi
    INFO "Building project $PWD"
    mvn clean install
    eval "getCrproject $PWD"
    tomcatdir=$CRPRJ/packaging/pkg/target/tomcat
    INFO "Copy file jar into $tomcatdir/lib"
    cp target/*.jar tomcatdir/lib
    cd tomcatdir/tomcat/lib
    find -depth -name *sources.jar -exec rm -rf {} \; 
    cdback
}


function ctquickwar () {
   help=$1
   if [ "$help" == "--help" ]; then 
      qmhelp
   fi
   nowDir=$PWD
   INFO "Building project $PWD"
   mvn clean install
   eval "getCrproject $PWD"
   tomcatdir=$CRPRJ/packaging/pkg/target/tomcat
   temp=$(find -depth -name *.war)
   temp="${temp/.\/target\//}"
   temp="${temp/.war/}"
   INFO "Copy file $temp.war into $tomcatdir/webapps"
   cp target/$temp.war $tomcatdir/webapps
   chmod +x  $tomcatdir/webapps/* -R
   INFO "Remove old folder $temp"
   rm -rf $tomcatdir/webapps/$temp/
}

function ctHelp () {
  echo "Usage the ct command: "
  echo 
  echo "  ct [--product-name] [--version]  [--update]  [--build] [--install] [--buildnottc] [--test] [--test=true/false] [--tomcatdir=target]"
  echo 
  echo "Options: "
  echo 
  echo "  * --product-name     is optional. The possible names are --ks or --cs"
  echo "  * --version          is optional but when you add it, you must add the --product-name."
  echo "                         The possible names are --1.2.x/1.3.x/2.1.x/2.2.x/trunk or --12x/13x/21x/22x/trunk"
  echo "  * --update  / --up   is optional. If you add this option, exobuild will make a svn update before it builds"
  echo "  * --build            is optional. If you add this option, the exobuild command mvn clean install"
  echo "  * --buildnottc       is optional. If you add this option, the exobuild produce but not create the tomcat "
  echo "  * --test             is optional. If you add this option, the exobuild will only run exo webunit test framework"
  echo "  * --test=true/false  is optional. If you add this option, the exobuild produce but you can choise is run test or not"
  echo "  * --tomcatdir        is optional. If you add this option, you can set tomcat dir, if not add tomcat dir default is /pkg/target dir. Only use for 2.0 and more"
  echo 
  echo "Example: "
  echo "  ct  --ks --2.2.x --update --buildnottc --test=false"
  echo "  ct  --update --install --test=true --tomcatdir=/home/exo/java/exo-working (run in current dir)"
  echo "  ct  --update (run mvn clean install in current dir)"
  echo "  ct  --buildnottc (run mvn clean install -P !pkg-tomcat in current dir)"
  echo "  ct  --ks -12x (go to ks/branches/1.2.x)"
  echo "  ct  --ks -12x --update --build (go to ks/branches/1.2.x and update and build and create exo-tomcat in pkg/target)"
  echo 
  echo " Luck for you ^^ Contac for me via duytucntt@gmail.com "
  echo 
}

function  ct() {
	project=" "
	version=" "
	update=" "
	typecm=" "
	tcdir=" "
  tomcatdir=""
	istest=" "
	istomcat=true;
	isOldvs=false;
  isHelp=true;
  newrepo="";
  eclipse=" ";
  debug="";
	for arg	in "$@" 
		do
			 isHelp=false
			if [ "$arg" == "--start" ]; then
				ctStart
        return

			elif [ "$arg" == "--ks" ]; then
				project="$EXO_KS"
			elif [ "$arg" == "--cs" ]; then
				project="$EXO_CS"

			elif [ "$arg" == "--help" ]; then
				ctHelp
				return;

			elif [ "$arg" == "--trunk" ]; then 
				version="trunk"
			elif [ "$arg" == "--12x" ]; then 
				isOldvs=true
				version="branches/1.2.x"
			elif [ "$arg" == "--13x" ]; then 
				isOldvs=true
				version="branches/1.3.x"
			elif [ "$arg" == "--21x" ]; then 
				version="branches/2.1.x"
			elif [ "$arg" == "--22x" ]; then 
				version="branches/2.2.x"
			elif [ "$arg" == "--1.2.x" ]; then 
				version="branches/1.2.x"
			elif [ "$arg" == "--1.3.x" ]; then 
				version="branches/1.3.x"
			elif [ "$arg" == "--2.1.x" ]; then 
				version="branches/2.1.x"
			elif [ "$arg" == "--2.2.x" ]; then 
				version="branches/2.2.x"

			elif [ "$arg" == "--up" ]; then 
				update="svn up"
			elif [ "$arg" == "--update" ]; then 
				update="svn up"

			elif [ "$arg" == "--build" ]; then 
				typecm="mvn clean install"
			elif [ "$arg" == "--install" ]; then 
				typecm="mvn clean install"
			elif [ "$arg" == "--test" ]; then 
				typecm="mvn clean test"
			elif [ "$arg" == "--debug" ]; then 
				debug="-Dmaven.surefire.debug=true"
			elif [	${#arg} -gt 	17 ]; then
				tcdir="${arg/-tomcatdir/Dgatein.working.dir}"
        tomcatdir="${arg/--tomcatdir=/}"
			elif [ "$arg" == "--buildnottc" ]; then 
				typecm="mvn clean install -P !pkg-tomcat"
				istomcat=false
      elif [ "$arg" == "--tomcat=false" ]; then 
				typecm="$typecm -P !pkg-tomcat"
        istomcat=false
			elif [ "$arg" == "--onlytomcat" ]; then 
				typecm="cd packaging/pkg/ && mvn clean install"

			elif [ "$arg" == "--test=true" ]; then 
				istest="-Dmaven.test.skip=false"
			elif [ "$arg" == "--test=false" ]; then 
				istest="-Dmaven.test.skip=true"

			elif [ "$arg" == "--newrepo=true" ]; then 
				newrepo="-U"
			elif [ "$arg" == "--U" ]; then 
				newrepo="-U"
			elif [ "$arg" == "-U" ]; then 
				newrepo="-U"

			elif [ "$arg" == "--eclipse" ]; then 
				eclipse="mvn eclipse:eclipse"

			elif [ "$arg" == "--module" ]; then 
				ctmodule
        return
			elif [ "$arg" == "--quickwar" ]; then 
				ctquickwar
        return
			fi 
	done

	if [ $isHelp == true ]; then 
		ctHelp
		return
	fi

	if [ "$project" != " " ]; then
		INFO "go to project: $project"
		cd $project
	fi

	if [ "$version" != " " ]; then
		 INFO "go to version: $version"
		cd $version
	fi

	if [ "$update" != " " ]; then
		INFO "updating: $PWD"
		 eval "$update"
	fi

	if [ "$typecm" != " " ]; then
			if [ $isOldvs == true ]; then
					eval "$typecm $istest -Ppkg-tomcat=tomcat"
					return
			fi

		 if [ $istomcat == true ]; then
			 INFO "Run command: $typecm $newrepo $istest $debug $tcdir"
			 if [ "$tcdir" != " " ]; then 
					eval "mkdir -p -m 777 $tomcatdir"
			 fi
			 eval "$typecm $newrepo $istest $debug $tcdir"
		 else
			 INFO "Run command: $typecm $newrepo $debug $istest"
			 eval "$typecm $newrepo $istest $debug"
		 fi
	fi

	if [ "$eclipse" != " " ]; then
		INFO "eclipse:eclipse	$PWD"
		 eval "$eclipse"
	fi
  
	return
}

