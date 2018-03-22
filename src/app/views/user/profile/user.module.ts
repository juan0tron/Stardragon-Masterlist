import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {UserComponent}  from './user.component';

@NgModule({
    declarations: [UserComponent],
    imports     : [BrowserModule, RouterModule],
})

export class UserModule {}
