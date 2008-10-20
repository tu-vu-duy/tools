package org.exoplatform.product.checker;

import java.io.File;
import java.util.List;

/**
 * Created by The eXo Platform SAS Author : Alexey Zavizionov
 * alexey.zavizionov@exoplatform.com.ua
 */
public class ProductChecker {

  public static boolean ISLOG = false;

  public static int check(String name, String version) {
    processExoprojects();

    if (ISLOG)
      System.out.println(">>> ProductChecker.main Start checking for = " + name + "." + version + " ...");

    Product product = ProductBuilder.getProduct(name, version);

    int errors = 0;

    List<Product> prodList = product.getProductList();
    for (Product productToCheck : prodList) {
      List<Product> prodList1 = product.getProductList();
      for (Product product1 : prodList1) {
        List<Product> prodList2 = product1.getProductList();
        for (Product product2 : prodList2) {
          if (productToCheck.getName().equalsIgnoreCase(product2.getName())) {
            if (!productToCheck.getVersion().equalsIgnoreCase(product2.getVersion())) {
              if (ISLOG) {
                System.out.println("----------------------------------------------");
                System.out.println(">>> ProductChecker.main Found different than  = " + productToCheck.getName()
                    + "." + productToCheck.getVersion());
                System.out.println(">>> ProductChecker.main        in the deps of = " + product1.getName() + "."
                    + product1.getVersion());
                System.out.println(">>> ProductChecker.main               product = " + product2.getName() + "."
                    + product2.getVersion());
              }
              errors++;
            }
          }
        }
      }
    }
    if (errors == 0) {
      if (ISLOG)
        System.out.println(">>> ProductChecker.main = Founded dependencies are correct!");
    }
    return errors;
  }

  public static int check(String name) {
    int errors = 0;
    List<String> versions = ProductBuilder.getAllVersions(name);
    for (String version : versions) {
      if (ISLOG)
        System.out.println(">>> ************************************************");
      errors += ProductChecker.check(name, version);
    }
    if (ISLOG)
      System.out.println(">>>");
    System.out.println(">>> ProductChecker.check All errors for " + name + " = " + errors);
    return errors;
  }

  public static int check() {
    int errors = 0;
    List<String> products = ProductBuilder.getAllProducts();
    for (String name : products) {
      if (ISLOG) {
        System.out.println("\n\n>>> ===================================================");
        System.out.println(">>> =       " + name + "                                    ".substring(name.length())
            + "      =");
        System.out.println(">>> ===================================================");
      }
      errors += check(name);
    }
    if (ISLOG)
      System.out.println(">>>");
    System.out.println(">>> ProductChecker.check All errors = " + errors);
    return errors;
  }

  private static void processExoprojects() {
    try {
      String exo = null;
      exo = System.getProperty("exo.projects.directory.src");
      if (exo == null) {
        File f = new File(".");
        exo = f.getCanonicalPath();
        if (exo.contains("tools")) {
          exo = exo.substring(0, exo.indexOf("tools") - 1);
        }
      }
      Constants.EXO_PROJECTS = exo;
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * @param args
   */
  public static void main(String[] args) {
    ISLOG = true;
    if (args.length == 0) {
      check();
    } else if (args.length == 1) {
      check(args[0]);
    } else {
      check(args[0], args[1]);
    }

//    check("jcr", "1.9.3");
//    check("jcr");
//    check();
  }

}
