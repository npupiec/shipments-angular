import { Directive, Input, HostBinding, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: '[appCollapse]',
  exportAs: 'app-collapse'
})
export class CollapseDirective {

  @HostBinding('class.collapse') private collapseClass = true;
  @HostBinding('class.show') private _isCollapse = true;

  @Input() 
  set appCollapse(val: boolean) {
    this._isCollapse = val;
  }
  get appCollapse():boolean {
    return this._isCollapse;
  }

  constructor(private el: ElementRef) { }

  show(): void {
    this._isCollapse = false
  }

  hide(): void {
    this._isCollapse = true
  }

  toggle(): void {
    if (this._isCollapse) {
      this.show()
    } else {
      this.hide()
    } 
  }
}
