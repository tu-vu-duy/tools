/***************************************************************************
 * Copyright 2001-2003 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.maven2.plugin;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.jar.JarOutputStream;

import org.apache.maven.artifact.Artifact;
import org.apache.maven.project.MavenProject;
import org.codehaus.plexus.util.FileUtils;

/**
 * Created by The eXo Platform SARL Author : Phung Hai Nam phunghainam@gmail.com
 * Dec 6, 2005
 */
public class Utils extends FileUtils {

  public static void deployProject(File dirJar, File dirWar, MavenProject project,
      boolean deployDep, HashSet<String> ignoreProjects) throws Exception {
    if (!dirJar.exists()) {
      System.out.println("The directory " + dirJar.getParent() + " does not exists !");
      return;
    }
    if (!dirWar.exists()) {
      System.out.println("The directory " + dirWar.getParent() + " does not exists !");
      return;
    }
    int counter = 0;
    if (deployDep) {
      counter += deployedDependency(dirJar, dirWar, project, ignoreProjects).size();
    }
    deleteFileOnExist(dirWar, project.getBuild().getFinalName());
    if (project.getPackaging().equals("jar")) {
      counter++;
      File moduleFile = new File(project.getBasedir().toString() + "/target/"
          + project.getArtifactId() + "-" + project.getVersion() + "." + project.getPackaging());
      copyFileToDirectory(moduleFile, dirJar);
      printMessage("deploy", "  Deployed file '" + project.getArtifactId() + "' to "
          + dirJar.getPath());
    } else {
      if (project.getPackaging().equals("war") || project.getPackaging().equals("exo-jcr")
          || project.getPackaging().equals("exo-portal")
          || project.getPackaging().equals("exo-portlet")) {
        File deployWar = new File(project.getBasedir().toString() + "/target/"
            + project.getBuild().getFinalName() + ".war");
        copyFileToDirectory(deployWar, dirWar);
        printMessage("deploy", "  Deployed file '" + project.getArtifactId() + "' to "
            + dirWar.getPath());
        counter++;
      }
    }
    printMessage("deploy", "  TOTAL DEPLOY : " + counter + " project");
  }

  public static HashSet<Artifact> deployedDependency(File dirJar, File dirWar,
      MavenProject project, HashSet<String> ignoreProjects) throws IOException {
    HashSet<Artifact> dependencies = new HashSet<Artifact>();
    Collection artifacts = project.getArtifacts();
    List list = new ArrayList();
    list.addAll(artifacts);
    Collections.sort(list);
    Iterator i = list.iterator();
    while (i.hasNext()) {
      Artifact da = (Artifact) i.next();
      if (!da.getScope().equalsIgnoreCase("test") && !ignoreProjects.contains(da.getArtifactId())) {
        String projectType = da.getType();
        if ("jar".equals(projectType)) {
          copyFileToDirectory(da.getFile(), dirJar);
          printMessage("deploy", "  Deployed file '" + da.getArtifactId() + "' to "
              + dirJar.getPath());
          dependencies.add(da);
        } else if (projectType.equals("war") || projectType.equals("exo-portal")
            || projectType.equals("exo-portlet") || dirWar != null) {
          String finalName = getFinalName(da.getArtifactId());
          deleteFileOnExist(dirWar, finalName.substring(0, finalName.lastIndexOf(".")));
          copyFileToDirectory(da.getFile(), dirWar);
          dependencies.add(da);
          File[] fileChild = dirWar.listFiles();
          for (int j = 0; j < fileChild.length; j++) {
            if (fileChild[j].getName().equals(da.getFile().getName())) {
              File reFile = new File(fileChild[j].getParent() + "/" + finalName);
              rename(fileChild[j], reFile);
              printMessage("deploy", "  Deployed file '" + da.getArtifactId() + "' to "
                  + dirWar.getPath());
            }
          }
        }
      }
    }
    return dependencies;
  }

