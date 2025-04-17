import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

import { TableModule } from 'primeng/table';
import { ListWeeklyWeatherData } from 'src/app/interface/weekly-weather-data';
import { CapitalizeWordsPipe } from 'src/app/pipes/capitalize-words/capitalize-words.pipe';

@Component({
    selector: 'app-table-result',
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        CardModule,
        CapitalizeWordsPipe,
    ],
    templateUrl: './table-result.component.html',
    styleUrl: './table-result.component.css'
})
export class TableResultComponent {
  @Input() list!: ListWeeklyWeatherData[];
}
