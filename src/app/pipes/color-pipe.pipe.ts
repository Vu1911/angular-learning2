import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorPipe'
})
export class ColorPipePipe implements PipeTransform {

  transform(text: string, color: string): string {
    
    return `<span style="color: ${color};">${text}</span>`;

  }

}
