/***************************************************************************
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.maven2.plugin.exopc;

import java.io.File;
import java.util.HashSet;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.codehaus.plexus.util.FileUtils;
import org.exoplatform.maven2.plugin.Utils;
import org.apache.maven.archiver.MavenArchiver;
import org.apache.maven.archiver.MavenArchiveConfiguration;
import org.apache.maven.project.MavenProject;
import org.codehaus.plexus.archiver.war.WarArchiver;

/**
 * Created by The eXo Platform SARL
 * Author : Roman Pedchenko
 *          lautarul@gmail.com
 */
/**
 * @goal war
 * 
 * @requiresDependencyResolution runtime
 * @description mvn exopc:war 
 */
public class ExoPCWar extends AbstractMojo {
  /**
   * The directory for the generated WAR.
   *
   * @parameter expression="${project.build.directory}"
   * @required
   */
  protected String outputDirectory;
  /**
   * Single directory for extra files to include in the WAR.
   *
   * @parameter expression="${basedir}/src/main/webapp"
   * @required
   */
  private File warSourceDirectory;
  /**
   * The name of the generated war.
   *
   * @parameter expression="${project.build.finalName}"
   * @required
   */
  private String warName; 
  /**
   * @parameter
   */
  private String excludeProjects;
  /**
   * The Jar archiver.
   *
   * @parameter expression="${component.org.codehaus.plexus.archiver.Archiver#war}"
   * @required
   */
  private WarArchiver warArchiver;
  /**
   * The maven archive configuration to use.
   *
   * @parameter
   */
  private MavenArchiveConfiguration archive = new MavenArchiveConfiguration();
  /**
   * @parameter expression="${project}"
   * @required
   */
  protected MavenProject project;
  
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
  
  protected void performPackaging(File warFile, File webappDir) throws Exception {
    getLog().info( "Generating war " + warFile.getAbsolutePath() );
    MavenArchiver archiver = new MavenArchiver();
    archiver.setArchiver( warArchiver );
    archiver.setOutputFile( warFile );
    warArchiver.addDirectory(webappDir);
    warArchiver.setWebxml( new File(webappDir, "WEB-INF/web.xml" ) );
    File manifest = new File(outputDirectory + "/manifest.txt") ;
    Utils.createManifest(manifest, project, getIgnoreProjects());
    warArchiver.setManifest(manifest) ;
    // create archive
    archive.setAddMavenDescriptor(false);
    archiver.createArchive(project, archive);
    project.getArtifact().setFile(warFile);
  }

  public void execute() throws MojoExecutionException {
    try{
      File webappDest = new File(outputDirectory + "/" + warName) ;
      Utils.copyDirectoryStructure(warSourceDirectory, webappDest, Utils.getDefaultIgnoreFiles());
      //copy classes 
      File classesSrc = new File(outputDirectory +  "/classes") ;
      if(!classesSrc.exists()) classesSrc.mkdir() ;
      File webappClassDest = new File(outputDirectory + "/" + warName + "/WEB-INF/classes") ;
      if(!webappClassDest.exists()) webappClassDest.mkdir() ;
      FileUtils.copyDirectoryStructure(classesSrc, webappClassDest);
//      File libDir = new File(outputDirectory + "/" + warName + "/WEB-INF/lib") ;
//      if(!libDir.exists()) libDir.mkdir() ;
//      Utils.deployedDependency3(libDir, project, getIncludes()) ;
      
      File warFile = new File( outputDirectory, warName + ".war" );
      performPackaging(warFile, webappDest);
    } catch (Exception exe) {
      throw new MojoExecutionException("Error", exe) ;
    }
  }
}
