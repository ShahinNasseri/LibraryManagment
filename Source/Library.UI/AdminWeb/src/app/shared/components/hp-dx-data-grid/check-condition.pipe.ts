import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'checkCondition'
})
export class CheckConditionPipe implements PipeTransform {

  constructor(public sanitizer: DomSanitizer) {

  }

  transform(cell: any, conditions: any): SafeHtml | string {

      let condition: any = conditions && conditions.filter((a: any) => a.colName == cell.column.dataField)[0];
      if (condition != null) {
          let htmlData: string = <string>condition.function(cell.row.data);
          return this.sanitizer.bypassSecurityTrustHtml(htmlData);
      }
      return cell.value;
  }

}
