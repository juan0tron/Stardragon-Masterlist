import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

// Pages
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // Pages
    DashboardComponent,

    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
