// Angular Modules
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }     from "@angular/router";

// Pages
import { DashboardComponent }         from './views/dashboard/dashboard.component';
import { DiscordComponent }           from './views/discord/discord.component';
import { StarDragonListComponent }    from './views/stardragons/stardragon-list.component';
import { StarDragonDetailsComponent } from './views/stardragons/details/stardragon-details.component';

// 3rd Party Modules
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { ROUTES }       from "./app.routes";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // Pages
    DashboardComponent,
    DiscordComponent,
    StarDragonListComponent,
    StarDragonDetailsComponent,

    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),

    // 3rd Party Modules
    SweetAlert2Module.forRoot({
        buttonsStyling: false,
        customClass: 'modal-content',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
