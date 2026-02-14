require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

const boyfriendName = "My Dear Love ❤️";
const anniversaryDate = new Date("2024-06-15");

function getDaysTogether() {
    const today = new Date();
    const diffTime = today - anniversaryDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

async function sendLoveEmail() {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.BOYFRIEND_EMAIL,
        subject: "💌 A Special Surprise For You ❤️",
        html: `
            <h2>Hey Love 😘</h2>
            <p>I made something special just for you...</p>
            <a href="http://localhost:3000?password=${process.env.SECRET_PASSWORD}">
            Click Here ❤️
            </a>
        `
    };

    await transporter.sendMail(mailOptions);
    console.log("💌 Love email sent!");
}

app.get("/", (req, res) => {
    const password = req.query.password;

    if (password !== process.env.SECRET_PASSWORD) {
        return res.send(`
            <h2>🔐 Enter Password to Unlock My Heart</h2>
            <form>
                <input type="password" name="password"/>
                <button type="submit">Unlock ❤️</button>
            </form>
        `);
    }

    const daysTogether = getDaysTogether();

    res.send(`
<!DOCTYPE html>
<html>
<head>
<title>My Forever ❤️</title>

<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@300;500&display=swap" rel="stylesheet">

<style>
body {
    margin: 0;
    background: #ffc0cb;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    color: #8b004f;
}

h1 {
    font-family: 'Great Vibes', cursive;
    font-size: 55px;
    margin-top: 40px;
}

/* TAB BUTTONS */
.tabs {
    margin-top: 30px;
}

.tab-btn {
    background: white;
    border: none;
    padding: 12px 25px;
    margin: 5px;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    font-weight: 500;
    transition: 0.3s;
}

.tab-btn:hover {
    background: #ff99cc;
    color: white;
}

/* TAB CONTENT */
.tab-content {
    display: none;
    padding: 30px;
    max-width: 800px;
    margin: auto;
    background: rgba(255,255,255,0.6);
    border-radius: 20px;
    margin-top: 20px;
}

/* Gallery */
.gallery img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 15px;
    margin: 10px;
}

/* Floating Hearts */
.heart {
    position: fixed;
    color: pink;
    animation: float 5s linear infinite;
}

@keyframes float {
    from { transform: translateY(100vh); opacity: 1; }
    to { transform: translateY(-10vh); opacity: 0; }
}
</style>
</head>

<body>

<h1>Happy Valentine's Day, ${boyfriendName} 💖</h1>
<h3>We have been together for ${daysTogether} beautiful days ❤️</h3>

<div class="tabs">
    <button class="tab-btn" onclick="openTab('love')">💌 Love Letter</button>
    <button class="tab-btn" onclick="openTab('sorry')">🥺 Sorry Letter</button>
    <button class="tab-btn" onclick="openTab('gallery')">📸 Photo Gallery</button>
</div>

<!-- LOVE LETTER -->
<div id="love" class="tab-content">
    <h2>My Love 💕</h2>
    <p>
    You are my safe place, my happiness, my forever.
    Every day with you feels magical.
    I am so lucky to call you mine ❤️
    </p>
</div>

<!-- SORRY LETTER -->
<div id="sorry" class="tab-content">
    <h2>I’m Sorry 🥺</h2>
    <p>
    I’m really sorry for forgetting to call you today.
    It was never intentional.
    You mean the world to me and I promise to make it up to you 💖
    </p>
</div>

<!-- PHOTO GALLERY -->
<div id="gallery" class="tab-content gallery">
    <h2>Our Memories 📸</h2>
    <img src="https://drive.google.com/file/d/11yqEsun4U9OGObdU647UHai-Oe8CDQ7V">
    <img src="https://drive.google.com/file/d/1f82ue6xktyu6v1JlsFRCgwsXg405DwPS">
    <img src="https://drive.google.com/file/d/1f82ue6xktyu6v1JlsFRCgwsXg405DwPS">
</div>

<script>
function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = "none");

    document.getElementById(tabName).style.display = "block";
}

/* Show Love tab by default */
document.getElementById("love").style.display = "block";

/* Floating Hearts */
setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 30 + 20 + "px";
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}, 300);
</script>

</body>
</html>
`);
});

app.listen(PORT, async () => {
    console.log("💖 Valentine App Running at http://localhost:3000");
    await sendLoveEmail();
});