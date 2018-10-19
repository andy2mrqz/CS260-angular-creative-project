var weightApp = angular.module('weightApp', ['dx']);

weightApp.controller('chartController', function chartController($scope) {
    $scope.currentType = 'line';
    $scope.dataSource = [];
    $scope.addReport = function() {
        if ($scope.date !== "" && $scope.date[2] === "/" && $scope.date[5] === "/") {
            if ($scope.weight !== "" && !isNaN($scope.weight)) {
                $scope.dataSource.push({
                    "weight": parseInt($scope.weight, 10),
                    "date": $scope.date
                });
                $scope.dataSource = $scope.dataSource.sort(compare);
                $scope.weight = "";
                $scope.date = "";
                var instance = $("#chart").dxChart("instance");
                instance.option("dataSource", $scope.dataSource);
            } else {
                alert("Please enter a valid number for the weight");
            }
        } else {
            alert("Incorrect date format -- Please enter the date in the format MM/DD/YYYY");
        }
    };

    $scope.chartOptions = {
        palette: "red",
        dataSource: $scope.dataSource,
        commonSeriesSettings: {
            argumentField: "date"
        },
        margin: {
            bottom: 20
        },
        argumentAxis: {
            valueMarginsEnabled: false,
            discreteAxisDivisionMode: "crossLabels",
            grid: {
                visible: true
            }
        },
        series: [
            { valueField: "weight", name: "Weight" },
        ],
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center",
            itemTextPosition: "bottom"
        },
        title: {
            text: "Weight History",
            subtitle: {
                text: "Measured in U.S. lbs."
            }
        },
        "export": {
            enabled: true
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function(arg) {
                return {
                    text: arg.valueText
                };
            }
        }
    };

});

function compare(a, b) {
    if (a["date"].substr(6, 4) < b["date"].substr(6,4)) {
        return -1;
    } else if (a["date"].substr(6, 4) > b["date"].substr(6,4)) {
        return 1;
    }
    if (a["date"].substr(0,2) > b["date"].substr(0,2)) {
        return -1;
    } else if (a["date"].substr(0,2) > b["date"].substr(0,2)) {
        return 1;
    }
    if (a["date"].substr(3,2) > b["date"].substr(3,2)) {
        return -1;
    } else if (a["date"].substr(3,2) > b["date"].substr(3,2)) {
        return 1;
    }
    return 0;
}