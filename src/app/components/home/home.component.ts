import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataService } from 'src/app/services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData : GlobalDataSummary[];
  pieChart : GoogleChartInterface = {
    chartType : 'PieChart'
  }
  columnChart : GoogleChartInterface = {
    chartType : 'ColumnChart'
  }

  constructor(private dataService : DataService) { }

  initChart() {
    
    let datatable = [];
    datatable.push(["Country" , "Cases"])
    this.globalData.forEach(cs => {
      if(cs.confirmed > 2000) 
        datatable.push([
        cs.country , cs.confirmed
      ])
      
    })

    console.log(datatable);
    
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      // firstRowIsData: true,
      options: {
        height: 500
      },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      // firstRowIsData: true,
      options: {
        height: 500
      },
    };
  }

  ngOnInit(): void {
    
    this.dataService.getGlobalData()
    .subscribe(
      {
        next : (result) => {
          console.log(result);
          this.globalData = result;
          result.forEach(cs => {
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive+=cs.active
              this.totalConfirmed+=cs.confirmed
              this.totalDeaths+=cs.deaths
              this.totalRecovered+=cs.active
            }

          })

          this.initChart();
        }
      }
    )
  }

}
