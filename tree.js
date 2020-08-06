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

const files = [{
  "name": "/",
  "comm_name": "/",
  "sudo": true,
  "type": "dir",
  "content": [{
      "name": "usr",
      "comm_name": "~",
      "sudo": false,
      "type": "dir",
      "content": [{
          "name": "blog",
          "comm_name": "blog",
          "sudo": false,
          "type": "dir",
          "content": [{
              "name": "post_list.md",
              "comm_name": "post_list.md",
              "sudo": false,
              "type": "file",
              "content": "--POSTLIST--"
          }]
      }, {
          "name": "contact",
          "comm_name": "contact",
          "sudo": false,
          "type": "dir",
          "content": [{
              "name": "leave_a_message.sh",
              "comm_name": "leave_a_message.sh",
              "sudo": false,
              "type": "file",
              "content": '--MESSAGEMODE--'
          }, {
              "name": "README.md",
              "comm_name": "README.md",
              "sudo": false,
              "type": "file",
              "content": '# Contact me<br><br>- Github: [@yrccondor](<a target="_blank" rel="noopener" href="https://github.com/yrccondor">https://github.com/yrccondor</a>)<br>- Telegram: [@YrcAxton](<a target="_blank" rel="noopener" href="https://t.me/YrcAxton">https://t.me/YrcAxton</a>)<br>- Email: yrc371106#hotmail.com<br>- QQ: 1834341100<br>- Tel.: `getDNS.search(\'tel.axton.cc\',\'TXT\');`<br>- Blog: [FLyhigher](<a target="_blank" rel="noopener" href="https://flyhigher.top">https://flyhigher.top</a>)'
          }]
      }, {
          "name": "introduction.md",
          "comm_name": "introduction.md",
          "sudo": false,
          "type": "file",
          "content": "学生狗一只，Axton 是我的代号，坐标浙江某城市。<br><br>喜欢电脑，会打代码，会剪视频加特效，偶尔做做音乐。<br><br>摄影是我的爱好，虽然我没有牛逼的装备。<br><br>我会一点二胡，看得懂谱子，不是很精通。<br><br>### More details<br>- 会打代码，会一些乱七八糟的语言。有 PHP，ASP，Python，C，HTML+CSS+Javascript，Java 以及 VB<br>- 但实际上呢，代码不精，封装无力，啥新技术也不会，主业写 Bug 副业 Debug，是个弱渣<br>- 最喜欢的编辑器是 VS code，Atom 再见<br>- 勉强会玩 Linux<br>- 会剪视频加特效，用着 Adobe 全家桶<br>- 会一点 Cinema4D 和 Mocha，然而不算精通<br>- 有时会做音乐，没有 MIDI 键盘所以很累。FL Studio 内建音色而已<br>- 会折腾树莓派以及 Arduino<br>-  GitHub 蒟蒻一只<br>- 沉迷于 PPT 自定义动画<br>- 除了码程序，另一个爱好就是摄影。入坑 6 年，尼康党，不撕<br>- 已经摸熟了同学的D810，然而母上大人还是不让我换新机。目前使用 D3100<br>- 不太想拿自己的摄影作品参加比赛2333<br>- 喜欢欧美歌，不入欧美圈<br>- 半二次<br>- 混迹于祖国东南沿海一所苦逼高中，梦想只是浙大<br>- 目前在研究 Python 算法和机器学习，无奈数学是个坎所以很慢<br>- 算导党"
      }, {
          "name": "projects",
          "comm_name": "projects",
          "sudo": false,
          "type": "dir",
          "content": [{
              "name": "README.md",
              "comm_name": "README.md",
              "sudo": false,
              "type": "file",
              "content": '# Projects<br><br>- [MDx](<a target="_blank" rel="noopener" href="https://github.com/yrccondor/mdx">https://github.com/yrccondor/mdx</a>) A Material Design WordPress Theme<br>- [Certificate checker](<a target="_blank" rel="noopener" href="https://ssl.flyhigher.top">https://ssl.flyhigher.top</a>) Check SSL certificates automatically<br>- [SLock](<a target="_blank" rel="noopener" href="https://flyhigher.top/develop/408.html">https://flyhigher.top/develop/408.html</a>) A smart lock powered by Respiberry Pi<br>- [These Postos](<a target="_blank" rel="noopener" href="https://photo.axton.cc">https://photo.axton.cc/</a>) Photos taken by myself<br>- [Hommy](<a target="_blank" rel="noopener" href="https://flyhigher.top/develop/594.html">https://flyhigher.top/develop/594.html</a>) A smart assistant helps people to manage their finance (Team Work)'
          }]
      }]
  }, {
      "name": "resume.md",
      "comm_name": "resume.md",
      "sudo": true,
      "type": "file",
      "content": "Okay, just contact me if you want it."
  }]
}];

function getTree(path){
  const subPaths = path.split('/').slice(1)
  let c_tree = tree
  for (const subPath of subPaths) {
    c_tree = c_tree[subPath]
    if (!c_tree) {
      throw `No such file or directory: ${path}`
    }
  }
  return c_tree
}
