import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  public data : any[] = []
  public labels : any[] = []
  public datasource = {
    datasets: [
        {
          data: this.data,
          backgroundcolor: [
            '#ffcd56',
            '#ff0000',
            '#0000ff',
            '#4d5791',
            '#deb887',
            '#8a2be2',
            '#ffebcd',
            '#a52a2a',
            
            
          ],

        }
    ],

   labels: [
            'Eatout',
            'Rent',
            'Grocery',
            'Insurance',
            'Utilities',
            'Transprt',
            'Savings',
        ]
};

  constructor(private http: HttpClient){  }

  ngOnInit(): void {
      this.http.get('/budget')
      .subscribe((res: any) => {
        for(var i=0; i <res.myBudget.length;i++)
                 {
                     this.datasource.datasets[0].data[i] = res.myBudget[i].budget;
                     this.datasource.labels[i] = res.myBudget[i].title;
                     
                 }
                 this.createChart();
      });
  }

  createChart()
         {
             var ctx = document.getElementById("myChart") as HTMLCanvasElement;
             var myPieChart = new Chart(ctx, {
                 type: 'pie',
                 data: this.datasource
             });
         }

}