  public static HashSet<Artifact> deployedDependency2(File dirJar, File dirWar, File dirRar,
      MavenProject project, HashSet<String> ignoreProjects) throws IOException {

    HashSet<Artifact> dependencies = new HashSet<Artifact>();
    Collection artifacts = project.getArtifacts();
    List list = new ArrayList();
    list.addAll(artifacts);
    Collections.sort(list);
    Iterator i = list.iterator();
    while (i.hasNext()) {
      Artifact da = (Artifact) i.next();
      if (!da.getScope().equalsIgnoreCase("test") && !ignoreProjects.contains(da.getArtifactId())) {
        String projectType = da.getType();
        if (projectType.equals("jar") && dirJar != null) {
          copyFileToDirectory(da.getFile(), dirJar);
          printMessage("deploy", "  Deployed file '" + da.getArtifactId() + "' to "
              + dirJar.getPath());
          dependencies.add(da);
        } else if (projectType.equals("rar") && dirRar != null) {
          copyFileToDirectory(da.getFile(), dirRar);
          printMessage("deploy", "  Deployed file '" + da.getArtifactId() + "' to "
              + dirRar.getPath());
          dependencies.add(da);
        } else if ((projectType.equals("war") || projectType.equals("exopc-war")) && dirWar != null) {
          String finalName = getFinalName(da.getArtifactId());
          File finalname = new File(dirWar + "/" + finalName);
          deleteFileOnExist(dirWar, finalName.substring(0, finalName.lastIndexOf(".")));
          copyFile(da.getFile(), finalname);
          dependencies.add(da);
          File[] fileChild = dirWar.listFiles();
          for (int j = 0; j < fileChild.length; j++) {
            if (fileChild[j].getName().equals(da.getFile().getName())) {
              File reFile = new File(fileChild[j].getParent() + "/" + finalName);
              rename(fileChild[j], reFile);
              printMessage("deploy", "  Deployed file '" + da.getArtifactId() + "' to "
                  + dirWar.getPath());
            }
          }
        }
      }
    }
    return dependencies;
  }

  public static HashSet<Artifact> deployedDependency3(File dirJar,
      MavenProject project, HashSet<String> onlyToInclude) throws IOException {

    HashSet<Artifact> dependencies = new HashSet<Artifact>();
    Collection artifacts = project.getArtifacts();
    List list = new ArrayList();
    list.addAll(artifacts);
    Collections.sort(list);
    Iterator i = list.iterator();
    while (i.hasNext()) {
      Artifact da = (Artifact) i.next();
      if (onlyToInclude.contains(da.getArtifactId())) {
        String projectType = da.getType();
        if (projectType.equals("jar") && dirJar != null) {
          copyFileToDirectory(da.getFile(), dirJar);
          printMessage("deploy", "  Deployed file '" + da.getArtifactId() + "' to "
              + dirJar.getPath());
          dependencies.add(da);
        }
      }
    }
    return dependencies;
  }

  public static String getFinalName(String name) {
    int in = name.lastIndexOf(".");
    if (in >= 0)
      name = name.substring(in + 1) + ".war";
    else
      name = name + ".war";
    return name;
  }

  public static void printMessage(String category, String message) {
    System.out.println("  [" + category + "]  " + message);
  }

  public static boolean containtFile(File parentDir, String childName) {
    String[] childFiles = parentDir.list();
    for (int i = 0; i < childFiles.length; i++) {
      if (childFiles[i].equals(childName))
        return true;
    }
    return false;
  }

  private static void deleteFileOnExist(File parentDir, String childName) throws IOException {
    if (containtFile(parentDir, childName)) {
      File fileOld = new File(parentDir.getPath() + "/" + childName);
      printMessage("delete", "  Deleted file " + fileOld);
      deleteDirectory(fileOld);
    }
    if (containtFile(parentDir, childName + ".war")) {
      File fileOld = new File(parentDir.getPath() + "/" + childName + ".war");
      printMessage("delete", "  Deleted file " + fileOld);
      fileOld.delete();
    }
  }

