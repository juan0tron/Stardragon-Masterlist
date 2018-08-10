// Modules
import { Routes, RouterModule } from "@angular/router";

// Public Views
import { DashboardComponent }   from "app/views/dashboard/dashboard.component";
import { DiscordComponent }     from "app/views/discord/discord.component";
import { HomeComponent }        from "app/views/home/home.component";
import { TosComponent }         from "app/views/tos/tos.component";
import { MYOComponent }         from "app/views/myo/myo.component";
import { MYOThankYouComponent } from "app/views/myo/thank-you/myo-thank-you.component";

// Auth views
import { LoginComponent }    from "app/views/login/login.component";
import { RegisterComponent } from "app/views/register/register.component";

import { UserComponent } from "app/views/user/profile/user.component";
import { UserListComponent } from "app/views/user/list/user-list.component";
import { CharacterComponent } from "app/views/character/character.component";

// Stardragons
import { StardragonComponent }       from "app/views/stardragon/profile/stardragon.component";
import { StardragonIndex }           from "app/views/stardragon/index/stardragon-index.component";
import { StardragonListComponent }   from "app/views/stardragon/list/stardragon-list.component";
import { MasterList }                from "app/views/stardragon/master-list/master-list.component";
import { EditStardragonComponent }   from 'app/views/stardragon/edit/edit-stardragon.component';
import { TraitsComponent }           from 'app/views/stardragon/traits/traits.component';

// Comic
import { ComicComponent } from 'app/views/comic/comic.component';

// Routing Guards
import { LoggedInGuard } from "app/guards/logged-in.guard"; // Logged in only
import { DevGuard }      from "app/guards/dev.guard";       // Dev environment only

export const ROUTES: Routes = [
    // Main redirect
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    { path: 'home',           component: HomeComponent },
    { path: 'dashboard',      component: DashboardComponent, canActivate: [LoggedInGuard] },
    { path: 'discord',        component: DiscordComponent   },
    { path: 'termsofservice', component: TosComponent       },

    { path: 'myo',            component: MYOComponent, canActivate: [DevGuard]}, // MYO Form
    { path: 'myo/thank-you',  component: MYOThankYouComponent}, // MYO Thanks landing page

    { path: 'register', component: RegisterComponent, canActivate: [DevGuard]},

    { path: 'users',          component: UserListComponent },
    { path: 'users/:user_id', component: UserComponent },

    { path: 'character', component: CharacterComponent, canActivate: [DevGuard]},

    // Stardragons (DO NOT REARRANGE - Route order matters!!)
    { path: 'stardragons', component: StardragonIndex },
      { path: 'stardragons/list', component: MasterList, canActivate: [LoggedInGuard] },
      { path: 'stardragons/create', component: EditStardragonComponent,  canActivate: [LoggedInGuard]},

      {
        path: 'stardragons/traits',
        component: TraitsComponent,
        children:  [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: ':species_name',          component: TraitsComponent },
          { path: ':species_name/:subtype', component: TraitsComponent },
        ]
      },

      { path: 'stardragons/:stardragon_id',       component: StardragonComponent },
      { path: 'stardragons/:stardragon_id/edit',  component: EditStardragonComponent,  canActivate: [LoggedInGuard]},

    // Comic
    { path: 'comic', component: ComicComponent },
      { path: 'comic/archive', component: ComicComponent },
      { path: 'comic/:page', component: ComicComponent },

    // Redirect old routes
    { path: 'species/:species_name', redirectTo: 'stardragons/traits/:species_name', pathMatch: 'full' },

    // Handle all other routes
    { path: '**', redirectTo: '' },
];
