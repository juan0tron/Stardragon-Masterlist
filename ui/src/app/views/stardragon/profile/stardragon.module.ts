import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {StardragonComponent}  from './stardragon.component';

@NgModule({
    declarations: [StardragonComponent],
    imports     : [BrowserModule, RouterModule],
})

export class StardragonModule {}
