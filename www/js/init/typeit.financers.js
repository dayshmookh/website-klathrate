$(document).ready(function () {
    new TypeIt('#banner-header', {
        strings: ["Klathrate underwrites Trade Receivables with our underwriting insurance partner companies "," Klathrate provides investors access to short term trade finance receivables."],
        speed: 50,
        breakLines: false,
        autoStart: false,
        loop: true,
        nextStringDelay: [10,1500]
    });
});
