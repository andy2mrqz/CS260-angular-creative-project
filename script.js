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

angular.module('app', [])
    .controller('mainCtrl', mainCtrl);

function mainCtrl ($scope) {
    $scope.toTrack = ['GOOGL', 'AAPL']
    $scope.stocks = [];

    $scope.addStockPrice = function (dp) {
        $scope.stocks.push(dp);
        console.log($scope.stocks);
    }

    for (let ticker of $scope.toTrack) {
        five_year_url = 'https://api.iextrading.com/1.0/stock/' + ticker + '/chart/5y';
        $.getJSON(five_year_url)
            .done((response) => {
                var i = 0;
                for (let price of response) {
                    if (i > 10) {
                        console.log(i);
                        break;
                    }
                    let dayprice = new StockDayPrice(
                        ticker, price.date, price.open, price.close,
                        price.high, price.low, price.change, price.changePercent
                    );
                    $scope.addStockPrice(dayprice);
                    i++;
                }
            })
            .fail(() => console.log("Trouble grabbing data for " + ticker));
    }
}