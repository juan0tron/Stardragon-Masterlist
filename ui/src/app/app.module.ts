import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Pages
import { DashboardComponent }      from './views/dashboard/dashboard.component';
import { StarDragonListComponent } from './views/stardragons/stardragon-list.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // Pages
    DashboardComponent,
    StarDragonListComponent,

    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
