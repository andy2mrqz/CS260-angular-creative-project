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
    $scope.toTrack = ['GOOGL']
    $scope.stocks = [];

    $scope.data = {

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
    }

    $scope.clear = function() {
        $scope.toTrack = [];
    }

    $scope.addStockPrice = function (dp) {
        $scope.stocks.push(dp);
    }

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
}