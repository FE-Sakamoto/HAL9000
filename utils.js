function keepLastIndex(obj) {
  if (window.getSelection) {
      obj.focus();
      let range = window.getSelection();
      range.selectAllChildren(obj);
      range.collapseToEnd()
  } else if (document.selection) {
      let range = document.selection.createRange();
      range.moveToElementText(obj);
      range.collapse(false);
      range.select()
  }
}