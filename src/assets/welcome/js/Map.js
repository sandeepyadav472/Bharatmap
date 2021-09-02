

function Initialize(StateUrl, DistrictUrl, BlockUrl, mapId) {

  console.log('state url here ==', StateUrl);
  require([
    "dojo/dom-construct", "esri/dijit/BasemapGallery", "esri/dijit/BasemapToggle",
    "esri/map", "esri/geometry/webMercatorUtils",
    "esri/layers/FeatureLayer",
    "esri/dijit/Legend", "esri/dijit/Search", "esri/renderers/ScaleDependentRenderer",
    "esri/symbols/Font", "esri/geometry/Point",
    "esri/SpatialReference", "esri/graphic", "esri/lang",
    "esri/dijit/PopupTemplate",
    "esri/renderers/UniqueValueRenderer", "esri/symbols/TextSymbol",
    "dijit/registry", "dijit/form/Button", "dijit/TooltipDialog",
    "dijit/popup", "esri/arcgis/utils",
    "esri/geometry/Extent",
    "esri/InfoTemplate", "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/PictureMarkerSymbol", "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer",
    "esri/Color", "dojo/number", "dojo/dom-style", "esri/dijit/FeatureTable",
    "dojo/domReady!"
], function (
    domConstruct, BasemapGallery, BasemapToggle,
    Map, webMercatorUtils, FeatureLayer, Legend,
    Search, ScaleDependentRenderer, Font, Point, SpatialReference,
    Graphic, esriLang, PopupTemplate,
    UniqueValueRenderer, TextSymbol, registry,
    Button, TooltipDialog, dijitPopup,
    arcgisUtils,
    Extent,
    InfoTemplate, SimpleMarkerSymbol, PictureMarkerSymbol,
    SimpleLineSymbol, SimpleFillSymbol,
    SimpleRenderer, Color, number, domStyle, FeatureTable
) {

    var statesColor = stLayerColor;
        var statesLine = new SimpleLineSymbol("solid", statesColor, 0.7);
        var statesSymbol = new SimpleFillSymbol("solid", statesLine, null);
        var statesRenderer = new SimpleRenderer(statesSymbol);

        var stLayerColor = "#000000";
    var stateLayer;
    var stateBoundry;
    stateLayer = new FeatureLayer(StateUrl, {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        //outFields: ["*"],
        displayField: "STNAME",
        showLabels: false
    });

    stateBoundry = new FeatureLayer(StateUrl, {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        //  outFields: ["*"],
        displayField: "STNAME",
        showLabels: false
    });

    var bounds = new Extent({
        "xmin": 15.62,
        "ymin": 5.23,
        "xmax": 98.87,
        "ymax": 28.59,
        "spatialReference": { "wkid": 4326 }
    });

    map = new Map(mapId, {
        extent: bounds,
        center: [77.414452, 23.255404],
        zoom: 3,
        slider: true,
        showLabels: true,
        logo: false,
        basemap: 'none', //satellite,hybrid,streets
    });


    


   

    
    fillColorState();
    function fillColorState() {
        var queryTask = new esri.tasks.QueryTask(StateUrl);

        var query = new esri.tasks.Query();
        query.returnGeometry = false;
        query.where = "1=1";
        query.outFields = ["*"];

        // query.text = "California";
        queryTask.execute(query, showResults);
        console.log('queryTask==>',showResults);

    }


            var resultItems = [];
            let res;

            function showResults(results) {

                console.log('showResults==',results);

                var resultCount = results.features.length;
                for (var i = 0; i < resultCount; i++) {
                    var featureAttributes = results.features[i].attributes;
                    resultItems.push(featureAttributes);
                }
                console.log("result items ", resultItems);
                var defaultSymbol = new SimpleFillSymbol().setStyle(SimpleFillSymbol.STYLE_NULL);
                defaultSymbol.outline.setStyle(SimpleLineSymbol.STYLE_NULL);
                var renderer = new UniqueValueRenderer(defaultSymbol, "State_LGD");
                for (let i = 0; i < resultItems.length; i++) {
                    // var ColorCode;
                    if(resultItems[i].State_LGD > 0){
                        renderer.addValue(resultItems[i].State_LGD, new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0, 1]), 1.0), new Color([0, 230, 169, 0.25])));

                    }
                   
                }
                stateLayer.setRenderer(renderer);
                map.addLayers([stateLayer]);
            }

            stateLayer.on("mouse-over", function (evt) {
                console.log("Mouse-over working fine..");
                  });
            
                  stateLayer.on("mouse-out", function (evt) {
                    console.log("Mouse-out working fine..");
                
                  });
            
                //   stateLayer.on("click", function (evt) {
                //       console.log("Click working fine..");
                //   });

                stateLayer.on("dbl-click", function (evt) {
                    var stname = esriLang.substitute(evt.graphic.attributes, '${STNAME}');
                    var stcode11 = esriLang.substitute(evt.graphic.attributes, '${State_LGD}');
                    console.log(stname+'====>'+ stcode11);
                    InitializeDistrict(stname,stcode11,DistrictUrl,map,BlockUrl,stateLayer);
                   
                    // GotoDistrict(stcode11, stname);
                });

                  

           

            map.on("load", function () {

                // map.disableScrollWheelZoom();
                // map.disableDoubleClickZoom();
                // map.disableMapNavigation();
                // map.disableRubberBandZoom();
                // map.disablePan();
                // map.disableKeyboardNavigation();
                //map.disableShiftDoubleClickZoom();
                //map.graphics.enableMouseEvents();
                // map.graphics.on("mouse-out", closeDialog);
    
            });


//    
})




}

