import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtintorComponent } from './extintor.component';

describe('ExtintorComponent', () => {
  let component: ExtintorComponent;
  let fixture: ComponentFixture<ExtintorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtintorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtintorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
