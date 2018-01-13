// Modules
import { Routes, RouterModule } from "@angular/router";

// Public Views
import { DashboardComponent } from "app/views/dashboard/dashboard.component";
import { DiscordComponent }   from "app/views/discord/discord.component";

// Auth views
import { LoginComponent } from "app/views/login/login.component";

import { UserComponent } from "app/views/user/profile/user.component";

// Species traits
import { TraitsComponent } from 'app/views/stardragon/traits/traits.component';

// Routing Guards
import { LoggedInGuard } from "app/guards/logged-in.guard";
import { DevGuard }      from "app/guards/dev.guard";

export const ROUTES: Routes = [
    // Main redirect
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Public Pages
    { path: 'home',    component: DashboardComponent },
    { path: 'discord', component: DiscordComponent   },

    { path: 'login', component: LoginComponent, canActivate: [DevGuard]},

    { path: 'users',          component: UserComponent,  canActivate: [DevGuard]},
    { path: 'users/:user_id', component: UserComponent,  canActivate: [DevGuard]},

    // Species Traits Sheet
    { path: 'species/:species_name', component: TraitsComponent },

    // Handle all other routes
    { path: '**', redirectTo: '' },
];
