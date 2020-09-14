import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSeittingPageComponent } from './main-seitting-page.component';

describe('MainSeittingPageComponent', () => {
  let component: MainSeittingPageComponent;
  let fixture: ComponentFixture<MainSeittingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSeittingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSeittingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
