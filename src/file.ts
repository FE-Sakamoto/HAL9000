import $ from 'jquery'
import {
  PATH_ROOT,
  PATH_HOME,
  ERROR_NOT_DIR,
  ERROR_NO_SUCH_FILE_OR_DIR,
} from './const'

let currentPath = PATH_HOME

export function getCurrentPath() {
  return currentPath
}

export function setCurrentPath(path: string, alias: string) {
  currentPath = path
  $('.current-path').text(alias)
}

export type File = {
  name: string;
  alias: string;
  sudo: boolean;
} & (
  | {
    type: 'dir';
    content: File[];
  }
  | {
    type: 'file';
    content: string;
  }
);

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
              content: 'content: blog1',
            },
            {
              name: 'blog2',
              alias: 'blog2',
              sudo: false,
              type: 'file',
              content: 'content: blog2',
            },
            {
              name: 'blog3',
              alias: 'blog3',
              sudo: false,
              type: 'file',
              content: 'content: blog3',
            },
          ],
        },
        {
          name: 'bin',
          alias: 'bin',
          sudo: false,
          type: 'dir',
          content: [
            {
              name: 'sayHello.bin',
              alias: 'sayHello.bin',
              sudo: false,
              type: 'file',
              content: 'console.log("hello")',
            },
            {
              name: 'matrix.bin',
              alias: 'matrix.bin',
              sudo: false,
              type: 'file',
              content: `
(function(){
  function matrix(){
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix';
    document.getElementById('root').appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const W = document.documentElement.clientWidth;
    const H = document.documentElement.clientHeight;
    const charStart = 33; // unicode 33 ~ 126的几个字符
    const charEnd = 126;
  
    canvas.width = W;
    canvas.height = H;
  
    const fontSize = 16;
    const colums = Math.floor(W / fontSize);
    const drops = [];
    drops.length = colums;
    drops.fill(0);
  
    let updateFlag = true;
    function draw() {
      if (updateFlag = !updateFlag) {
        requestAnimationFrame(draw);
        return;
      }
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0,0,W,H);
      ctx.font = '500 ' + fontSize + 'px Menlo';
      ctx.fillStyle = '#00cc33';
      for (let i = 0; i < colums; i++){
        const index = charStart + Math.floor(Math.random() * (charEnd - charStart + 1));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(String.fromCharCode(index), x, y);
        if (y < H + fontSize) {
          drops[i]++;
        } else if (Math.random() > 0.99) {
          drops[i] = 0;
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }
  matrix()  
})()
              `,
            },
          ],
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
      default:
        // go to sub path
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
        throw ERROR_NO_SUCH_FILE_OR_DIR
      }
    } else {
      throw ERROR_NOT_DIR
    }
  })
  return file
}

export function suggestPath(path = ''): string {
  const last = path.split('/').slice(-1)[0]
  if (last === '.' || last === '..') return '/'
  const absoultePath = `${completePath(path)}${last === '' ? '/' : ''}`
  const paths = absoultePath.split('/')
  const lastPath = paths.pop()
  let res = ''
  if (lastPath !== undefined) {
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
