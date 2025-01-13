import { Directive, OnChanges, Input, Renderer2, ElementRef, SimpleChanges, input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[attributes]',
  standalone: true,
})
export class AttributeDirective implements OnChanges {
  attributes = input<object>();

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['attributes']) {
      for (const attributeName in this.attributes) {
        const attributeValue = this.attributes[attributeName as keyof object] as string;
        if (attributeValue) {
          this.renderer.setAttribute(
            this.elementRef.nativeElement,
            attributeName,
            attributeValue as string
          );
        } else {
          this.renderer.removeAttribute(this.elementRef.nativeElement, attributeName);
        }
      }
    }
  }
}
