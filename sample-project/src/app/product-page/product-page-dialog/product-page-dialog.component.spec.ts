import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageDialogComponent } from './product-page-dialog.component';

describe('ProductPageDialogComponent', () => {
  let component: ProductPageDialogComponent;
  let fixture: ComponentFixture<ProductPageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
