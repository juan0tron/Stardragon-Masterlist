// Angular Modules
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }     from "@angular/router";
import { FormsModule }      from '@angular/forms';

// Pages
import { DashboardComponent }      from './views/dashboard/dashboard.component';
import { DiscordComponent }        from './views/discord/discord.component';
import { StardragonListComponent } from './views/stardragon/list/stardragon-list.component';
import { StardragonComponent }     from './views/stardragon/profile/stardragon.component';
import { TraitsComponent }         from './views/stardragon/traits/traits.component';
import { UserComponent }           from "./views/user/profile/user.component";
import { TosComponent }            from "app/views/tos/tos.component";

// Auth Pages
import { LoginComponent }     from "./views/login/login.component";

// 3rd Party Modules
import { FacebookModule }    from 'ngx-facebook';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
// Ngx bootstrap
import { ButtonsModule } from 'ngx-bootstrap';

// Routing Guards
import { LoggedInGuard } from "./guards/logged-in.guard";
import { DevGuard }      from "./guards/dev.guard";

// Services
import { GemExchangeAPI } from './../services/api.service';

import { ROUTES }       from "./routes/app.routes";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // Pages
    DashboardComponent,
    DiscordComponent,
    StardragonListComponent,
    StardragonComponent,
    TraitsComponent,
    UserComponent,
    TosComponent,

    // Auth Pages
    LoginComponent,

    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,

    // 3rd Party Modules
    FacebookModule.forRoot(),
    SweetAlert2Module.forRoot({
        buttonsStyling:     false,
        customClass:        'modal-content',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass:  'btn'
    }),
    // NGX Bootstrap
    ButtonsModule.forRoot(),

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
