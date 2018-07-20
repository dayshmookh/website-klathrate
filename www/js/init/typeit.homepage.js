$(document).ready(function () {
    new TypeIt('#banner-header', {
        strings: ["Gain access to steady working capital", "Hassle-free application with quick approvals"],
        /* strings: "Hassle-free application with quick approvals", */
        speed: 50,
        breakLines: false,
        autoStart: false,
        loop: true,
        nextStringDelay: [10,1500]
    });
});