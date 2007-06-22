/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.explorer;

import org.exoplatform.swing.Application;
import org.exoplatform.swing.Plugin;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 16, 2007  
 */
public class FileExplorerPlugin implements Plugin {
  final static public String NAME = "ExplorerWorkspacePlugin" ; 
  private ExplorerViewPlugin fileExplorerViewPlugin_ ;
  private OpenedFileViewPlugin  openedFileViewPlugin_ ;
  private ListOpenedFileViewPlugin  listOpenedFileViewPlugin_ ;
  
  public FileExplorerPlugin() {
    
  }
  
  public String getName() { return NAME; }

  public String getDescription() { return "File Explorer And Viewer Workspace"; }

  public ExplorerViewPlugin getExplorerViewPlugin() { return fileExplorerViewPlugin_ ; }
  
  public OpenedFileViewPlugin getOpenedFileViewPlugin() { return openedFileViewPlugin_ ;}
  
  public void onInitApplication(Application app) throws Exception {
    fileExplorerViewPlugin_ = new ExplorerViewPlugin() ;
    openedFileViewPlugin_ = new OpenedFileViewPlugin() ;
    listOpenedFileViewPlugin_ = new ListOpenedFileViewPlugin() ;
    //app.getWorkspaces().addView(openedFileViewPlugin_) ;
    
    app.getControlSpace().addView(fileExplorerViewPlugin_) ;
    app.getControlSpace().addView(listOpenedFileViewPlugin_) ;
  }
  
  public void onDestroyApplication(Application app) throws Exception {
    fileExplorerViewPlugin_ = null ;
    openedFileViewPlugin_ = null ;
    listOpenedFileViewPlugin_ = null ;
  }
}
