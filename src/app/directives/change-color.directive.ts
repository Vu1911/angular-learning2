import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective implements OnChanges{
  @Input() color: string = "yellow"
  @HostBinding("style.color") fontcolor: string = this.color

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(){
    this.fontcolor = this.color
  }

}
