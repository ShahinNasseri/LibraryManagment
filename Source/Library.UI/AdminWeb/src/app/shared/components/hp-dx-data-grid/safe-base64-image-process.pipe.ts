import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeBase64ImageProcess'
})
export class SafeBase64ImageProcess implements PipeTransform {

    constructor(private readonly sanitizer: DomSanitizer) { }

    transform(value: any): any {
      if (value == null)
        return null;

      return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${value}`);
    }

}
