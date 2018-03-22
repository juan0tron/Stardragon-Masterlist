import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {FormsModule}    from '@angular/forms';
import {TraitsComponent}  from './traits.component';

@NgModule({
    declarations: [TraitsComponent],
    imports     : [BrowserModule, RouterModule],
})

export class TraitsModule {}
