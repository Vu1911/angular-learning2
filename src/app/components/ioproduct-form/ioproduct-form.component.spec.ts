import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoproductFormComponent } from './ioproduct-form.component';

describe('IoproductFormComponent', () => {
  let component: IoproductFormComponent;
  let fixture: ComponentFixture<IoproductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IoproductFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IoproductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
