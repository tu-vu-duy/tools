Deployment procedure of exo WebOS product on Tomcat 6 application server

Prerequisites
1. Make sure you have correct:
1.1. settings.xml. There should be the correct application server version (e.g <exo.projects.app.tomcat.version>) etc.
1.2. exo directory structure.
1.3. Maven version 2.0.4 (or higher).

Build procedure
1. Copy modules.xml from
<exo.projects.directory.src>\tools\trunk\config\
into
<exo.projects.directory.src>\
2. Go to
<exo.projects.directory.src>\
run
"mvn -f modules.xml clean install" command

Deploy procedure
=================================================
1. Go to
<exo.projects.directory.src>\tools\trunk\config\
run
"mvn clean install" command.
2. Go to
<exo.projects.directory.src>\tools\trunk\deploy\
run
"mvn -f product-exo-webos-as-tomcat6.xml clean install" command.
3. If the command has executed successfully, go to exo-tomcat and run "eXo run" command.
=================================================

Explanation.
Project list to build are in modules.xml,
"mvn -f modules.xml clean install" command will build all the projects
that WebOS depends on. If you need to add some project to build lifecycle please modify <exo.projects.directory.src>\tools\trunk\config\modules.xml
"mvn -f product-exo-webos-as-tomcat6.xml clean install" command will:
1. Place all the dependecies (jars and wars based on <exo.projects.directory.src>\tools\trunk\config\pom.xml) into
<exo.projects.directory.src>\tools\trunk\deploy\target folder. If you need to add some dependency please modify
<exo.projects.directory.src>\tools\trunk\config\pom.xml.
2. Rename some wars.
3. Copy tomcat server into exo-working directory (exo-working/exo-tomcat folder).
4. Copy jars and wars into exo-working/exo-tomcat folder.
5. Patch the tomcat that has been copied (deployed).
