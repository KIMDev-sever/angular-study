import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoitceDialogComponent } from './noitce-dialog.component';

describe('NoitceDialogComponent', () => {
  let component: NoitceDialogComponent;
  let fixture: ComponentFixture<NoitceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoitceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoitceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
