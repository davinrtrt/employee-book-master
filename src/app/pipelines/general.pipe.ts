import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'generalPipe'
})
export class GeneralPipe implements PipeTransform {

  private dateList = ['birthDate']
  private currencyList = ['basicSalary']
  
  constructor(private decimalPipe: DecimalPipe){}

  transform(value: any, column: string): string {
    if(this.dateList.indexOf(column) !== -1){
      // console.log(value)
      return moment.utc(new Date(value)).local().format("DD MMMM YYYY")
    }
    if(this.currencyList.indexOf(column) !== -1){
      return "Rp. " + this.decimalPipe.transform(value, "1.2-2", "id")
    }

    return value;
  }
}
