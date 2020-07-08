const tree = {
  'usr': {
    type: 'folder',
    subs: {
      'blog': {
        type: 'folder',
        subs: {
          'post_list.md': {
            type: 'file'
          }
        }
      },
      'bin': {
        type: 'folder',
        subs: {
          'matrix.sh': {
            type: 'file'
          },
          'AnswerToTheUltimateQuestionOfLife.sh': {
            type: 'file'
          }
        }
      },
      'bin': {
        type: 'folder',
        subs: {
          'matrix.sh': {
            type: 'file'
          }
        }
      },
      'introduction.md': {
        type: 'file'
      },
      'projects': {
        type: 'folder',
        subs: []
      }
    }
  }
}

function getTree(path){
  const subPaths = path.split('/').slice(1)
  let c_tree = tree
  for (const subPath of subPaths) {
    c_tree = c_tree[subPath]
    if (!c_tree) {
      throw 'No such file or directory'
    }
  }
  return c_tree
}

function pathSuggest(path){
  console.log({path})
  return ''
}