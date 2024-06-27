import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ShowLoadingSpinner]',
  standalone: true
})
export class ShowLoadingSpinnerDirective implements OnInit, OnChanges {
  @Input() ShowLoadingSpinner: boolean = false;

  constructor (
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.updateView();
  }

  ngOnChanges() {
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();
    if (this.ShowLoadingSpinner) {
      const spinnerElement = this.renderer.createElement('div');
      this.renderer.addClass(spinnerElement, 'flex');
      this.renderer.addClass(spinnerElement, 'justify-center');
      this.renderer.addClass(spinnerElement, 'items-center');
      spinnerElement.innerHTML = `
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      `;
      this.renderer.appendChild(this.viewContainer.element.nativeElement, spinnerElement);
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