  public static int copyDirectoryStructure(File sourceDirectory, File destinationDirectory,
                                           HashSet<String> ignoreFiles) throws IOException {
    return copyDirectoryStructure(sourceDirectory, destinationDirectory, ignoreFiles, false);
  }

  public static int copyDirectoryStructure(File sourceDirectory, File destinationDirectory,
      HashSet<String> ignoreFiles, boolean overwrite) throws IOException {
    if (!sourceDirectory.exists()) {
      throw new IOException("Source directory doesn't exists (" + sourceDirectory.getAbsolutePath()
          + ").");
    }
    int counter = 0;
    File[] files = sourceDirectory.listFiles();
    String sourcePath = sourceDirectory.getAbsolutePath();
    for (int i = 0; i < files.length; i++) {
      File file = files[i];
      String dest = file.getAbsolutePath();
      dest = dest.substring(sourcePath.length() + 1);
      File destination = new File(destinationDirectory, dest);
      if (file.isFile()) {
        if (!ignoreFiles.contains(file.getName())) {
          // Removed this test as some files may need to be overwritten
          File fileInDst = new File(destination.getPath());
          if (fileInDst.exists()) {
            if (overwrite && file.lastModified() > fileInDst.lastModified()) {
              destination = destination.getParentFile();
              copyFileToDirectory(file, destination);
              counter++;
            }  if (!overwrite) {
              destination = destination.getParentFile();
              copyFileToDirectory(file, destination);
              counter++;
            }
          } else {
            destination = destination.getParentFile();
            copyFileToDirectory(file, destination);
            counter++;
          }
        }
      } else if (file.isDirectory()) {
        if (!ignoreFiles.contains(file.getName())) {
          if (!destination.exists() && !destination.mkdirs()) {
            throw new IOException("Could not create destination directory '"
                + destination.getAbsolutePath() + "'.");
          }
          counter += copyDirectoryStructure(file, destination, ignoreFiles, overwrite);
        }
      } else
        throw new IOException("Unknown file type: " + file.getAbsolutePath());
    }
    return counter;
  }

  public static int copyDirectoryStructure2(File sourceDirectory, File destinationDirectory,
      HashSet<String> ignoreFiles, boolean overwrite) throws IOException {
    if (!sourceDirectory.exists()) {
      throw new IOException("Source directory doesn't exists (" + sourceDirectory.getAbsolutePath()
          + ").");
    }
    int counter = 0;
    File[] files = sourceDirectory.listFiles();
    String sourcePath = sourceDirectory.getAbsolutePath();
    for (int i = 0; i < files.length; i++) {
      File file = files[i];
      String dest = file.getAbsolutePath();
      dest = dest.substring(sourcePath.length() + 1);
      File destination = new File(destinationDirectory, dest);
      if (file.isFile()) {
        if (!ignoreFiles.contains(file.getName())) {
          // Removed this test as some files may need to be overwritten
          /*File fileInDst = new File(destination.getPath());
          if (fileInDst.exists()) {
            if (overwrite || file.lastModified() > fileInDst.lastModified()) {
              destination = destination.getParentFile();
              copyFileToDirectory(file, destination);
              counter++;
            }
          } else {*/
            destination = destination.getParentFile();
            copyFileToDirectory(file, destination);
            counter++;
          //}
        }
      } else if (file.isDirectory()) {
        if (!ignoreFiles.contains(file.getName())) {
          if (!destination.exists() && !destination.mkdirs()) {
            throw new IOException("Could not create destination directory '"
                + destination.getAbsolutePath() + "'.");
          }
          counter += copyDirectoryStructure2(file, destination, ignoreFiles, overwrite);
        }
      } else
        throw new IOException("Unknown file type: " + file.getAbsolutePath());
    }
    return counter;
  }

