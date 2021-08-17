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
import { LoginModule } from './components/seguridad/login/login.module';
import { RegistroUsuarioModule } from './components/seguridad/registroUsuario/registro-usuario.module';

//servicios

//Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptors/interceptor';



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
    LoginModule,
    RegistroUsuarioModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
