#!/bin/bash

function helpAll() {
  echo
  echo "Wellcome command working for eXo Collaboration."
  echo
  echo "Feature : "
  echo
  echo "+ Goto projects: (We can use command for quick goto project)"
  echo " * ks22x ks21x ks12x kst ks2.1.x ... same for cs projects"
  echo "+ Run tomcat:  "
  echo " * tcrun (or runtc): help you can quick run tomcat in project you doing"
  echo " * runtomcat (options): help you run tomcat via options is name of project ex: runtomcat --ks21x, runtomcat --ks22x v.v..."
  echo " If you not use options, the command will run same tcrun (or runtc)."
  echo
  echo
}

helpAll
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

alias crash="cp $EXO_WORKING_DIR/crsh.war $EXO_WORKING_DIR/tomcat/webapps/ && sleep 10s && telnet localhost 5000"
alias eclipse="$JAVA_DIR/eclipse/eclipse &"
alias mdfcm="gedit $CM_DIR/exoct.sh &"

alias runtc="runtomcat"
alias tcrun="runtomcat"

function runtomcat() {
  project=$1
  SRC=""
  oldprj="$CRPRJ"
  if [  "$project" == "" ]; then
      if [ "$CRPRJ" != "" ]; then
         SRC="$CRPRJ"
      else 
        SRC="$PWD" 
      fi
  else 
      project="${project/--/}"
      project="${project/-/}" 
      project="${project//./}"
      eval "$project"
      SRC=$PWD
      CRPRJ=$oldprj
      cdback 
  fi
  eval "runTC $SRC"
}

function runTC() {
 DIR=$1;
 TDIR=""
 ODIR=$PWD
  if [  -e "$DIR/packaging/pkg/target/tomcat/bin/gatein-dev.sh" ]; then
           eval "INFO 'runtomcat in project: $DIR' && $DIR/packaging/pkg/target/tomcat/bin/gatein-dev.sh run"
  else
      TDIR=${DIR/$EXO_PROJECTS_SRC/}
       cd $DIR && cd ../
       DIR=$PWD
       cd $ODIR
      if [ ${#TDIR} -gt 	9 ]; then
         eval "runTC $DIR "
      else
       echo   "Can not get tomcat dir. You must use command for goto project for set tomcat dir, Ex: ks22x."
       echo   "Or use command runtomcat --project+version, Ex: runtomcat --ks22x"
      fi
  fi
}

function INFO() {
 echo "[INFO] [$1]"
}

function getSources() {
srt="abc"
expr index  "abc cong hoa xa hoi chu nghia viet nam  xxx" "$str"
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
      echo "Usage the npatch command:"
      echo "       npatch [--issue] [--patchdir]"
      echo 
      echo "Options: "
      echo 
      echo "*--issue       is optional. It is issue for create patch, if not, it is ramdom"
      echo "*--patchdir    is optional. It is dir of folder storage patch, if not --> current dir"
      echo 
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

function runCt() {
  src="$1"
  src="${src/--/}" 
  src="${src//./}"
  eval "$src" &&
  echo "[INFO] [Run tomcat in project $PWD]" && ./packaging/pkg/target/tomcat/bin/gatein-dev.sh run 
}

function builds() {
src=""
 for arg	in "$@" 
	do
    src="${arg/--/}" 
    src="${src//./}"
    eval "$src" &&
    INFO "Updating now $PWD" &&  mvn clean install && cdback
	done
 return
}

function deployModule () {
  gtnproject --deploy=module
  cd $EXO_WORKING_DIR/tomcat/lib
  find -depth -name *sources.jar -exec rm -rf {} \; 
  cdback
}


function deployQuickwar () {
   mvn clean install
   cp target/*.war $EXO_WORKING_DIR/tomcat/webapps
   cd $EXO_WORKING_DIR/tomcat/webapps
   mkdir -p ../../temp 
   chmod +x ../../temp -R
   cp -rf examples host-manager integration manager ROOT zzzstarter ../../temp
   find -depth -maxdepth 1 -mindepth 1 -type d -exec rm -rf {} \; 
   cp -rf ../../temp/* ../webapps
   rm -rf ../../temp 
   chmod +x * -R
   cdback
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
  echo "Extension: ct --module and ct --quickwar "
  echo "Note: only apply when you storage tomcat in ...java/exo-working and apply for vesion 2.0 and more"
  echo "If you want create  tomcat in this folder, you can edit maven/conf/setting.xml."
  echo 
  echo "* --module : apply for build service of produce (build create a *.jar file). It will build produce --> replate new jar in lib/ of tomcat"
  echo "* --quickwar : apply for build webapp of produce (build create a *.war file). It will build --> replate new war and remove old folder + old war in tomcat/webapps"
  echo " Luck for you ^^ Contac for me via duytucntt@gmail.com "
  echo 
}

function ctStart() {
  eclipse
  firefox
  /usr/bin/chromium-browser %U
  updates --ks21x --ks22x --cs21x --cs22x
  cs22x
  ct --buildnottc
  ct --ks --22x --buildnottc
  return
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
				typecm="mvn clean test -Dmaven.surefire.debug=true"
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
				deployModule
        return
			elif [ "$arg" == "--quickwar" ]; then 
				deployQuickwar
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
			 INFO "Run command: $typecm $newrepo $istest $tcdir"
			 if [ "$tcdir" != " " ]; then 
					eval "mkdir -p -m 777 $tomcatdir"
			 fi
			 eval "$typecm $newrepo $istest $tcdir"
		 else
			 INFO "Run command: $typecm $newrepo $istest"
			 eval "$typecm $newrepo $istest"
		 fi
	fi

	if [ "$eclipse" != " " ]; then
		INFO "eclipse:eclipse	$PWD"
		 eval "$eclipse"
	fi
  
	return
}

