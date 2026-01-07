const express = require('express');
const path = require('path');
const app = express();

// 방법 1: 모든 폴더명을 인자로 각각 전달 (가장 안전)
const distPath = path.join(__dirname, 'ibk-style-banking-app');
const indexPath = path.join(distPath, 'index.html');

    // 경로가 제대로 생성되었는지 터미널에서 확인 (중요!)
    console.log("------------------------------------------");
    console.log("생성된 절대 경로:", indexPath);
    console.log("------------------------------------------");



app.use(express.static(distPath));

app.get('/*', (req, res) => {
    // 방법 2: distPath와 파일명을 반드시 '쉼표'로 구분
    // 만약 path.join(distPath + 'index.html') 이라고 쓰면 distindex.html이 됩니다.
    const indexPath = path.join(distPath, 'index.html');

    // 경로가 제대로 생성되었는지 터미널에서 확인 (중요!)
    console.log("------------------------------------------");
    console.log("생성된 절대 경로:", indexPath);
    console.log("------------------------------------------");

    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("파일 전송 오류:", err);
            res.status(500).send("index.html 파일을 찾을 수 없습니다.");
        }
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));