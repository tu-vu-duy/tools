/***************************************************************************
 * Copyright 2001-2007 The eXo Platform SARL         All rights reserved.  *
 * Please look at license.txt in info directory for more license detail.   *
 **************************************************************************/
package org.exoplatform.swing.event;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by The eXo Platform SARL
 * Author : Tuan Nguyen
 *          tuan.nguyen@exoplatform.com
 * Jun 16, 2007  
 */
public class EventManager {
  static private EventManager singleton_ = new EventManager();
  
  private Map<String, List<EventListener>> listeners_ = new HashMap<String, List<EventListener>>();
  
  public void  addEventListener(EventListener  listener) {
    List<EventListener> listeners = listeners_.get(listener.getListenedEventName()) ;
    if(listeners == null) {
      listeners = new ArrayList<EventListener>() ;
      listeners_.put(listener.getListenedEventName(), listeners) ;
    }
    listeners.add(listener) ;
  }
  
  public List<EventListener> getEventListeners(String listenedEventName) {
    return listeners_.get(listenedEventName) ;
  }
  
  public <S, D> void broadcast(Event<S, D> event) throws Exception {
    List<EventListener> listeners = listeners_.get(event.getEventName()) ;
    if(listeners != null) {
      for(EventListener listener : listeners) {
        listener.onEvent(event) ;
      }
    }
  }
  
  public <S, D> void broadcast(String eventName, S source, D data) throws Exception {
    List<EventListener> listeners = listeners_.get(eventName) ;
    if(listeners != null) {
      Event<S, D> event = new Event<S,D>(eventName, source, data) ;
      for(EventListener listener : listeners) {
        listener.onEvent(event) ;
      }
    }
  }
  
  public static EventManager  getInstance() { return singleton_ ; }

}