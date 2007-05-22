function Util() {

}

Util.prototype.shift = function(args) {
  if(args.length == 0) return args ;
  var newargs =  new Array() ;
  for(var i = 0; i < args.length - 1; i++)  newargs[i] = args[i + 1] ;
  return newargs ;
}

eXo.core.Util = new Util() ;

