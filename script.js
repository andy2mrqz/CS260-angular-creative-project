// Class definitions
class StockDayPrice {
    constructor(ticker, date, close) {
        this.ticker = ticker;
        this.x = new Date(date);
        this.close = parseInt(close, 10);
    }
}

angular.module('app', ['n3-line-chart'])
    .controller('mainCtrl', mainCtrl);

function mainCtrl ($scope) {
    $scope.toTrack = []
    $scope.stocks = {};

    $scope.updateLineChart = function() {
        // Do something that adds what's in stocks to the data and options
        $scope.options["series"] = [];
        for (let ticker of $scope.toTrack) {
            $scope.data[ticker] = $scope.stocks[ticker];
            $scope.options["series"].push({
                axis: "y",
                y: "price",
                dataset: ticker,
                key: "close",
                label: ticker + ": $",
                color: "hsla(88, 48%, 48%, 1)",
                type: ["line"],
                id: "mySeries" + ticker
            });
        }
        $scope.$apply();
    }

    $scope.data = {}

    $scope.options = {
        margin: {top: 20},
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
        $scope.stocks[dp.ticker].push(dp);
    }

    $scope.getStockData = function () {
        // Get 5 year stock data for each stock we want to track and add to stocks
        for (let ticker of $scope.toTrack) {
            five_year_url = 'https://api.iextrading.com/1.0/stock/' + ticker + '/chart/5y';
            $.getJSON(five_year_url)
                .done((response) => {
                    $scope.stocks[ticker] = [];
                    for (let price of response) {
                        let dayprice = new StockDayPrice(ticker, price.date, price.close);
                        $scope.addStockPrice(dayprice);
                    }
                    $scope.$apply();
                    $scope.updateLineChart();
                })
                .fail(() => {
                    $scope.toTrack.splice($scope.toTrack.indexOf(ticker),1);
                    $scope.$apply();
                    alert("Trouble grabbing data for " + ticker + ".  Make sure you submit valid tickers (ex. GOOGL)")
                });
        }
    }
}