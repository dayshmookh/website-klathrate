$(document).ready(function () {
    new TypeIt('#banner-header', {
        strings: ["Fast paced working capital solution for businesses "],
        speed: 50,
        breakLines: true,
        autoStart: false,
        loop: true,
        nextStringDelay: [10,1500]
    });
});
