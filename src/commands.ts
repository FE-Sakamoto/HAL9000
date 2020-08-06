const commands = ['cd', 'ls', 'cat', 'uname', 'clear', 'screenfetch', 'logout', 'reboot', 'help', 'matrix']

function ls(path = './') {
  let r = ''
  const absoultePath = completePath(path)
  const dir = getFileWithPath(absoultePath)
  dir.content.forEach((file) => {
    r += `<span class='ls ${file.type === 'dir' ? 'ls-dir' : 'ls-file'}'>${file.name}</span>`
  })
  pushHistory(r)
}

function clear() {
  $('#history').empty()
}

function commandSuggest(str) {
  let suggestion = ''
  if (str.length) {
    commands.some((command) => {
      if (command.indexOf(str) === 0) {
        suggestion = command.replace(str, '')
        return true
      }
      return false
    })
  }
  return suggestion
}

function help() {
  let r = ''
  for (const command of commands) {
    r += `<span class='help-item'>${command}</span>`
  }
  pushHistory('You can use following commands:')
  pushHistory(r)
}

export function exec(command = '', argument = '') {
  switch (command) {
    case '':
      break
    case 'cd':
      break
    case 'ls':
      ls(argument)
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
      throw `bash: command not found: ${command}`
  }
}
