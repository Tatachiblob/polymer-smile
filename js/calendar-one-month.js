var calendar1MConfig = {
    type: 'calendar',
    backgroundColor: '#b3e7ff #e6f7ff',
    title: {
        text: 'Monthly Volume of Images',
        fontFamily: 'Overlock',
        fontColor: '#00344d',
        fontSize: 34,
    },
    subtitle: {
        text: 'October 2018',
        fontFamily: 'Georgia',
        fontColor: '#00344d',
        fontSize:12,
        fontWeight: 'normal',
        y: '10%'
    },
    options: {
        year: {
            text: '2017',
            visible: false,
        },
        startMonth: 11, //November
        endMonth: 11, //November
        palette: ['none','orange'],
        weekday: {
            values: ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'],
            item: {
                fontColor: '#00344d',
                fontFamily: 'Georgia',
                fontSize: 10
            }
        },
        month: {
            values: [null,null,null,null,null,null,null,null,null,null,null,null]
        },
        values: [
            ['2017-11-01', 1500, 'Nov 1st'],
            ['2017-11-02', 1600, 'Nov 2nd'],
            ['2017-11-03', 3000, 'Nov 3rd'],
            ['2017-11-04', 3400, 'Nov 4th'],
            ['2017-11-05', 503, 'Nov 5th'],
            ['2017-11-06', 1981, 'Nov 6th'],
            ['2017-11-07', 2100, 'Nov 7th'],
            ['2017-11-08', 914, 'Nov 8th'],
            ['2017-11-09', 1400, 'Nov 9th'],
            ['2017-11-10', 3034, 'Nov 10th'],
            ['2017-11-11', 1987, 'Nov 11th'],
            ['2017-11-12', 1700, 'Nov 12th'],
            ['2017-11-13', 1111, 'Nov 13th'],
            ['2017-11-14', 1999, 'Nov 14th'],
            ['2017-11-15', 4500, 'Nov 15th'],
            ['2017-11-16', 654, 'Nov 16th'],
            ['2017-11-17', 1200, 'Nov 17th'],
            ['2017-11-18', 4440, 'Nov 18th'],
            ['2017-11-19', 1500, 'Nov 19th'],
            ['2017-11-20', 1500, 'Nov 20th'],
            ['2017-11-21', 1600, 'Nov 21st'],
            ['2017-11-22', 1700, 'Nov 22nd'],
            ['2017-11-23', 1900, 'Nov 23rd'],
            ['2017-11-24', 2150, 'Nov 24th'],
            ['2017-11-25', 981, 'Nov 25th'],
            ['2017-11-26', 340, 'Nov 26th'],
            ['2017-11-27', 3100, 'Nov 27th'],
            ['2017-11-28', 1200, 'Nov 28th'],
            ['2017-11-29', 1500, 'Nov 29th'],
            ['2017-11-30', 900, 'Nov 30th']
        ]
    },
    labels: [
        {
            text: 'Daily Word Count',

            backgroundColor: '#fff9e6',
            borderColor: '#00344d',
            borderRadius: '5px',
            borderWidth: 1,
            fontColor: '#00344d',
            fontFamily: 'Overlock',
            fontSize: 16,
            fontWeight: 'bold',
            height: '45%',
            lineStyle: 'dotted',
            padding: '15%',
            verticalAlign: 'top',
            width: '25%',
            x: '70%',
            y: '20%'
        },
        {
            backgroundColor: 'none',
            borderColor: 'orange',
            borderRadius: '5px',
            borderWidth: 1,
            lineStyle: 'dotted',
            width: '20%',
            height: '22%',
            x: '72.5%',
            y: '32%',
        },
        {
            text: 'Daily Goal: 1,700 words',
            fontColor: '#00344d',
            fontFamily: 'Overlock',
            fontSize: 12,
            fontWeight: 'bold',

            width: '20%',
            height: '15%',
            x: '72.5%',
            y: '52%'
        },
        {
            text: 'National Novel Writing Month brings together participants from all over the world. The goal is to write a 50,000 word novel over the course of 30 days.',

            backgroundColor: '#fff9e6',
            borderColor: '#00344d',
            borderRadius: '5px',
            borderWidth: 1,
            fontColor: '#00344d',
            fontFamily: 'Georgia',
            fontSize: 11,
            lineStyle: 'dotted',
            padding: '12%',
            verticalAlign: 'top',
            wrapText: true,

            width: '25%',
            height: '20%',
            x: '70%',
            y: '70%'
        }
    ],
    plot: {
        tooltip: {
            text: 'On %data-info0,<br>%v images<br>were posted.',

            align: 'center',
            backgroundColor: 'none',
            borderColor: 'none',
            fontColor: 'orange',
            fontFamily: 'Times New Roman',
            fontSize: 14,
            height: '22%',
            padding: '20%',
            sticky: true,
            thousandsSeparator: ',',
            timeout: 30000,
            width: '20%',
            x: '72.5%',
            y: '32%'
        },
        valueBox: {
            fontColor: 'white',
            fontFamily: 'Courier',
            fontSize: 15,
            fontWeight: 'bold'
        }
    },
    plotarea: {
        marginBottom: '10%',
        marginLeft: '15%',
        marginRight: '35%',
        marginTop: '20%'
    }
};

zingchart.loadModules('calendar', function(){
    zingchart.render({
        id : 'calendar-one-month',
        data : calendar1MConfig
    });
});