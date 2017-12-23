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

// Auth Pages
import { LoginComponent }     from "./views/login/login.component";

// 3rd Party Modules
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

// Routing Guards
import { LoggedInGuard } from "./guards/logged-in.guard";
import { DevGuard }      from "./guards/dev.guard";

// Services
import { GemExchangeAPI } from './../services/api.service';

import { ROUTES }       from "./app.routes";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // Pages
    DashboardComponent,
    DiscordComponent,
    StarDragonListComponent,
    StarDragonDetailsComponent,

    // Auth Pages
    LoginComponent,

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
  providers: [
    // Guards
    DevGuard,
    LoggedInGuard,

    // Services
    GemExchangeAPI
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
