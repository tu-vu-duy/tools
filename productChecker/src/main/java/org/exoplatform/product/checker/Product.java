package org.exoplatform.product.checker;

import java.util.List;

/**
 * Created by The eXo Platform SAS Author : Alexey Zavizionov
 * alexey.zavizionov@exoplatform.com.ua
 */
public class Product {

  protected String        name;

  protected String        version;

  protected List<Product> productList;

  public Product() {
  }

  public Product(String name, String version) {
    this.name = name;
    this.version = version;
    this.productList = null;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

  public List<Product> getProductList() {
    return productList;
  }

  public void setProductList(List<Product> productList) {
    this.productList = productList;
  }

  public void printInfo() {
    System.out.println(">>> Product.printInfo 1 = " + 1);
    System.out.println(">>> Product.printInfo this.name    = " + this.name);
    System.out.println(">>> Product.printInfo this.version = " + this.version);
  }

  @Override
  public String toString() {
    return super.toString() + ",name=" + this.name + ",version=" + this.version;
  }

}
