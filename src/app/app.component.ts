import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppConfig } from './utils/config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loadModules } from 'esri-loader';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
declare var Initialize: Function;
declare var InitializeDistrictDirect : Function;
declare var breadCrumb: Variable;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bharatmap';
  StateUrl = AppConfig.getStateUrl();
  DistrictUrl = AppConfig.getDistrictUrl();
  BlockUrl = AppConfig.getBlockUrl();

  StateCodes: Array<any> = new Array();
  dtdata: Array<any> = new Array();
  vildata: Array<any> = new Array();

  // @ViewChild('map': {true}) : ElementRef;

  constructor(){
    // console.log('state url==',this.StateUrl );   

  }
   ngOnInit(){
    breadCrumb;
    this.FillStates();
    Initialize(this.StateUrl,this.DistrictUrl,this.BlockUrl, document.getElementById("map"));
   }
  // Initialize(this.StateUrl,'DistrictUrl','VillageUrl', document.getElementById("map"));


  range(start: number, end: number, step: number = 1) {
    const len = Math.floor((end - start) / step) + 1;
    return Array(len).fill(0).map((_, idx) => start + (idx * step));
  }

  
  GetStateCodes() {
    return this.StateCodes;
  }


  async FillStates() {
    this.StateCodes = [];
    this.dtdata = [];
    this.vildata = [];
    
   // if (this.visual.visualsType === "maps") {

      let response = await this.getstatecodes();
      var resultCount = response.features.length;

      for (var i = 0; i < resultCount; i++) {
        var featureAttributes = response.features[i].attributes;
        this.StateCodes.push(featureAttributes);
      }

      //sessionStorage.setItem('states', JSON.stringify(this.StateCodes));
    //}

  }


  async getstatecodes() {

    const [Query, QueryTask] = await loadModules(['esri/tasks/query', 'esri/tasks/QueryTask']);

    var queryTask = new QueryTask(this.StateUrl);
    var query = new Query();
    query.returnGeometry = false;
    query.where = "1=1";
    query.outFields = ["STCODE11", "STNAME","State_LGD"];
    return await queryTask.execute(query);

  }


  GetDistrictCodes(select:any){
    var districtCode= select.target.value;
    console.log('change event==>',select.target.value);
    InitializeDistrictDirect(districtCode,this.DistrictUrl,document.getElementById("mapSelect"),this.BlockUrl,'value');
  }
}

