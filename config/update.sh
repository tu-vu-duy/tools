#!/bin/bash

# place of this file in the root directory of eXo sources (e.g.: eXoProjects)

EXO_PROJECTS_SRC_DIR=`pwd | awk '{i=split($0, Name, "/") ; print(Name[i])}'`
#echo EXO_PROJECTS_SRC_DIR = $EXO_PROJECTS_SRC_DIR

echo "Updating $EXO_PROJECTS_SRC_DIR ..."
#cd ..
#svn co http://svn.exoplatform.org/svnroot/exoplatform/projects $EXO_PROJECTS_SRC_DIR
#cd $EXO_PROJECTS_SRC_DIR
svn up
echo " eXo: $EXO_PROJECTS_SRC_DIR DONE"

svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/kernel/tags kernel/tags
echo " eXo: kernel/tags DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/kernel/branches kernel/branches
echo " eXo: kernel/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/core/tags core/tags
echo " eXo: core/tags DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/core/branches core/branches
echo " eXo: core/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/ws/tags ws/tags
echo " eXo: ws/tags DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/ws/branches ws/branches
echo " eXo: ws/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/portlet-container/tags portlet-container/tags
echo " eXo: portlet-container/tags DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/portlet-container/branches portlet-container/branches
echo " eXo: portlet-container/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/jcr/tags jcr/tags
echo " eXo: jcr/tags DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/jcr/branches jcr/branches
echo " eXo: jcr/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/portal/tags portal/tags
echo " eXo: portal/tags DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/portal/branches portal/branches
echo " eXo: portal/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/ecm/tags ecm/tags
echo " eXo: ecm/tags DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/ecm/branches ecm/branches
echo " eXo: ecm/branches DONE"

echo "THE END"
read
