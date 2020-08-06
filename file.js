class File {
  /**
   *
   * @param {string} name
   * @param {string} comm_name
   * @param {boolean} sudo
   * @param {string} type
   * @param {any} type
   */
  constructor(name, comm_name, sudo, type, content) {
    this.name = name
    this.comm_name = comm_name
    this.sudo = sudo
    this.type = type
    this.content = content
  }
}

const root = new File('/', '/', true, FILE_TYPE_DIR, [
  new File('usr', '~', false, FILE_TYPE_DIR, [
    new File('blog', 'blog', false, FILE_TYPE_DIR, []),
    new File('bin', 'bin', false, FILE_TYPE_DIR, []),
    new File('project', 'project', false, FILE_TYPE_DIR, []),
    new File(
      'introduction.md',
      'introduction.md',
      false,
      FILE_TYPE_FILE,
      'introduction me',
    ),
  ]),
])

/**
 * 输入路径转化为绝对路径
 * example /usr/.. -> /
 * example ~ -> /usr
 * example currentPath = /usr ./blog -> /usr/blog
 * @param {string} path
 * @return {string}
 */
function completePath(path) {
  path = addSlash(path)
  const paths = path.split('/').slice(0, -1)
  let current = currentPath
  if (paths[0] === '') {
    current = PATH_ROOT
    paths.shift()
  } else if (paths[0] === '~') {
    current = PATH_HOME
    paths.shift()
  }

  paths.forEach((subPath) => {
    switch (subPath) {
      case '.': // nothing
        break
      case '..': // go to parent path
        current = goToParentDir(current)
        break
      default: // go to sub path
        current = addSlash(current)
        current += `${subPath}`
        break
    }
  })
  return current
}

function addSlash(path) {
  if (path.length && path[path.length - 1] !== '/') path += '/'
  return path
}

function goToParentDir(path) {
  return path.split('/').slice(0, -1).join('/')
}

/**
 *
 * @param {string} path
 * @return {File}
 */
function getFileWithPath(path) {
  let dir = root
  if (path === '/') {
    return dir
  }
  const paths = path.split('/').slice(1)
  paths.forEach((pathItem) => {
    dir.content.some((subFile) => {
      if (subFile.name === pathItem || subFile.comm_name === pathItem) {
        if (subFile.type === FILE_TYPE_DIR) {
          dir = subFile
        } else {
          throw ERROR_CODE_NOT_DIR
        }
        return true
      }
      return false
    })
  })

  return dir
}

function suggestPath(path = '') {
  const absoultePath = completePath(path)
  const paths = absoultePath.split('/')
  const lastPath = paths.pop()
  const dir = getFileWithPath(paths.join('/'))
  let res = ''
  if (dir.type === FILE_TYPE_DIR) {
    for (let i = 0; i < dir.content.length; i++) {
      const { name } = dir.content[i]
      if (name.indexOf(lastPath) === 0) {
        res = name.substr(lastPath.length)
        break
      }
    }
  }
  return res
}
