let input
let inputTip
let currentPath = '/usr'

function registerKeyBoardEventListener(){
  document.onkeypress = function(e) {
    if ($('.input-text').is(':focus')) { // 已获得焦点
      if (e.keyCode === 13) { // 输入了回车 执行命令
        handleCommand(input.innerText)
        return false // return false 可以阻止默认行为,使回车输入无效
      }
    } else { // 未获得焦点,此次输入使其获取焦点
      setTimeout(()=>{
        input.focus()
      }, 0) 
    }
  }

  $('.input-text').on('input propertychange', function(){
    inputTip.innerText = commandSuggest(input.innerText)
  })
}


// 执行命令
function handleCommand(shellInput){
  const last = $('.prefix')[0].innerText + ' ' + shellInput
  pushHistory(last)
  input.innerText = ''
  inputTip.innerText = ''
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
  input = $('.input-text')[0]
  inputTip = $('.input-tip')[0]
  registerKeyBoardEventListener()
})
