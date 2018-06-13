// Angular Modules
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }     from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Pages
import { DashboardComponent }      from './views/dashboard/dashboard.component';
import { MYOComponent }            from './views/myo/myo.component';
import { DiscordComponent }        from './views/discord/discord.component';
import { TraitsComponent }         from './views/stardragon/traits/traits.component';
import { UserComponent }           from "./views/user/profile/user.component";
import { UserListComponent }       from "./views/user/list/user-list.component";
import { TosComponent }            from "app/views/tos/tos.component";
import { MYOThankYouComponent }    from "app/views/myo/thank-you/myo-thank-you.component";

// Stardragon Pages
import { StardragonListComponent }   from './views/stardragon/list/stardragon-list.component';
import { StardragonComponent }       from './views/stardragon/profile/stardragon.component';
import { StatsComponent }            from './views/stardragon/stats/stats.component';
import { EditStardragonComponent }   from './views/stardragon/edit/edit-stardragon.component';

// Auth Pages
import { LoginComponent }     from "./views/login/login.component";
import { RegisterComponent }  from "./views/register/register.component";

// Components
import { NavigationComponent } from "./views/navigation/navigation.component";

// 3rd Party Modules
import { FacebookModule }     from 'ngx-facebook';
import { SweetAlert2Module }  from '@toverux/ngx-sweetalert2';
import { ButtonsModule }      from 'ngx-bootstrap';
import { NgxTypeaheadModule } from 'ngx-typeahead';

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
    MYOComponent,
    DiscordComponent,
    TraitsComponent,
    UserComponent,
    UserListComponent,
    TosComponent,
    MYOThankYouComponent,

    // Stardragon pages
    StardragonListComponent,
    StardragonComponent,
    StatsComponent,
    EditStardragonComponent,

    // Auth Pages
    LoginComponent,
    RegisterComponent,

    // General Components
    NavigationComponent,

    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule, ReactiveFormsModule,

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
    NgxTypeaheadModule

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
