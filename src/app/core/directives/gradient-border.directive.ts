import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appGradientBorder]',
  standalone: true
})
export class GradientBorderDirective implements OnInit, OnDestroy {
  private animationId: number | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Apply styles directly to the element for the gradient border
    this.renderer.setStyle(this.el.nativeElement, 'border', '4px solid transparent');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '12px');
    this.renderer.setStyle(this.el.nativeElement, 'background', 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ff0000)');
    this.renderer.setStyle(this.el.nativeElement, 'backgroundClip', 'border-box');
    this.renderer.setStyle(this.el.nativeElement, 'backgroundSize', '300% 300%');

    // Start the animation
    this.animateGradient();
  }

  animateGradient(): void {
    let position = 0;
    const animate = () => {
      position = (position + 1) % 100;
      this.renderer.setStyle(this.el.nativeElement, 'backgroundPosition', `${position}% ${position}%`);
      this.animationId = requestAnimationFrame(animate);
    };
    this.animationId = requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';

// @Directive({
//   selector: '[appGradientBorder]',
//   standalone: true  // Standalone directive in Angular 19
// })
// export class GradientBorderDirective implements OnInit, OnDestroy {
//   private animationId: number | undefined;

//   constructor(private el: ElementRef, private renderer: Renderer2) {}

//   ngOnInit(): void {
//     this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
//     this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');

//     const borderOverlay = this.renderer.createElement('div');
//     this.renderer.setStyle(borderOverlay, 'position', 'absolute');
//     this.renderer.setStyle(borderOverlay, 'top', '-4px');
//     this.renderer.setStyle(borderOverlay, 'left', '-4px');
//     this.renderer.setStyle(borderOverlay, 'right', '-4px');
//     this.renderer.setStyle(borderOverlay, 'bottom', '-4px');
//     this.renderer.setStyle(borderOverlay, 'border', '4px solid transparent');
//     this.renderer.setStyle(borderOverlay, 'border-radius', '12px');
//     this.renderer.setStyle(borderOverlay, 'background', 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ff0000)');
//     this.renderer.setStyle(borderOverlay, 'background-size', '300% 300%');
//     this.renderer.setStyle(borderOverlay, 'z-index', '-1');
//     this.renderer.setStyle(borderOverlay, 'pointer-events', 'none');

//     // Append the overlay to the host element
//     this.renderer.appendChild(this.el.nativeElement, borderOverlay);

//     // Start gradient animation
//     this.animateGradient(borderOverlay);
//   }

//   animateGradient(element: HTMLElement): void {
//     let angle = 0;
//     const animate = () => {
//       angle = (angle + 1) % 360;
//       this.renderer.setStyle(element, 'background', `linear-gradient(${angle}deg, #ff0000, #00ff00, #0000ff, #ff0000)`);
//       this.animationId = requestAnimationFrame(animate);
//     };
//     this.animationId = requestAnimationFrame(animate);
//   }

//   ngOnDestroy(): void {
//     if (this.animationId) {
//       cancelAnimationFrame(this.animationId);
//     }
//   }
// }
