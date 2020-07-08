const tree = {
  'usr': {
    path: 'usr',
    type: 'folder',
    subs: {
      'blog': {
        type: 'folder',
        subs: {
          'post_list.md': {
            path: '/post_list.md',
            type: 'file'
          }
        }
      },
      'bin': {
        type: 'folder',
        subs: {
          'matrix.md': {
            path: 'matrix.md',
            type: 'file'
          }
        }
      },
      'bin': {
        type: 'folder',
        subs: {
          'matrix.md': {
            path: 'matrix.md',
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

function getTree(){
  const paths = currentPath.split('/').slice(1)
  let c_tree = tree
  for (const path of paths) {
    c_tree = c_tree[path]
    if (!c_tree) {
      throw 'No such file or directory'
    }
  }
  return c_tree
}
