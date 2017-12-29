import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {UserListComponent}  from './user-list.component';

@NgModule({
    declarations: [UserListComponent],
    imports     : [BrowserModule, RouterModule],
})

export class UserListModule {}
