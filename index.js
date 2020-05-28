// import './jquery'

function registerKeyBoardEventListener(){
  document.onkeydown = function(event){
    console.log({event})
    const input = $('.input-text')
    setTimeout(()=>{
      input.focus()
    }, 0)
  }
}

function onLoad(){
  registerKeyBoardEventListener()
}

onLoad()