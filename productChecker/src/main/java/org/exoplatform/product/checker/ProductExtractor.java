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
 * Created by The eXo Platform SAS
 * Author : Alexey Zavizionov
 *          alexey.zavizionov@exoplatform.com.ua
 */
public class ProductExtractor {

//  public static Product get(String name, String version, String forName) {
//    System.out.println(">>> ProductExtractor.get Constants.EXO_PROJECTS = " + Constants.EXO_PROJECTS);
//    try {
//      String path = Constants.EXO_PROJECTS + "/" + name + "/" + version + "/pom.xml";
//      BufferedReader in = new BufferedReader(new FileReader(path));
//      String s, s2 = new String();
//      while ((s = in.readLine()) != null) {
//        if (s.contains(forName + ".version")) {
//          System.out.println(">>> ProductExtractor.get s = " + s);
//          String forVersion = s.substring(s.indexOf(">") + 1, s.lastIndexOf("<"));
//          System.out.println(">>> ProductExtractor.get forVersion = " + forVersion);
//          Product product = new Product(forName, forVersion);
//          return product;
//        }
//        s2 += s + "\n";
//      }
//      in.close();
//    } catch (Exception e) {
//      e.printStackTrace();
//    }
//
//    return null;
//  }

  public static List<Product> get(String name, String version) throws FileNotFoundException {
    try {
      String newName = convertProjectNameToFolderName(name);

      BufferedReader in = null;
      try {
        if (version.equalsIgnoreCase("trunk")) {
          String path = Constants.EXO_PROJECTS + "/" + newName + "/" + version + "/pom.xml";
          in = new BufferedReader(new FileReader(path));
        } else {
          String path = Constants.EXO_PROJECTS + "/" + newName + "/tags/" + version + "/pom.xml";
          in = new BufferedReader(new FileReader(path));
        }
      } catch (FileNotFoundException fnfe) {
        String path = Constants.EXO_PROJECTS + "/" + newName + "/branches/" + version + "/pom.xml";
        in = new BufferedReader(new FileReader(path));
      }

      String s, s2 = new String();
      List<Product> productList = new ArrayList<Product>();
      while ((s = in.readLine()) != null) {
        if (s.contains(".version>")) {
          String forVersion = s.substring(s.indexOf(">") + 1, s.lastIndexOf("<"));
          String forName = s.substring(s.indexOf("<") + 1, s.indexOf(".version"));
          forName = forName.substring(forName.lastIndexOf(".") + 1);
          if (forName.equalsIgnoreCase(name) || forName.equalsIgnoreCase(convertProjectNameToFolderName(name)))
            continue;
          if (forName.equalsIgnoreCase("platform"))
            continue;
          Product temp = new Product(forName, forVersion);
          try {
            List<Product> p = get(forName, forVersion);
            temp.setProductList(p);
            productList.add(temp);
          } catch (FileNotFoundException e) {
            if (isExoProduct(forName)) {
              if(ProductChecker.ISLOG)
              System.out.println(">>> ProductExtractor.get Not found product = " + e.getMessage()
                  + " for product  = " + name + "." + version);
            }
          }
        }
        s2 += s + "\n";
      }
      in.close();
      return productList;
    } catch (FileNotFoundException e) {
      throw new FileNotFoundException(name + "." + version);
    } catch (IOException e) {
      e.printStackTrace();

    }
    return null;
  }

  private static boolean isExoProduct(String forName) {
    return getAllProducts().contains(forName);
  }

  public static List<String> getAllProducts() {
    List<String> products = getFolderNames(Constants.EXO_PROJECTS);
    return products;
  }

  public static List<String> getAllVersions(String name) {
    List<String> versions = new ArrayList<String>();
    name = convertProjectNameToFolderName(name);
    String basePath = Constants.EXO_PROJECTS + "/" + name;
    List<String> folders = getFolderNames(basePath);
    for (String folder : folders) {
      if (!folder.equalsIgnoreCase("trunk")) {
        List<String> subFolders = getFolderNames(basePath + "/" + folder);
        for (String subFolderName : subFolders) {
          if (isValidProject(basePath + "/" + folder + "/" + subFolderName)) {
            versions.add(subFolderName);
          }
        }
      } else {
        if (isValidProject(basePath + "/" + folder))
          versions.add(folder);
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
          folderName = folderName.substring(folderName.lastIndexOf("/") + 1);
          dirs.add(folderName);
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    }
    return dirs;
  }

  private static boolean isValidProject(String path) {
    File f = new File(path + "/pom.xml");
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

}
