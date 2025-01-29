import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SHaredGridComponent } from './shared-grid.component';

describe('SHaredGridComponent', () => {
  let component: SHaredGridComponent;
  let fixture: ComponentFixture<SHaredGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SHaredGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SHaredGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