  private static HashSet<Artifact> allDependencies(MavenProject project,
      HashSet<String> ignoreProjects) {
    if (ignoreProjects == null)
      ignoreProjects = new HashSet<String>();
    HashSet<Artifact> dependencies = new HashSet<Artifact>();
    Collection artifacts = project.getArtifacts();
    List list = new ArrayList();
    list.addAll(artifacts);
    Collections.sort(list);
    Iterator i = list.iterator();
    while (i.hasNext()) {
      Artifact da = (Artifact) i.next();
      if (!da.getScope().equalsIgnoreCase("test") && !ignoreProjects.contains(da.getArtifactId())) {
        dependencies.add(da);
      }
    }
    return dependencies;
  }

  public static HashSet<String> getDefaultIgnoreFiles() {
    HashSet<String> ignoreProjects = new HashSet<String>();
    ignoreProjects.add(".svn");
    return ignoreProjects;
  }

  public static void createManifest(File mf, MavenProject project, HashSet ignoredProjects)
      throws IOException {
    StringBuilder b = new StringBuilder();
    b.append("Manifest-Version: 1.0\n");
    b.append("Ant-Version: Apache Ant 1.5.3\n");
    b.append("Created-By: 1.5.0_04-b05 (Sun Microsystems Inc.)\n");
    b.append("Class-Path: ");
    if (checkTypes(project)) {
      for (Artifact da : allDependencies(project, ignoredProjects)) {
        if (da.getType().equals("jar")) {
          b.append(da.getArtifactId() + "-" + da.getVersion() + ".jar ");
        }
      }
    }
    b.append("\n");
    b.append("Built-By: exo\n");
    b.append("Specification-Title: " + project.getArtifactId() + "\n");
    b.append("Specification-Version: " + project.getVersion() + "\n");
    b.append("Specification-Vendor: eXo Platform SARL\n");
    b.append("Implementation-Title: " + project.getBuild().getFinalName() + "\n");
    b.append("Implementation-Version: " + project.getVersion() + "\n");
    b.append("Implementation-Vendor: eXo Platform SARL\n");
    FileOutputStream out = new FileOutputStream(mf);
    out.write(b.toString().getBytes());
    out.close();
  }

  public static void createManifest2(File mf, MavenProject project, HashSet includes)
      throws IOException {
    StringBuilder b = new StringBuilder();
    b.append("Manifest-Version: 1.0\n");
    b.append("Ant-Version: Apache Ant 1.5.3\n");
    b.append("Created-By: 1.5.0_04-b05 (Sun Microsystems Inc.)\n");
    if (includes != null) {
      b.append("Class-Path: ");
      for (Artifact da : allDependencies(project, null)) {
        if (da.getType().equals("jar") && includes.contains(da.getArtifactId())) {
          b.append(da.getArtifactId() + "-" + da.getVersion() + ".jar ");
        }
      }
      b.append("\n");
    }
    b.append("Built-By: exo\n");
    b.append("Specification-Title: " + project.getArtifactId() + "\n");
    b.append("Specification-Version: " + project.getVersion() + "\n");
    b.append("Specification-Vendor: eXo Platform SARL\n");
    b.append("Implementation-Title: " + project.getBuild().getFinalName() + "\n");
    b.append("Implementation-Version: " + project.getVersion() + "\n");
    b.append("Implementation-Vendor: eXo Platform SARL\n");
    FileOutputStream out = new FileOutputStream(mf);
    out.write(b.toString().getBytes());
    out.close();
  }

