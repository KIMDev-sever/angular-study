import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBasicSettingComponent } from './site-basic-setting.component';

describe('SiteBasicSettingComponent', () => {
  let component: SiteBasicSettingComponent;
  let fixture: ComponentFixture<SiteBasicSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteBasicSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteBasicSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
