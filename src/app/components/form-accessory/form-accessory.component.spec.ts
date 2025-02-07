import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAccessoryComponent } from './form-accessory.component';

describe('FormAccessoryComponent', () => {
  let component: FormAccessoryComponent;
  let fixture: ComponentFixture<FormAccessoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAccessoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
