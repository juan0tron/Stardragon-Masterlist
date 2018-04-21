// Modules
import { Routes, RouterModule } from "@angular/router";

// Public Views
import { DashboardComponent }   from "app/views/dashboard/dashboard.component";
import { DiscordComponent }     from "app/views/discord/discord.component";
import { TosComponent }         from "app/views/tos/tos.component";
import { MYOComponent }         from "app/views/myo/myo.component";
import { MYOThankYouComponent } from "app/views/myo/thank-you/myo-thank-you.component";

// Auth views
import { LoginComponent }    from "app/views/login/login.component";
import { RegisterComponent } from "app/views/register/register.component";

import { UserComponent } from "app/views/user/profile/user.component";

// Stardragons
import { StardragonComponent }       from "app/views/stardragon/profile/stardragon.component";
import { StardragonListComponent }   from "app/views/stardragon/list/stardragon-list.component";
import { EditStardragonComponent }   from 'app/views/stardragon/edit/edit-stardragon.component';
import { TraitsComponent }           from 'app/views/stardragon/traits/traits.component';

// Routing Guards
import { LoggedInGuard } from "app/guards/logged-in.guard";
import { DevGuard }      from "app/guards/dev.guard";

export const ROUTES: Routes = [
    // Main redirect
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Public Pages
    { path: 'home',           component: DashboardComponent },
    { path: 'discord',        component: DiscordComponent   },
    { path: 'termsofservice', component: TosComponent       },

    { path: 'myo',            component: MYOComponent, canActivate: [DevGuard]},
    { path: 'myo/thank-you',  component: MYOThankYouComponent},

    { path: 'login',    component: LoginComponent,    canActivate: [DevGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [DevGuard]},

    { path: 'users',          component: UserComponent,  canActivate: [DevGuard]},
    { path: 'users/:user_id', component: UserComponent,  canActivate: [DevGuard]},

    // Stardragons
    { path: 'stardragons',                      component: StardragonListComponent,  canActivate: [DevGuard]},
    { path: 'stardragons/create',               component: EditStardragonComponent,  canActivate: [DevGuard]},
    { path: 'stardragons/traits',               component: TraitsComponent },
    { path: 'stardragons/traits/:species_name', component: TraitsComponent },
    { path: 'stardragons/:stardragon_id',       component: StardragonComponent,      canActivate: [DevGuard]},

    // Redirect old routes
    { path: 'species/:species_name', redirectTo: 'stardragons/traits/:species_name', pathMatch: 'full' },

    // Handle all other routes
    { path: '**', redirectTo: '' },
];
