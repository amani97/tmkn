import { Component } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexPlotOptions, ApexDataLabels, ApexLegend, ApexGrid, NgApexchartsModule } from 'ng-apexcharts';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { routes } from '../../../../shared/routes/routes';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterLink } from '@angular/router';

export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  plotOptions: ApexPlotOptions | any;
  dataLabels: ApexDataLabels | any;
  labels: string[] | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  responsive: ApexResponsive[] | any;
  grid?: ApexGrid | any;
};
@Component({
    selector: 'app-teacher-dashboard',
    templateUrl: './teacher-dashboard.component.html',
    styleUrl: './teacher-dashboard.component.scss',
    standalone: true,
    imports: [
        RouterLink,
        NgApexchartsModule,
        BsDatepickerModule,
        CarouselModule,
        CalendarModule,
        FormsModule,
        DropdownModule,
    ],
})
export class TeacherDashboardComponent {
  public routes = routes;
  public studentDonutChart: Partial<ChartOptions>;
  public attendanceChart: Partial<ChartOptions>;
  date: Date | undefined;

  constructor() {
    this.date = new Date();

    this.studentDonutChart = {
      series: [95, 5],
      chart: {
        height: 90,
        type: 'donut',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Completed', 'Pending'],
      legend: {
        show: false,
      },
      colors: ['#1ABE17', '#E82646'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.attendanceChart = {
      series: [60, 5, 15, 20],
      chart: {
        height: 290,
        type: 'donut',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Present', 'Late', 'Half Day', 'Absent'],
      colors: ['#1ABE17', '#1170E4', '#E9EDF4', '#E82646'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'left',
            },
          },
        },
      ],
      legend: {
        position: 'bottom',
      },
    };
  }
  customOptions: OwlOptions = {
    items: 3,
    loop: true,
    margin: 15,
    nav: true,
    dots: false,
    smartSpeed: 1000,
    navText: [
      '<i class="ti ti-chevron-left"></i>',
      '<i class="ti ti-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 4,
      },
      1400: {
        items: 4,
      },
    },
  };
  public lesson: OwlOptions = {
    loop: true,
    margin: 24,
    nav: false,
    dots: false,
    autoplay: false,
    smartSpeed: 1000,
    // navContainer: '.slide-nav5',
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
   
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  };
}