function InitializeDistrict(stname,stcode11,DistrictUrl,map,BlockUrl,stateLayer){

    require([
        "dojo/dom-construct", "esri/dijit/BasemapGallery", "esri/dijit/BasemapToggle",
        "esri/map", "esri/geometry/webMercatorUtils",
        "esri/layers/FeatureLayer",
        "esri/dijit/Legend", "esri/dijit/Search", "esri/renderers/ScaleDependentRenderer",
        "esri/symbols/Font", "esri/geometry/Point",
        "esri/SpatialReference", "esri/graphic", "esri/lang",
        "esri/dijit/PopupTemplate",
        "esri/renderers/UniqueValueRenderer", "esri/symbols/TextSymbol",
        "dijit/registry", "dijit/form/Button", "dijit/TooltipDialog",
        "dijit/popup", "esri/arcgis/utils",
        "esri/geometry/Extent",
        "esri/InfoTemplate", "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/PictureMarkerSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer",
        "esri/Color", "dojo/number", "dojo/dom-style", "esri/dijit/FeatureTable",
        "dojo/domReady!"
    ], function (
        domConstruct, BasemapGallery, BasemapToggle,
        Map, webMercatorUtils, FeatureLayer, Legend,
        Search, ScaleDependentRenderer, Font, Point, SpatialReference,
        Graphic, esriLang, PopupTemplate,
        UniqueValueRenderer, TextSymbol, registry,
        Button, TooltipDialog, dijitPopup,
        arcgisUtils,
        Extent,
        InfoTemplate, SimpleMarkerSymbol, PictureMarkerSymbol,
        SimpleLineSymbol, SimpleFillSymbol,
        SimpleRenderer, Color, number, domStyle, FeatureTable
    ){
        var districtLayer;
        districtLayer = new FeatureLayer(DistrictUrl, {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"],
            //outFields: ["*"],
            displayField: "dtname",
            showLabels: false
        });
      // fillColorDistrict();
        function fillColorDistrict() {
            var queryTask = new esri.tasks.QueryTask(DistrictUrl);

            var query = new esri.tasks.Query();
            query.returnGeometry = false;
            query.where = "State_LGD = " + stcode11 ;

            query.outFields = ["*"];
            // query.text = "California";
            queryTask.execute(query, showResults);
            //console.log(showResults);

        }
        function showResults(results) {

            console.log('showResults==',results);
            var resultItems = [];
            var resultCount = results.features.length;
            for (var i = 0; i < resultCount; i++) {
                var featureAttributes = results.features[i].attributes;
                resultItems.push(featureAttributes);
            }
            console.log("result items ", resultItems);
            var defaultSymbol = new SimpleFillSymbol().setStyle(SimpleFillSymbol.STYLE_NULL);
            defaultSymbol.outline.setStyle(SimpleLineSymbol.STYLE_NULL);
            var renderer = new UniqueValueRenderer(defaultSymbol, "Dist_LGD");
            for (let i = 0; i < resultItems.length; i++) {
              
                    renderer.addValue(resultItems[i].Dist_LGD, new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 112, 255, 1]), 1.0), new Color([85, 255, 0, 0.17])));

                
               
            }
            districtLayer.setRenderer(renderer);
            // map.addLayers([stateLayer]);
           //// stateLayer.hide();
            //map.addLayers([districtLayer]);
        }
        map.addLayers([districtLayer]);

        // districtLayer.on("dbl-click", function (evt) {
        //     var stname = esriLang.substitute(evt.graphic.attributes, '${STNAME}');
        //     var stcode11 = esriLang.substitute(evt.graphic.attributes, '${State_LGD}');
        //     console.log(stname+'====>'+ stcode11);
        //     InitializeBlock(BlockUrl,map);
           
        //     // GotoDistrict(stcode11, stname);
        // });
        //InitializeBlock(BlockUrl,map);

    });


}



function InitializeBlock(Blockurl,map){

    require([
        "dojo/dom-construct", "esri/dijit/BasemapGallery", "esri/dijit/BasemapToggle",
        "esri/map", "esri/geometry/webMercatorUtils",
        "esri/layers/FeatureLayer",
        "esri/dijit/Legend", "esri/dijit/Search", "esri/renderers/ScaleDependentRenderer",
        "esri/symbols/Font", "esri/geometry/Point",
        "esri/SpatialReference", "esri/graphic", "esri/lang",
        "esri/dijit/PopupTemplate",
        "esri/renderers/UniqueValueRenderer", "esri/symbols/TextSymbol",
        "dijit/registry", "dijit/form/Button", "dijit/TooltipDialog",
        "dijit/popup", "esri/arcgis/utils",
        "esri/geometry/Extent",
        "esri/InfoTemplate", "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/PictureMarkerSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer",
        "esri/Color", "dojo/number", "dojo/dom-style", "esri/dijit/FeatureTable",
        "dojo/domReady!"
    ], function (
        domConstruct, BasemapGallery, BasemapToggle,
        Map, webMercatorUtils, FeatureLayer, Legend,
        Search, ScaleDependentRenderer, Font, Point, SpatialReference,
        Graphic, esriLang, PopupTemplate,
        UniqueValueRenderer, TextSymbol, registry,
        Button, TooltipDialog, dijitPopup,
        arcgisUtils,
        Extent,
        InfoTemplate, SimpleMarkerSymbol, PictureMarkerSymbol,
        SimpleLineSymbol, SimpleFillSymbol,
        SimpleRenderer, Color, number, domStyle, FeatureTable
    ){
        var blockLayer;
        blockLayer = new FeatureLayer(Blockurl, {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"],
            //outFields: ["*"],
            displayField: "dtname",
            showLabels: false
        });

        map.addLayers([blockLayer]);
        

    });

}
