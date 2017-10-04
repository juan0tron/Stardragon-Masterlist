import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }     from "@angular/router";

// Pages
import { DashboardComponent }         from './views/dashboard/dashboard.component';
import { DiscordComponent }           from './views/discord/discord.component';
import { StarDragonListComponent }    from './views/stardragons/stardragon-list.component';
import { StarDragonDetailsComponent } from './views/stardragons/details/stardragon-details.component';

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
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
