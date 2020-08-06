import $ from 'jquery'
import './index.css'
import { pushHistory, keepLastIndex } from './utils'
import { parseCommand, commandSuggest, exec } from './commands'
import { suggestPath } from './file'

let input: JQuery<HTMLDivElement>
let inputTip: JQuery<HTMLSpanElement>

// 执行命令
function handleCommand(shellInput: string) {
  const last = `${$('.prefix').text()} ${shellInput}`
  pushHistory(last)
  input.text('')
  inputTip.text('')
  const { command, argument, option } = parseCommand(shellInput)
  try {
    exec(command, argument, option)
  } catch (errMsg) {
    pushHistory(errMsg)
  }
  $('body,html').animate({
    scrollTop: $(document).height(),
  }, 0)
}

function registerKeyBoardEventListener() {
  document.onkeydown = (e) => {
    if (e.keyCode === 39 || e.keyCode === 9) { // 右箭头 补全命令
      input.text(input.text() + inputTip.text())
      inputTip.text('')
      keepLastIndex(input[0])
    }
  }
  document.onkeypress = (e) => {
    if ($('.input-text').is(':focus')) { // 已获得焦点
      if (e.keyCode === 3 && e.ctrlKey) { // ctrl + c
      } else if (e.keyCode === 13) { // 输入了回车 执行命令
        handleCommand(input.text())
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
    inputTip.text(commandSuggest(inputs[0]))
    if (inputs.length > 1) {
      inputTip.text(suggestPath(inputs[1]))
    }
  })
}

$(() => {
  input = $('.input-text')
  inputTip = $('.input-tip')
  registerKeyBoardEventListener()
})
