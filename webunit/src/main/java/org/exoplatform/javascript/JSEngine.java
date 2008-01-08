/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.javascript;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringReader;
import java.io.Writer;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.ImporterTopLevel;
import org.mozilla.javascript.Script;
/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * May 24, 2007
 */
public class JSEngine {
  private Map<String, Script> scripts_ = new HashMap<String, Script>();

  public JSEngine() {

  }

  public Script createScript(String id, InputStream is) throws Exception {
    Reader reader = new InputStreamReader(is) ;
    Script  script = compileScript(id, reader) ;
    scripts_.put(id, script) ;
    return script ;
  }

  public Script createScript(String id, String scriptText) throws Exception {
    Reader reader = new StringReader(scriptText) ;
    Script  script = compileScript(id, reader) ;
    scripts_.put(id, script) ;
    return script ;
  }

  public Script createTemplate(String id, InputStream is) throws Exception {
    ByteArrayOutputStream os = new ByteArrayOutputStream() ;
    String template = new String(os.toByteArray()) ;
    Script script = compileTemplate(id, template) ;
    scripts_.put(id, script) ;
    return script ;
  }

  public void  execute(Script script, Map<String, Object> context) throws Exception {
    Context cx = Context.enter();
    try {
      cx.setApplicationClassLoader(Thread.currentThread().getContextClassLoader()) ;
      //Scriptable scope = cx.initStandardObjects() ;
      ImporterTopLevel scope = new ImporterTopLevel(cx) ;
      Iterator<Map.Entry<String, Object>> i = context.entrySet().iterator() ;
      while(i.hasNext()) {
        Map.Entry<String, Object> entry = i.next() ;
        scope.put(entry.getKey(), scope, entry.getValue()) ;
      }
      script.exec(cx, scope) ;
    } finally {
      Context.exit();
    }
  }

  public void merge(Script template, Map<String, Object> context, Writer out) throws Exception {
    context.put("_w", out) ;
    execute(template, context) ;
  }

  public Script compileScript(String name, String script) throws Exception {
    Context cx = Context.enter();
    try {
      cx.setApplicationClassLoader(Thread.currentThread().getContextClassLoader()) ;
      Script scriptObject = cx.compileString(script, name, 1, null) ;
      return scriptObject ;
    } finally {
      Context.exit();
    }
  }

  public Script compileScript(String name, Reader reader) throws Exception {
    Context cx = Context.enter();
    try {
      cx.setApplicationClassLoader(Thread.currentThread().getContextClassLoader()) ;
      Script scriptObject = cx.compileReader(reader, name, 1, null) ;
      return scriptObject ;
    } finally {
      Context.exit();
    }
  }

  public Script compileTemplate(String name, String template) throws Exception {
    char[]  buf = template.toCharArray() ;
    StringBuilder script = new StringBuilder(10000) ;
    StringBuilder text = new StringBuilder(1500) ;
    StringBuilder code = new StringBuilder(1500) ;
    int pos =  0 ;
    boolean codeBlock = false ;
    boolean codeBlockReturn = false ;
    while(pos < buf.length) {
      //ignore \r character
      if(buf[pos] == 13) {
        pos++ ;
        continue ;
      }

      if(buf[pos] == '<' && buf[pos +1] == '%') {  //Start A block code
        pos++ ;
        codeBlockReturn = false ;
        if(buf[pos + 1] == '=') {
          pos++ ;
          codeBlockReturn = true ;
        }
        codeBlock = true ;
        if(text.length() > 0) {
          String tmp = text.toString() ;
          if(tmp.length() > 0) {
            String[] lines = tmp.split("\n") ;
            for(int i = 0; i < lines.length; i++) {
              if(i != lines.length - 1) {
                script.append("_w.append(\"").append(lines[i]).append("\\n\"); \n") ;
              } else {
                script.append("_w.append(\"").append(lines[i]).append("\"); \n") ;
              }
            }
          }
          text.setLength(0) ;
        }
      } else if(buf[pos] == '%' && buf[pos +1] == '>') {
        //End a  block of code, push the block of code to the script buffer,
        pos++ ;
        codeBlock = false ;
        if(codeBlockReturn) {
          //If the block of code start with <%= ...%>,  write the return result of the block code to
          //the writer
          script.append("\n_w.append(").append(code).append("); \n") ;
        } else {
          //just execute the block of code
          script.append(code).append('\n') ;
        }
        code.setLength(0) ;
      } else {  // Extract  text or block code
        if(codeBlock) {
          code.append(buf[pos]) ;
        } else {
          if(buf[pos] == '\"') text.append('\\') ;
          text.append(buf[pos]) ;
        }
      }
      pos++ ;
    }
    if(text.length() > 0) {
      String tmp = text.toString() ;
      if(tmp.length() > 0) {
        String[] lines = tmp.split("\n") ;
        for(String line : lines) script.append("_w.append(\"").append(line).append("\\n\"); \n") ;
      }
    }
    return compileScript(name, script.toString())  ;
  }
}