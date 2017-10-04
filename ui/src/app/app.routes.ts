// Modules
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { DiscordComponent }   from "./views/discord/discord.component";

export const ROUTES: Routes = [
    // Main redirect
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // App Views
    { path: 'home',    component: DashboardComponent },
    { path: 'discord', component: DiscordComponent   },

    // Handle all other routes
    { path: '**', redirectTo: '' },
];
