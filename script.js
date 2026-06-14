(function() {
    const canvas = document.getElementById('snowCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let snowflakes = [];
    const SNOW_COUNT = 140;
    
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    function initSnow() {
        snowflakes = [];
        for(let i = 0; i < SNOW_COUNT; i++) {
            snowflakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1.2,
                speedY: Math.random() * 1.2 + 0.3,
                speedX: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }
    
    function drawSnow() {
        if(!ctx) return;
        ctx.clearRect(0, 0, width, height);
        for(let flake of snowflakes) {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 220, 255, ${flake.opacity})`;
            ctx.fill();
            flake.y += flake.speedY;
            flake.x += flake.speedX;
            
            if(flake.y > height) {
                flake.y = -5;
                flake.x = Math.random() * width;
            }
            if(flake.x > width) flake.x = 0;
            if(flake.x < 0) flake.x = width;
        }
        requestAnimationFrame(drawSnow);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initSnow();
    });
    
    resizeCanvas();
    initSnow();
    drawSnow();
    
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btn.style.transform = 'scale(0.98)';
            setTimeout(() => { btn.style.transform = ''; }, 120);
        });
    });
    
    console.log('[PARANoiK] :: OSINT + Snozing specialist | снежинки активны');
})();
