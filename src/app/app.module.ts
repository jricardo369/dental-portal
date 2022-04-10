import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './common/login/login.component';
import { BarComponent } from './common/bar/bar.component';
import { InicioComponent } from './common/inicio/inicio.component';
import { DialogoSimpleComponent } from './common/dialogo-simple/dialogo-simple.component';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './common/login-form/login-form.component';
import { DialogoLoginComponent } from './common/dialogo-login/dialogo-login.component';
import { TusCredencialesComponent } from './common/tus-credenciales/tus-credenciales.component';
import { DialogoFrameComponent } from './common/dialogo-frame/dialogo-frame.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        //
        BarComponent,
        //
        InicioComponent,
        DialogoSimpleComponent,
        DialogoLoginComponent,
        DialogoFrameComponent,
        LoginFormComponent,
        TusCredencialesComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    entryComponents: [
        DialogoSimpleComponent,
        DialogoLoginComponent,
        DialogoFrameComponent,
    ],
    providers: [
        SessionService,
        { provide: LOCALE_ID, useValue: "en-US" }, //replace "en-US" with your locale
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
