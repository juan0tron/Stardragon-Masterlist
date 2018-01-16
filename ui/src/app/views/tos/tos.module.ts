import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {TosComponent}   from './tos.component';

@NgModule({
    declarations: [TosComponent],
    imports     : [BrowserModule, RouterModule],
})

export class TosModule {}
