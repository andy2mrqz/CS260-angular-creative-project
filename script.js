// Class definitions
class StockDayPrice {
    constructor(symbol, date, open, close, high, low, change, changePercent) {
        this.symbol = symbol;
        this.date = date;
        this.open = open;
        this.close = close;
        this.high = high;
        this.low = low;
        this.change = change;
        this.changePercent = changePercent;
    }
}

class StockMinutePrice {
    constructor(symbol, datetime, price) {
        this.symbol = symbol;
        this.datetime = datetime;
        this.price = price;
    }
}

angular.module('app', ['n3-line-chart'])
    .controller('mainCtrl', mainCtrl);

function mainCtrl ($scope) {
    $scope.toTrack = []
    $scope.stocks = [];

    $scope.updateLineChart = function() {
        dataset0 = [
            {x: new Date("2015-04-15"), val_0:15},
            {x: new Date("2015-05-18"), val_0:28},
            {x: new Date("2017-09-18"), val_0:89},
            {x: new Date("2018-09-18"), val_0:15}
            ]
    }

    $scope.data = {
        dataset0: [
            ]
    }

    $scope.options = {
        margin: {top: 20},
        series: [
            {
            axis: "y",
            y: "price",
            dataset: "dataset0",
            key: "val_0",
            label: "A line series",
            color: "hsla(88, 48%, 48%, 1)",
            type: ["line"],
            id: "mySeries0"
            }
        ],
        axes: {x: {key: "x", type: "date"}}
    };

    $scope.addNew = function(stock) {
        $scope.toTrack.push(stock.ticker);
        stock.ticker = "";
        $scope.getStockData();
    }

    $scope.clear = function() {
        $scope.toTrack = [];
        $scope.getStockData();
    }

    $scope.addStockPrice = function (dp) {
        $scope.stocks.push(dp);
    }

    $scope.getStockData = function () {
        // Get 5 year stock data for each stock we want to track and add to stocks
        for (let ticker of $scope.toTrack) {
            five_year_url = 'https://api.iextrading.com/1.0/stock/' + ticker + '/chart/5y';
            $.getJSON(five_year_url)
                .done((response) => {
                    for (let price of response) {
                        let dayprice = new StockDayPrice(
                            ticker, price.date, price.open, price.close,
                            price.high, price.low, price.change, price.changePercent
                        );
                        $scope.addStockPrice(dayprice);
                    }
                    $scope.$apply();
                })
                .fail(() => console.log("Trouble grabbing data for " + ticker));
        }

        $scope.updateLineChart();
    }
}