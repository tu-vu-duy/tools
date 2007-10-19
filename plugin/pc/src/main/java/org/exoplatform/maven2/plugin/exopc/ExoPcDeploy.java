/***************************************************************************
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.maven2.plugin.exopc;

import java.io.File;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;

import org.apache.maven.artifact.Artifact;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;
import org.exoplatform.maven2.plugin.Utils;
import org.apache.maven.archiver.MavenArchiveConfiguration;
import org.apache.maven.archiver.MavenArchiver;
import org.codehaus.plexus.archiver.ear.EarArchiver;
/** 
 * Created by The eXo Platform SARL
 * Author : Roman Pedchenko
 *          lautarul@gmail.com
 */
/**
 * @goal deploy
 * @requiresDependencyResolution runtime
 * @description mvn exopc:pc -Ddeploy=param for deploy PC standalone
 */
public class ExoPcDeploy extends AbstractMojo {   
  /**
   * @parameter expression="${exo.projects.directory.working}"
   * @required
   */
  private String workingDir;
  /**
   * The directory for the generated EAR.
   *
   * @parameter expression="${project.build.directory}"
   * @required
   */
  protected String outputDir;
  /**
   * @parameter
   */
  private String sharedDir;
  /**
   * @parameter expression="${deploy}"
   */
  private String deploy;
  /**
   * @parameter
   */
  private String excludeProjects;
  /**
   * @parameter
   */
  private String includeWars;
  /**
   * The name of the generated ear.
   *
   * @parameter expression="${project.build.finalName}"
   * @required
   */
  private String finalName;
  /**
   * @parameter expression="${project}"
   * @required
   */
  protected MavenProject project;
  /**
   * The Ear archiver.
   *
   * @parameter expression="${component.org.codehaus.plexus.archiver.Archiver#ear}"
   * @required
   */
  private EarArchiver earArchiver;
  /**
   * The maven archive configuration to use.
   *
   * @parameter
   */
  private MavenArchiveConfiguration archive = new MavenArchiveConfiguration();
  
  public void execute() throws MojoExecutionException{
//    if(!"exo-pc".equals(project.getPackaging())) printInfo() ;
    try {  
      if (deploy != null) {
        execDeploy() ;
        return;
      }
    }catch (Exception e) {
      e.printStackTrace() ;
    }
    printInfo() ;
  }   
  
  protected void makeEar(File earFile, File webappDir, String outDir) throws Exception {
    getLog().info( "Generating ear " + earFile.getAbsolutePath() );
    MavenArchiver archiver = new MavenArchiver();    
    archiver.setArchiver( earArchiver );
    archiver.setOutputFile( earFile );
    earArchiver.addDirectory(webappDir);
    earArchiver.setAppxml( new File(webappDir, "/META-INF/application.xml" ) );
    File manifest = new File(outDir + "/manifest.txt") ;
    getLog().info( "Creating manifest " + manifest.getAbsolutePath() );
    Utils.createManifest(manifest, project, getIgnoreProjects()) ;
    earArchiver.setManifest(manifest) ;
    archiver.createArchive(project, archive);
//    project.getArtifact().setFile(earFile);
  }

  protected HashSet<String> getSet(String hs) {
    HashSet<String> set = new HashSet<String>();
    if(hs != null) {
      String[] pro = hs.split(",");
      for(String s : pro) set.add(s.trim());
    }
    return set;
  }
  
  protected HashSet<String> getIgnoreProjects() {
    return getSet(excludeProjects);
  }
  
  protected HashSet<String> getIncludeWars() {
    return getSet(includeWars);
  }
  
  private void execDeploy() throws Exception {
    archive.setAddMavenDescriptor(false);
    if (deploy.equals("tomcat")) {
      File deployTomcatDirFile = new File(workingDir + "/exo-tomcat");
      deployTomcat(deployTomcatDirFile, getIgnoreProjects());
    } if (deploy.equals("tomcat6")) {
      File deployTomcatDirFile = new File(workingDir + "/exo-tomcat");
      deployTomcat6(deployTomcatDirFile, getIgnoreProjects());
    } else if(deploy.equals("ear")) {
      deployEar(outputDir, getIgnoreProjects());
    } else {
      Utils.printMessage("info","The task 'exopc:pc -Ddeploy=" + deploy+ "' is invalid !\n");
      printInfo();
    }
  }
  
  protected void deployTomcat(File deployTomcatDir, HashSet<String> ignoreProjects) throws Exception  {
    File directoryJar = new File(deployTomcatDir + "/common/lib");
    File directoryWar = new File(deployTomcatDir + "/webapps");
    directoryJar.mkdirs();
    directoryWar.mkdirs();
    Utils.deployedDependency2(directoryJar, directoryWar, null, project, ignoreProjects) ;
    if (sharedDir != null && !sharedDir.equals(""))
      Utils.patchConfig2(new File(sharedDir + "/tomcat"), deployTomcatDir);
  }
  
  protected void deployTomcat6(File deployTomcatDir, HashSet<String> ignoreProjects) throws Exception  {
    File directoryJar = new File(deployTomcatDir + "/lib");
    File directoryWar = new File(deployTomcatDir + "/webapps");
    directoryJar.mkdirs();
    directoryWar.mkdirs();
    Utils.deployedDependency2(directoryJar, directoryWar, null, project, ignoreProjects) ;
    if (sharedDir != null && !sharedDir.equals(""))
      Utils.patchConfig2(new File(sharedDir + "/tomcat"), deployTomcatDir);
  }
  
  protected void deployEar(String earDir, HashSet<String> ignoreProjects) throws Exception {
    File earFile =  new File(earDir + "/" + finalName + ".ear");
    File outDir = new File(outputDir + "/ear");
    outDir.mkdirs();
    Utils.deployedDependency2(outDir, outDir, outDir, project, ignoreProjects);
//    Utils.deployedDependency2(null, null, outDir, project, ignoreProjects);
//    Utils.deployedDependency3(outDir, project, getIncludeToEar());
//    Utils.deployProject(outDir, outDir, project, false, ignoreProjects);
    Utils.createApplicationXml2(outDir);
    if (sharedDir != null && !sharedDir.equals(""))
      Utils.patchConfig2(new File(sharedDir + "/ear"), outDir);
    makeEar(earFile, outDir, outputDir + "/ear");
  }
  
  private void printInfo() throws MojoExecutionException {
    String info =  
      "The 'exopc:deploy' maven2 plugin is used to assemble many exo modules into an application.\n" +
      "To run the command successfully, you need to\n" +
      "run the command in an exopc-war module and all the dependencies modules must be built\n" +
      "before running the command mvn exopc:deploy -Ddeploy=value\n\n" +
      "The valid syntax is:\n" +
      "  mvn exopc:deploy -Ddeploy=tomcat\n" +
      "  This command will copy the pc module and the dependency modules to the tomcat server.\n" +
      "  mvn exopc:deploy -Ddeploy=ear\n" +
      "  This command compiles pc standalone module EAR in 'target' directory.\n";
    System.out.println(info) ;
    throw new MojoExecutionException("") ;
  }
}
