import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
//Module
import { AlmacenModule } from './components/almacen/almacen.module';
import { ClientesModule } from './components/clientes/clientes.module';
import { CreditosModule } from './components/creditos/creditos.module';
import { EmpleadosModule } from './components/empleados/empleados.module';
import { EmpresaModule } from './components/empresa/empresa.module';
import { ExtintorModule } from './components/extintor/extintor.module';
import { FacturaModule } from './components/factura/factura.module';
import { GastosModule } from './components/gastos/gastos.module';
import { PreciosModule } from './components/precios/precios.module';
import { ServiciosModule } from './components/servicios/servicios.module';
import { ProductosModule } from './components/productos/productos.module';
import { AppRoutingModule } from './app-routing.module';

//servicios

//Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AlmacenModule,
    ClientesModule,
    CreditosModule,
    EmpleadosModule,
    EmpresaModule,
    ExtintorModule,
    FacturaModule,
    GastosModule,
    ProductosModule,
    PreciosModule,
    ServiciosModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
