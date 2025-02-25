import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersListsComponent } from './sellers-lists.component';

describe('SellersListsComponent', () => {
  let component: SellersListsComponent;
  let fixture: ComponentFixture<SellersListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellersListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellersListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
