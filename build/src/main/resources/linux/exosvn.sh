function svnadd() {
  eval "svn st | grep '^?$1' | sed -e 's/^?    /svn add/g'" 
}

function svnrmdelete() {
  eval "svn st | grep '^!' | sed -e 's/^!    /svn rm/g'" 
}

function svnrm() {
  eval "svn st | grep '$1' | sed -e 's/^    /svn rm/g'" 
}
