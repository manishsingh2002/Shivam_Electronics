import { Directive, ElementRef, Input, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appBorderGradientAnimated]',
  standalone: true
})
export class BorderGradientAnimatedDirective implements OnInit, OnDestroy {

  @Input() appBorderGradientAnimated: string = 'linear-gradient(to right, red, blue)';
  @Input() animationSpeed: number = 5;

  private animationId: number | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.applyGradient();
  }

  ngOnChanges() {
    this.applyGradient();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private applyGradient() {
    const gradient = this.appBorderGradientAnimated;

    this.renderer.setStyle(this.el.nativeElement, 'border-style', 'solid');
    this.renderer.setStyle(this.el.nativeElement, 'border-width', '2px'); // ***THIS IS THE KEY***
    this.renderer.setStyle(this.el.nativeElement, 'border-image', `linear-gradient(${gradient}) 1`);
    this.renderer.setStyle(this.el.nativeElement, 'border-image-slice', '1');

    let position = 0;

    const animate = () => {
      position += 0.5;

      this.renderer.setStyle(this.el.nativeElement, 'border-image-position', `${position}px 0px`);
      this.animationId = requestAnimationFrame(animate);
    };

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    animate();
  }
}