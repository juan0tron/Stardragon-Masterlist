// Angular Modules
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }     from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Pages
import { HomeComponent }           from './views/home/home.component';
import { FooterComponent }         from './views/footer/footer.component';
import { LoadingComponent }        from './views/loading/loading.component';
import { DashboardComponent }      from './views/dashboard/dashboard.component';
import { MYOComponent }            from './views/myo/myo.component';
import { DiscordComponent }        from './views/discord/discord.component';
import { CharacterComponent }      from './views/character/character.component';
import { TraitsComponent }         from './views/stardragon/traits/traits.component';
import { UserComponent }           from "./views/user/profile/user.component";
import { UserListComponent }       from "./views/user/list/user-list.component";
import { InventoryComponent }      from "./views/user/inventory/inventory.component";
import { TosComponent }            from "app/views/tos/tos.component";
import { MYOThankYouComponent }    from "app/views/myo/thank-you/myo-thank-you.component";
import { MapComponent }            from "app/views/map/map.component";

// Stardragon Pages
import { StardragonIndex }           from './views/stardragon/index/stardragon-index.component';
import { StardragonListComponent }   from './views/stardragon/list/stardragon-list.component';
import { MasterList }                from './views/stardragon/master-list/master-list.component';
import { StardragonComponent }       from './views/stardragon/profile/stardragon.component';
import { StatsComponent }            from './views/stardragon/stats/stats.component';
import { EditStardragonComponent }   from './views/stardragon/edit/edit-stardragon.component';

// Comic
import { ComicComponent }    from 'app/views/comic/comic.component';
import { ComicNavComponent } from 'app/views/comic/comic-nav.component';

// Auth Pages
import { LoginComponent }     from "./views/login/login.component";
import { RegisterComponent }  from "./views/register/register.component";

// Components
import { NavigationComponent } from "./views/navigation/navigation.component";

// 3rd Party Modules
import { FacebookModule }     from 'ngx-facebook';
import { SweetAlert2Module }  from '@toverux/ngx-sweetalert2';
import { TypeaheadModule, ButtonsModule, PopoverModule } from 'ngx-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { JwtModule }          from '@auth0/angular-jwt';

// Routing Guards
import { AuthGuard } from "./guards/auth.guard";
import { DevGuard }  from "./guards/dev.guard";

// Services
import { AuthService }    from 'app/services/auth.service';
import { GemExchangeAPI } from 'app/services/api.service';

import { ROUTES }       from "./routes/app.routes";
import { CoreModule }   from './core.module';
import { AppComponent } from './app.component';

// Allows JwtModule to obtain auth tokens from localStorage
export function tokenGetter() {
  return localStorage.getItem('auth_token');
}

@NgModule({
  declarations: [
    // Pages
    HomeComponent,
    DashboardComponent,
    MYOComponent,
    DiscordComponent,
    CharacterComponent,
    TraitsComponent,
    UserComponent,
    UserListComponent,
    InventoryComponent,
    TosComponent,
    MYOThankYouComponent,
    MapComponent,

    // Stardragon pages
    StardragonIndex,
    StardragonListComponent,
    MasterList,
    StardragonComponent,
    StatsComponent,
    EditStardragonComponent,

    ComicComponent,
    ComicNavComponent,

    // Auth Pages
    LoginComponent,
    RegisterComponent,

    // General Components
    NavigationComponent,
    LoadingComponent,
    FooterComponent,

    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule, ReactiveFormsModule,

    CoreModule.forRoot(),

    // 3rd Party Modules
    FacebookModule.forRoot(),
    SweetAlert2Module.forRoot({
        buttonsStyling:     false,
        customClass:        'modal-content',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass:  'btn'
    }),
    ClickOutsideModule,
    // NGX Bootstrap
    ButtonsModule.forRoot(),
    TypeaheadModule.forRoot(),
    PopoverModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter:        tokenGetter,
        whitelistedDomains: ['localhost:3000', 'api.thegemexchange.net'],
      }
    })
  ],
  providers: [
    // Guards
    AuthGuard,
    DevGuard,

    // Services
    AuthService,
    GemExchangeAPI
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
