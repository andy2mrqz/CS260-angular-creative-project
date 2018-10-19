var sampleApp = angular.module('sampleApp', ['dx']);

sampleApp.controller('chartController', function chartController($scope) {
    $scope.currentType = 'line';
    $scope.dataSource = [];

    $scope.chartOptions = {
        palette: "red",
        dataSource: sampleData,
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
            text: "Weight over the past 7 days",
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