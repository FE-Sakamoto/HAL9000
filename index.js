let input
let inputTip
let currentPath = '/usr'
let currentBin

function registerKeyBoardEventListener() {
  document.onkeydown = function (e) {
    if (e.keyCode === 39 || e.keyCode === 9) { // 右箭头 补全命令
      input.text(input.text() + inputTip.text())
      inputTip.text('')
      keepLastIndex(input[0])
    }
  }
  document.onkeypress = function (e) {
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
  }

  $('.input-text').on('input propertychange', () => {
    const inputs = input.text().split(' ')
    inputTip.text(commandSuggest(inputs[0]))
    if (inputs.length > 1) {
      inputTip.text(suggestPath(inputs[1]))
    }
  })
}

// 执行命令
function handleCommand(shellInput) {
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

// 命令拆解
function parseCommand(shellInput) {
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

function pushHistory(result) {
  if (result.length) {
    const history = $('#history')
    history.append(result)
    history.append('<br>')
  }
}

$(() => {
  input = $('.input-text')
  inputTip = $('.input-tip')
  registerKeyBoardEventListener()
})
