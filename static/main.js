function showTip(msg, success = true) {
    let tip = document.getElementById('tip-bar');
    if (!tip) {
        tip = document.createElement('div');
        tip.id = 'tip-bar';
        tip.style.position = 'fixed';
        tip.style.top = '0';
        tip.style.left = '0';
        tip.style.width = '100%';
        tip.style.zIndex = '9999';
        tip.style.textAlign = 'center';
        tip.style.padding = '12px 0';
        tip.style.fontSize = '16px';
        tip.style.transition = 'top 0.3s';
        document.body.appendChild(tip);
    }
    tip.style.background = success ? '#d4edda' : '#f8d7da';
    tip.style.color = success ? '#155724' : '#721c24';
    tip.innerText = msg;
    tip.style.display = 'block';
    setTimeout(() => {
        tip.style.display = 'none';
    }, 1800);
}

function startProject(bat) {
    const t0 = Date.now();
    fetch('/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bat })
    }).then(r => r.json()).then(data => {
        const used = data.elapsed !== undefined ? data.elapsed : (Date.now() - t0);
        if(data.success) {
            showTip('启动命令已发送，用时 ' + used + ' ms', true);
            setTimeout(() => location.reload(), 1500);
        } else {
            showTip('启动失败：' + data.error + '，用时 ' + used + ' ms', false);
        }
    });
}
