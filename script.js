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

    $scope.addStockPrice = function (s) {
        s.symbol = "GOOGL";
        s.date = "10/18/18";
        s.open = Math.floor(Math.random() * 100) + 100;
        s.close = Math.floor(Math.random() * 100) + 100;
        $scope.stocks.push(s);
    }

    for (var i = 0; i < 50; i++) {
        $scope.addStockPrice(new StockDayPrice);
    }
}