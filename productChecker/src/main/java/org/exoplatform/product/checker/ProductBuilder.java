package org.exoplatform.product.checker;

import java.util.List;

/**
 * Created by The eXo Platform SAS
 * Author : Alexey Zavizionov
 *          alexey.zavizionov@exoplatform.com.ua
 */
public class ProductBuilder {

  protected String info;

  public static Product getProduct(String name, String version) {
    Product product = new Product(name, version);
    try {
      product.setProductList(ProductExtractor.get(name, version));
    } catch (Exception e) {
      e.printStackTrace();
    }
    return product;
  }

  public static List<String> getAllVersions(String name) {
    return ProductExtractor.getAllVersions(name);
  }

  public static List<String> getAllProducts() {
    return ProductExtractor.getAllProducts();
  }

}
