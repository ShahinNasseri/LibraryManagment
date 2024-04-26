import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digiSeparator',
  standalone: true,
})
export class DigiSeparatorPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let result: number;

    if (isNaN(value)) {
        result = parseInt(value);
    }

    result = value;

    if (result != null) {
        return result.toLocaleString();
    } else {
        return '';
    }

    
}

}
