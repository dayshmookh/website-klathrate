$(document).ready(function () {
    new TypeIt('#banner-header', {
        strings: ["By building the world's first automated, software platform that underwrites and funds cross border trade for fast growing Asian exporters, Klathrate provides investors access to short term trade finance receivables."],
        speed: 50,
        breakLines: false,
        autoStart: false,
        loop: true,
        nextStringDelay: [10,1500]
    });
});