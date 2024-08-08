import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input'; // Input module
import { MatButtonModule } from '@angular/material/button'; // Button module
import { MatFormFieldModule } from '@angular/material/form-field'; // Form Field module
import { MatCardModule } from '@angular/material/card'; // Card module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Step2Component } from './components/signup/step2/step2.component';
import { authReducer } from './store/auth.reducer';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Step2Component,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