  public static void createApplicationXml(File earDir) throws IOException {
    File webInfDir = new File(earDir.getPath() + "/META-INF");
    webInfDir.mkdirs();
    StringBuilder b = new StringBuilder();
    b.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
    b
        .append("<!DOCTYPE application PUBLIC \"-//Sun Microsystems, Inc.//DTD J2EE Application 1.3//EN\" \"http://java.sun.com/dtd/application_1_3.dtd\">");
    b.append("\n<application>\n");
    b.append("  <display-name>exoplatform</display-name>\n");
    String[] file = earDir.list();
    for (int i = 0; i < file.length; i++) {
      if (!file[i].endsWith("war"))
        continue;
      int idx = file[i].indexOf('.');
      String context = file[i].substring(0, idx);
      b.append("  <module>\n");
      b.append("    <web>\n");
      b.append("      <web-uri>").append(file[i]).append("</web-uri>\n");
      b.append("      <context-root>").append(context).append("</context-root>\n");
      b.append("    </web>\n");
      b.append("  </module>\n");
    }
    b.append("</application>\n");
    FileOutputStream out = new FileOutputStream(webInfDir.getPath() + "/application.xml");
    out.write(b.toString().getBytes());
    out.close();
  }

  public static void createApplicationXml2(File earDir) throws IOException {
    File webInfDir = new File(earDir.getPath() + "/META-INF");
    webInfDir.mkdirs();
    StringBuilder b = new StringBuilder();
    b.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
    b
        .append("<!DOCTYPE application PUBLIC \"-//Sun Microsystems, Inc.//DTD J2EE Application 1.3//EN\" \"http://java.sun.com/dtd/application_1_3.dtd\">");
    b.append("\n<application>\n");
    b.append("  <display-name>exoplatform</display-name>\n");
    String[] file = earDir.list();
    for (int i = 0; i < file.length; i++) {
      if (file[i].endsWith("war")) {
        int idx = file[i].indexOf('.');
        String context = file[i].substring(0, idx);
        b.append("  <module>\n");
        b.append("    <web>\n");
        b.append("      <web-uri>").append(file[i]).append("</web-uri>\n");
        b.append("      <context-root>").append(context).append("</context-root>\n");
        b.append("    </web>\n");
        b.append("  </module>\n");
      } else
      if (file[i].endsWith("rar")) {
        b.append("  <module>\n");
        b.append("    <connector>").append(file[i]).append("</connector>\n");
        b.append("  </module>\n");
      } else
        continue;
    }
    b.append("</application>\n");
    FileOutputStream out = new FileOutputStream(webInfDir.getPath() + "/application.xml");
    out.write(b.toString().getBytes());
    out.close();
  }

  public static void patchConfig(File src, File dest) throws Exception {
    Utils.printMessage("copy", " Patching configuration from " + src.getName());
    copyDirectoryStructure(src, dest, getDefaultIgnoreFiles());
  }

  public static void patchConfig2(File src, File dest) throws Exception {
    Utils.printMessage("copy", " Patching configuration from " + src.getName());
    copyDirectoryStructure2(src, dest, getDefaultIgnoreFiles(), true);
  }

  private static boolean checkTypes(MavenProject project) {
    if (project.getPackaging().equals("war") || project.getPackaging().equals("exopc-war")
        || project.getPackaging().equals("ear")) {
      return true;
    }
    return false;
  }

  public static void removeManifestFromJar(File file) throws IOException {
    printMessage("delete", " Removing Manifest from archive " + file.getAbsolutePath());
    File tempJarFile = new File(file.getAbsolutePath() + ".tmp");
    JarFile jar = new JarFile(file);
    JarOutputStream tempJar = new JarOutputStream(new FileOutputStream(tempJarFile));

    byte[] buffer = new byte[1024];
    int bytesRead;

    for (Enumeration entries = jar.entries(); entries.hasMoreElements();) {
      JarEntry entry = (JarEntry) entries.nextElement();
      if (!"META-INF/MANIFEST.MF".equalsIgnoreCase(entry.getName())) {
        InputStream entryStream = jar.getInputStream(entry);
        tempJar.putNextEntry(entry);

        while ((bytesRead = entryStream.read(buffer)) != -1) {
          tempJar.write(buffer, 0, bytesRead);
        }
      }
    }

    jar.close();
    tempJar.close();
    file.delete();
    tempJarFile.renameTo(file);
  }
}
