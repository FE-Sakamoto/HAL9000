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
    ctx.font = `500 ${fontSize}px Menlo`;
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
