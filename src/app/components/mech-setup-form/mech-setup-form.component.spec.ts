import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MechSetupFormComponent } from './mech-setup-form.component';

describe('MechSetupFormComponent', () => {
  let component: MechSetupFormComponent;
  let fixture: ComponentFixture<MechSetupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MechSetupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MechSetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
