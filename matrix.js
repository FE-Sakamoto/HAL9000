function matrix(){
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  const W = document.documentElement.clientWidth;
  const H = document.documentElement.clientHeight;
  const str = 'YSHELLDONTREPEATYOURSELF';

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
    ctx.font = `700 ${fontSize}px 微软雅黑`;
    ctx.fillStyle = '#00cc33';
    for (let i = 0; i < colums; i++){
      const index = Math.floor(Math.random() * str.length);
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(str[index], x, y);
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