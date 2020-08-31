import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPageDialogComponent } from './member-page-dialog.component';

describe('MemberPageDialogComponent', () => {
  let component: MemberPageDialogComponent;
  let fixture: ComponentFixture<MemberPageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
