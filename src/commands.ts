import $ from 'jquery'
import { matrix } from './matrix'
import {
  completePath, getFileWithPath, setCurrentPath,
} from './file'
import {
  ERROR_NOT_DIR, ERROR_IS_A_DIR, ERROR_COMMAND_NOT_FOUND, ERROR_NO_SUCH_FILE_OR_DIR,
} from './const'
import { pushHistory } from './utils'

const commands = ['cd', 'ls', 'cat', 'uname', 'clear', 'help', 'matrix']

function commandLs(path = './') {
  let r = ''
  const absoultePath = completePath(path)
  const dir = getFileWithPath(absoultePath)
  if (dir.type === 'dir') {
    dir.content.forEach((file) => {
      r += `<span class='ls ${file.type === 'dir' ? 'ls-dir' : 'ls-file'}'>${file.name}</span>`
    })
    pushHistory(r)
  } else {
    pushHistory(dir.name)
  }
}

function commandCd(path = './') {
  const absoultePath = completePath(path)
  const dir = getFileWithPath(absoultePath)
  if (dir.type === 'file') {
    throw ERROR_NOT_DIR
  }
  setCurrentPath(absoultePath, dir.alias)
}

function commandClear() {
  $('#history').empty()
}

function commandHelp() {
  let r = ''
  commands.forEach((command) => {
    r += `<span class='help-item'>${command}</span>`
  })
  pushHistory('You can use following commands:')
  pushHistory(r)
}

function commandCat(path: string) {
  if (!path) return
  const absoultPath = completePath(path)
  const file = getFileWithPath(absoultPath)
  if (file.type === 'dir') {
    throw ERROR_IS_A_DIR
  } else if (file.type === 'file') {
    pushHistory(file.content)
  }
  console.log('cat: ', { path })
}

function commandUname() {
  pushHistory('BugMaker.Yu')
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

function commandBin(path: string) {
  const absolutPath = completePath(path)
  const file = getFileWithPath(absolutPath)
  if (file) {
    if (file.type === 'dir') {
      commandCd(path)
    } else if (file.type === 'file') {
      if (file.name.substr(-4) === '.bin') {
        setTimeout(file.content, 0)
      } else {
        throw ERROR_COMMAND_NOT_FOUND
      }
    }
  } else {
    throw ERROR_NO_SUCH_FILE_OR_DIR
  }
}

// 命令拆解
export function parseCommand(shellInput: string) {
  const args = shellInput.split(' ').filter((arg) => arg.length)
  const command = args[0] && args[0].trim()
  const argument = args[1] && args[1].trim()
  const option = args[2] && args[2].trim()
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
      commandCd(argument)
      break
    case 'ls':
      commandLs(argument)
      break
    case 'cat':
      commandCat(argument)
      break
    case 'clear':
      commandClear()
      break
    case 'help':
      commandHelp()
      break
    case 'matrix':
      matrix()
      break
    case 'uname':
      commandUname()
      break
    default:
      if (/^\.?\//.test(command)) {
        commandBin(command)
      }
      throw ERROR_COMMAND_NOT_FOUND
  }
}
