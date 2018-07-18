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

    /* new TypeIt('#banner-p', {
        strings: ['Get paid upfront for your invoices with Drip’s invoice discounting offering and use the capital to grow your business.', 'Fill out our application form and expect quick responses. No more waiting endlessly to get approved.'],
        speed: 30,
        breakLines: false,
        autoStart: false,
        loop: true,
        loopDelay: 6000,
        nextStringDelay: 6000
    }); */
});