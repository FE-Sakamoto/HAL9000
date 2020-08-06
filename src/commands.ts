import $ from 'jquery'
import { completePath, getFileWithPath } from './file'
import { ERROR_CODE_NOT_DIR } from './const'
import { pushHistory } from './utils'

const commands = ['cd', 'ls', 'cat', 'uname', 'clear', 'screenfetch', 'logout', 'reboot', 'help', 'matrix']

function ls(path = './') {
  let r = ''
  const absoultePath = completePath(path)
  const dir = getFileWithPath(absoultePath)
  if (dir.type === 'dir') {
    dir.content.forEach((file) => {
      r += `<span class='ls ${file.type === 'dir' ? 'ls-dir' : 'ls-file'}'>${file.name}</span>`
    })
    pushHistory(r)
  } else {
    throw ERROR_CODE_NOT_DIR
  }
}

function clear() {
  $('#history').empty()
}

export function commandSuggest(str: string) {
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
  commands.forEach((command) => {
    r += `<span class='help-item'>${command}</span>`
  })
  pushHistory('You can use following commands:')
  pushHistory(r)
}

// 命令拆解
export function parseCommand(shellInput: string) {
  const args = shellInput.split(' ').filter((arg) => arg.length)
  const command = args[0]
  const argument = args[1]
  const option = args[2]
  return {
    command,
    argument,
    option,
  }
}

export function exec(command = '', argument = '', option = '') {
  console.log({ command, argument, option })
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
      // matrix()
      break
    default:
      throw new Error(`bash: command not found: ${command}`)
  }
}
