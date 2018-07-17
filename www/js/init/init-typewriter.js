var app = document.getElementById('demo');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter
    .typeString('Klathrate')
    .pauseFor(2500)
    // .deleteAll()
    .typeString('\nTrade finance simplified')
    .pauseFor(2500)
    //.deleteChars(7)
    //.typeString('altered!')
    .start();
