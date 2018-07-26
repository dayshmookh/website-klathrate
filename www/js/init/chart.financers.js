var ctx = $('#myChart');

var chartColors = {
    blue: "#64b5f6",
    green: "#2e7d32",
    yellow: "#ffca28",
    orange: "#f4511e",
    purple: "#e040fb"
};

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"],
        datasets: [{
            label: 'Credit Cards',
            fill: false,
            backgroundColor: chartColors.blue,
            borderColor: chartColors.blue,
            data: [3.5, 4, 5.5, 9.5, 9.5, 5.5, 4, 3.5, 3, 2.5]
        }, {
            label: 'Consumer Loans',
            fill: false,
            backgroundColor: chartColors.green,
            borderColor: chartColors.green,
            data: [2, 2.5, 3.5, 5.5, 6, 3.5, 2.5, 2, 2, 1.5]
        }, {
            label: 'Mortgages',
            fill: false,
            backgroundColor: chartColors.yellow,
            borderColor: chartColors.yellow,
            data: [0, 0.5, 1.5, 2.5, 2, 1.5, 1.5, 0.5, 0.5, 0]
        }, {
            label: 'Commercial Loans',
            fill: false,
            backgroundColor: chartColors.orange,
            borderColor: chartColors.orange,
            data: [0, 0.5, 1, 2, 1.5, 1, 1, 0.5, 0.5, 0]
        }, {
            label: 'Trade recievables',
            fill: false,
            backgroundColor: chartColors.purple,
            borderColor: chartColors.purple,
            data: [0.5, 0.5, 0.5, 1.5, 1, 0.5, 0.5, 0.5, 0, 0]
        }]
    },
    maintainAspectRatio: false,
    options: {
        scales: {
            /* xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }], */
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Loss rates'
                }
            }]
        }
    }
});






