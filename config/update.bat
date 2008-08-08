@echo off

REM place of this file in the root directory of eXo sources (e.g.: eXoProjects)

set EXO_PROJECTS_SRC_DIR=%~dp0

echo "Updating %EXO_PROJECTS_SRC_DIR% ..."
svn up
echo " eXo: %EXO_PROJECTS_SRC_DIR% DONE"

svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/kernel/branches kernel/branches
echo " eXo: kernel/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/core/branches core/branches
echo " eXo: core/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/ws/branches ws/branches
echo " eXo: ws/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/portlet-container/branches portlet-container/branches
echo " eXo: portlet-container/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/jcr/branches jcr/branches
echo " eXo: jcr/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/portal/branches portal/branches
echo " eXo: portal/branches DONE"
svn co http://svn.exoplatform.org/svnroot/exoplatform/projects/ecm/branches ecm/branches
echo " eXo: ecm/branches DONE"

echo "THE END"
pause null