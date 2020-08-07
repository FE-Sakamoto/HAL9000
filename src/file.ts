import $ from 'jquery'
import {
  PATH_ROOT, PATH_HOME, ERROR_CODE_NOT_DIR, ERROR_CODE_NO_SUCH_FILE_OR_DIR,
} from './const'

let currentPath = PATH_HOME

export function getCurrentPath() {
  return currentPath
}

export function setCurrentPath(path: string) {
  currentPath = path
  $('.current-path').text(path)
}

export type File = {
  name: string
  alias: string
  sudo: boolean
} & (
  {
    type: 'dir',
    content: File[]
  } |
  {
    type: 'file',
    content: string
  }
)

const root: File = {
  name: '/',
  alias: '/',
  sudo: true,
  type: 'dir',
  content: [
    {
      name: 'usr',
      alias: '~',
      sudo: false,
      type: 'dir',
      content: [
        {
          name: 'blog',
          alias: 'blog',
          sudo: false,
          type: 'dir',
          content: [
            {
              name: 'blog1',
              alias: 'blog1',
              sudo: false,
              type: 'file',
              content: 'blog1',
            },
            {
              name: 'blog2',
              alias: 'blog2',
              sudo: false,
              type: 'file',
              content: 'blog2',
            },
            {
              name: 'blog3',
              alias: 'blog3',
              sudo: false,
              type: 'file',
              content: 'blog3',
            },
          ],
        },
        {
          name: 'bin',
          alias: 'bin',
          sudo: false,
          type: 'dir',
          content: [],
        },
        {
          name: 'project',
          alias: 'project',
          sudo: false,
          type: 'dir',
          content: [],
        },
        {
          name: 'introduction.md',
          alias: 'introduction.md',
          sudo: false,
          type: 'file',
          content: '',
        },
      ],
    },
  ],
}

function addSlash(path: string) {
  if (path.length && path[path.length - 1] !== '/') {
    return `${path}/`
  }
  return path
}

function goToParentDir(path: string) {
  return path.split('/').slice(0, -1).join('/')
}

/**
 * 输入路径转化为绝对路径
 * example /usr/.. -> /
 * example ~ -> /usr
 * example currentPath = /usr ./blog -> /usr/blog
 */
export function completePath(path: string): string {
  const paths = addSlash(path).split('/').slice(0, -1)
  let current = getCurrentPath()
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

export function getFileWithPath(path: string): File {
  let file = root
  if (path === '/') {
    return file
  }
  const paths = path.split('/').slice(1)
  paths.forEach((pathItem) => {
    if (file.type === 'dir') {
      const some = file.content.some((subFile) => {
        if (subFile.name === pathItem || subFile.alias === pathItem) {
          file = subFile
          return true
        }
        return false
      })
      if (!some) {
        throw ERROR_CODE_NO_SUCH_FILE_OR_DIR
      }
    } else {
      throw ERROR_CODE_NOT_DIR
    }
  })
  return file
}

export function suggestPath(path = ''): string {
  const last = path.split('/').slice(-1)[0]
  if (last === '.' || last === '..') {
    return '/'
  }
  const absoultePath = completePath(path)
  const paths = absoultePath.split('/')
  const lastPath = paths.pop()
  let res = ''
  if (lastPath) {
    const dir = getFileWithPath(paths.join('/'))
    if (dir.type === 'dir') {
      for (let i = 0; i < dir.content.length; i += 1) {
        const { name } = dir.content[i]
        if (name.indexOf(lastPath) === 0) {
          res = name.substr(lastPath.length)
          break
        }
      }
    }
  }
  return res
}
