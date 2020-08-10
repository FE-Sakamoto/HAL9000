import $ from 'jquery'
import { pushHistory, keepLastIndex, completeErrorMsg } from './utils'
import { parseCommand, commandSuggest, exec } from './commands'
import { suggestPath } from './file'
import {
  ERROR_NOT_DIR,
  ERROR_IS_A_DIR,
  ERROR_ACCESS_DENIED,
  ERROR_COMMAND_NOT_FOUND,
  ERROR_NO_SUCH_FILE_OR_DIR,
} from './const'

let input: JQuery<HTMLDivElement>
let inputTip: JQuery<HTMLSpanElement>
const commandsHistory: string[] = []

// 执行命令
function handleCommand(shellInput: string) {
  const last = `${$('.prefix').text()} ${shellInput}`
  pushHistory(last)
  input.text('')
  inputTip.text('')
  const { command, argument, option } = parseCommand(shellInput)
  try {
    exec(command, argument, option)
  } catch (err) {
    let errMsg = ''
    switch (err) {
      case ERROR_NOT_DIR:
        errMsg = completeErrorMsg(command, argument, 'Not a directory')
        break
      case ERROR_IS_A_DIR:
        errMsg = completeErrorMsg(command, argument, 'Is a directory')
        break
      case ERROR_ACCESS_DENIED:
        errMsg = completeErrorMsg(command, argument, 'Access denied')
        break
      case ERROR_COMMAND_NOT_FOUND:
        errMsg = completeErrorMsg('bash', command, 'command not found')
        break
      case ERROR_NO_SUCH_FILE_OR_DIR:
        errMsg = completeErrorMsg(command, argument, 'No such file or directory')
        break
      default:
        if (typeof err === 'string') {
          errMsg = completeErrorMsg('bash', '', `${err}`)
        } else if (err instanceof Error && err.message) {
          errMsg = completeErrorMsg('bash', '', `${err.message}`)
        } else {
          errMsg = completeErrorMsg('bash', '', 'unknow error')
        }
        break
    }
    pushHistory(errMsg)
  }
  $('body,html').animate({
    scrollTop: $(document).height(),
  }, 0)
}

export function registerKeyBoardEventListener() {
  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 38: // 上箭头 填充上一次输入
        if (input.text().length === 0 && commandsHistory.length) {
          input.text(commandsHistory[commandsHistory.length - 1])
          setTimeout(() => {
            keepLastIndex(input[0])
          }, 0)
        }
        break
      case 39: // 右箭头 补全命令
        input.text(input.text() + inputTip.text())
        inputTip.text('')
        setTimeout(() => {
          keepLastIndex(input[0])
        }, 0)
        break
      default:
        break
    }
  }
  document.onkeypress = (e) => {
    if ($('.input-text').is(':focus')) { // 已获得焦点
      if (e.keyCode === 3 && e.ctrlKey) { // ctrl + c
      } else if (e.keyCode === 13) { // 输入了回车 执行命令
        const execString = input.text().trim()
        commandsHistory.push(execString)
        handleCommand(execString)
        return false // return false 可以阻止默认行为,使回车输入无效
      }
    } else { // 未获得焦点,此次输入使其获取焦点
      setTimeout(() => {
        input.focus()
      }, 0)
    }
    return true
  }

  $('.input-text').on('input propertychange', () => {
    const inputs = input.text().split(' ')
    const last = inputs.slice(-1)[0]
    if (last.indexOf('.') === 0) {
      inputTip.text(suggestPath(last))
    } else {
      inputTip.text(commandSuggest(last))
    }
  })
}

$(() => {
  input = $('.input-text')
  inputTip = $('.input-tip')
  registerKeyBoardEventListener()
})
