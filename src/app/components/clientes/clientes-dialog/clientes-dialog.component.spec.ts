import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesDialogComponent } from './clientes-dialog.component';

describe('ClientesDialogComponent', () => {
  let component: ClientesDialogComponent;
  let fixture: ComponentFixture<ClientesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
