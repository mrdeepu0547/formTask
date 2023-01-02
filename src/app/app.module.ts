import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PsListComponent } from './ps-list/ps-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { DatePipe } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './New/login/login.component';
import { RegisterComponent } from './New/register/register.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PsListComponent,
    FormComponent,
    ContentComponent,
    LoginComponent,
    RegisterComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
