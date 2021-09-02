import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppConfig } from './utils/config';
declare var Initialize: Function;



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

  // @ViewChild('map': {true}) : ElementRef;

  constructor(){
    // console.log('state url==',this.StateUrl );   

  }
   ngOnInit(){
    Initialize(this.StateUrl,this.DistrictUrl,this.BlockUrl, document.getElementById("map"));
   }
  // Initialize(this.StateUrl,'DistrictUrl','VillageUrl', document.getElementById("map"));
}
