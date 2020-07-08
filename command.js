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
    case 'help':
      help()
      break
    case 'matrix':
      matrix()
      break
    default:
      throw `command not found`
  }
}

function ls(){
  const tree = getTree(currentPath)
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

function commandSuggest(str) {
  let suggestion = ''
  if (str.length) {
    commands.some((command)=> {
      if (command.indexOf(str) === 0) {
        suggestion = command.replace(str, '')
        return true
      }
      return false
    })
  }
  return suggestion
}

function help(){
  let r = ''
  for (const command of commands) {
    r += `<span class='help-item'>${command}</span>`
  }
  pushHistory(r)
}
