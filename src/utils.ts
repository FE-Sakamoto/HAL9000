import $ from 'jquery'

export function pushHistory(result: string) {
  if (result.length) {
    const history = $('#history')
    history.append(result)
    history.append('<br>')
  }
}

export function keepLastIndex(obj: HTMLElement) {
  if (window.getSelection) {
    obj.focus()
    const range = window.getSelection()
    range!.selectAllChildren(obj)
    range!.collapseToEnd()
    // @ts-ignore
  } else if (document.selection) {
    // @ts-ignore
    const range = document.selection.createRange()
    range.moveToElementText(obj)
    range.collapse(false)
    range.select()
  }
}

export function completeErrorMsg(command: string = 'bash', argument: string, msg: string) {
  return `${command}: ${argument ? `${argument}: ` : ''}${msg}`
}
