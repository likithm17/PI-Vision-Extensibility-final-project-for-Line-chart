(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "linedemo",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: "Table",
				Height: 150,
				Width: 150 ,
				BackgroundColor: 'yellow',
				TextColor: '#000000',
				BorderRadius: 50	
			} 
		},
		configOptions: function () { 
			return [{ 
				title: "Format Symbol",
				mode: "format" 
			}];
		}
	}

	function getConfig(){
		return{
			
			
	"type": "serial",
	"categoryField": "attribute",
	"startDuration": 1,
	"categoryAxis": {
		"gridPosition": "start"
	},
	"trendLines": [],
	"graphs": [
		{
			"balloonText": "[[title]] of [[category]]:[[value]]",
			"bullet": "round",
			"id": "AmGraph-1",
			"title": "PI point",
			"valueField": "value"
		}
		
	],
	"guides": [],
	"valueAxes": [
		{
			"id": "ValueAxis-1",
			"title": "range"
		}
	],
	"allLabels": [],
	"balloon": {},
	"legend": {
		"enabled": true,
		"useGraphSettings": true
	},
	"titles": [
		{
			"id": "Title-1",
			"size": 15,
			"text": "PI Vision Line chart"
		}
	],
	//static values for graph
	"dataProvider": [
		
		
	]

			
		}
	}
		
	
	
	
	symbolVis.prototype.init = function(scope, elem) { 
		
		var labels;
		
		var container = elem.find('#container')[0];
		container.id = "barChart_" + scope.symbol.Name;
		var chart = AmCharts.makeChart(container.id, getConfig());
		function converttoChart(data){
			return data.Rows.map(function(item,n){
				var k = labels[n].indexOf("|"); 	
				var name = labels[n].substr(k+1);	
				return{
					value:item.Value,
					attribute:name
				}
			});
		}
		
		function updateLabel(data){
			labels = data.Rows.map(function(item){
				return item.Label;
			});
		}
		this.onDataUpdate = dataUpdate;
		function dataUpdate(data){
			console.log(data);
			if( !data) return;
			if(data.Rows[0].Label) updateLabel(data);
			if(!labels || !chart) return;
			
			var dataprovider = converttoChart(data);
			chart.dataProvider= dataprovider;
			chart.validateData();
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
