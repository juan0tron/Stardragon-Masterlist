import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {FormsModule}    from '@angular/forms';
import {StarshooterTraitsComponent}  from './starshooter-traits.component';

@NgModule({
    declarations: [StarshooterTraitsComponent],
    imports     : [BrowserModule, RouterModule],
})

export class StarshooterTraitsModule {}
