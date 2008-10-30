package org.exoplatform.product.checker;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by The eXo Platform SAS Author : Alexey Zavizionov
 * alexey.zavizionov@exoplatform.com.ua
 */
public class ProductExtractor {

  private static String       EXO_PROJECTS = null; //"/home/hudson/eXoProjects"; 

  private static List<String> allProducts  = null;

  public static Product get(String name, String version) throws FileNotFoundException {
    ProductExtractor.processExoprojects();
    try {

      String newName = convertProjectNameToFolderName(name);

      if (!isExoProduct(newName))
        return null;

      Product product = new Product(name, version);

      BufferedReader in = null;
      String path = ProductExtractor.EXO_PROJECTS + File.separator + newName
          + File.separator;
      try {
        if (version.equalsIgnoreCase(getTrunkVersion(path))) {
          in = new BufferedReader(new FileReader(path + "trunk" + File.separator + "pom.xml"));
        } else {
          in = new BufferedReader(new FileReader(path + "tags" + File.separator + version
              + File.separator + "pom.xml"));
        }
      } catch (FileNotFoundException fnfe) {
        in = new BufferedReader(new FileReader(path + "branches" + File.separator + version
            + File.separator + "pom.xml"));
      }

      String s;
      String s2 = new String();
      List<Product> productList = new ArrayList<Product>();
      product.setProductList(productList);
      while ((s = in.readLine()) != null) {
        if (s.contains(".version>")) {
          String forVersion = s.substring(s.indexOf(">") + 1, s.lastIndexOf("<"));
          String forName = s.substring(s.indexOf("<") + 1, s.indexOf(".version"));
          forName = forName.substring(forName.lastIndexOf(".") + 1);
          if (forName.equalsIgnoreCase(name)
              || forName.equalsIgnoreCase(convertProjectNameToFolderName(name)))
            continue;
          if (forName.equalsIgnoreCase("platform"))
            continue;
          try {
            Product temp = get(forName, forVersion);
            if (temp != null)
              productList.add(temp);
          } catch (FileNotFoundException e) {
            if (isExoProduct(forName)) {
              if (ProductChecker.ISLOG)
                System.out.println(">>> ProductExtractor.get Not found product = " + e.getMessage()
                    + " for product  = " + name + "." + version);
            }
          }
        }
        s2 += s + "\n";
      }
      in.close();
      return product;
    } catch (FileNotFoundException e) {
      throw new FileNotFoundException(name + "." + version);
    } catch (IOException e) {
      e.printStackTrace();

    }
    return null;
  }

  private static String getTrunkVersion(String path) {
    path += "trunk" + File.separator + "pom.xml";
    try {
      BufferedReader in = new BufferedReader(new FileReader(path));
      String s;
      while ((s = in.readLine()) != null) {
        if (s.contains("<parent>")) {
          String s2;
          while ((s2 = in.readLine()) != null) {
            if (s2.contains("</parent>"))
              break;
          }
        }
        if (s.contains("<version>")) {
          s = s.substring(s.indexOf("<version>") + "<version>".length(), s.indexOf("</"));
          return s;
        }
      }
      in.close();
    } catch (FileNotFoundException e) {
      return null;
    } catch (IOException e) {
      return null;
    }
    return null;
  }

  private static boolean isExoProduct(String forName) {
    return getAllProducts().contains(forName);
  }

  public static List<String> getAllProducts() {
    if (ProductExtractor.allProducts != null)
      return ProductExtractor.allProducts;
    ProductExtractor.processExoprojects();
    List<String> products = getFolderNames(ProductExtractor.EXO_PROJECTS);
    ProductExtractor.allProducts = products;
    return products;
  }

  public static List<String> getAllVersions(String name) {
    ProductExtractor.processExoprojects();
    List<String> versions = new ArrayList<String>();
    name = convertProjectNameToFolderName(name);

    String basePath = ProductExtractor.EXO_PROJECTS + File.separator + name;
    List<String> folders = getFolderNames(basePath);
    for (String folder : folders) {
      if (!folder.equalsIgnoreCase("trunk")) {
        List<String> subFolders = getFolderNames(basePath + File.separator + folder);
        for (String subFolderName : subFolders) {
          if (isValidProject(basePath + File.separator + folder + File.separator
              + subFolderName)) {
            versions.add(subFolderName);
          }
        }
      } else {
        if (isValidProject(basePath + File.separator + folder)) {
          versions.add(getTrunkVersion(basePath + File.separator));
        }
      }
    }
    return versions;
  }

  public static List<String> getFolderNames(String path) {
    List<String> dirs = new ArrayList<String>();
    File dir = new File(path);
    File[] list = dir.listFiles();
    Arrays.sort(list);
    for (File file : list) {
      if (file.isDirectory() && !file.isHidden()) {
        try {
          String folderName = file.getCanonicalPath();
          folderName = folderName.substring(folderName.lastIndexOf(File.separator) + 1);
          dirs.add(folderName);
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    }
    return dirs;
  }

  private static boolean isValidProject(String path) {
    File f = new File(path + File.separator +"pom.xml");
    return f.exists();
  }

  private static String convertProjectNameToFolderName(String name) {
    String newName = name;
    if (newName.equalsIgnoreCase("pc"))
      newName = newName.replaceAll("pc", "portlet-container");
    if (newName.equalsIgnoreCase("tool"))
      newName = newName.replaceAll("tool", "tools");
    return newName;
  }

  public static void processExoprojects() {
    if (ProductExtractor.EXO_PROJECTS == null) {
      try {
        String exo = null;
//      exo = System.getProperty("exo.projects.directory.src");
        if (exo == null) {
          File f = new File(".");
          exo = f.getCanonicalPath();
          if (exo.contains("tools")) {
            exo = exo.substring(0, exo.indexOf("tools") - 1);
          }
        }
        ProductExtractor.EXO_PROJECTS = exo;
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

}
