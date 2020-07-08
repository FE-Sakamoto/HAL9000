let input
let inputTip
let currentPath = '/usr'
let currentBin

function registerKeyBoardEventListener() {
  document.onkeydown = function(e) {
    if (e.keyCode === 39 || e.keyCode === 9) { // 右箭头 补全命令
      input.text(input.text() + inputTip.text()) 
      inputTip.text('')
      keepLastIndex(input[0])
    }
  }
  document.onkeypress = function(e) {
    if ($('.input-text').is(':focus')) { // 已获得焦点
      if (e.keyCode === 3 && e.ctrlKey) { // ctrl + c

      } else if (e.keyCode === 13) { // 输入了回车 执行命令
        handleCommand(input.text())
        return false // return false 可以阻止默认行为,使回车输入无效
      }
    } else { // 未获得焦点,此次输入使其获取焦点
      setTimeout(()=>{
        input.focus()
      }, 0) 
    }
  }

  $('.input-text').on('input propertychange', function(){
    inputTip.text(commandSuggest(input.text()))
  })
}


// 执行命令
function handleCommand(shellInput){
  const last = $('.prefix').text() + ' ' + shellInput
  pushHistory(last)
  input.text('')
  inputTip.text('')
  const {command, argument, option} = parseCommand(shellInput)
  try {
    exec(command, argument, option)
  } catch (error) {
    pushHistory(`-bash: ${command}: ` + error)
  }
}

// 命令拆解
function parseCommand(shellInput){
  let args = shellInput.split(' ').filter(arg=>arg.length)
  let command = args[0]
  let argument = args[1]
  let option = args[2]
  return {
    command,
    argument,
    option
  }
}

function pushHistory(result){
  const history = $('#history')
  history.append(result)
  history.append('<br>')
}


$(function(){
  input = $('.input-text')
  inputTip = $('.input-tip')
  registerKeyBoardEventListener()
})
