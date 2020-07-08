const commands = ['cd', 'ls', 'cat', 'uname', 'clear', 'screenfetch', 'logout', 'reboot', 'help', 'matrix']

function exec(command, argument, option){
  switch(command) {
    case 'cd':
      break
    case 'ls':
      ls()
      break
    case 'cat':
      break
    case 'clear':
      clear()
      break
    default:
      throw `command not found`
  }
}

function ls(){
  const tree = getTree()
  let r = ''
  for (const key in tree.subs) {
    const subTree = tree.subs[key]
    r += `<span class='ls ${subTree.type === 'folder'? 'ls-folder' : 'ls-file'}'>${key}</span>`
  }
  pushHistory(r)
}

function clear(){
  $('#history').empty()
}

