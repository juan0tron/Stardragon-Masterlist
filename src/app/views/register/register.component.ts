import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { LoginResponse, LoginOptions, FacebookService, InitParams } from 'ngx-facebook';

import { GemExchangeAPI } from './../../../services/api.service';

@Component({
    selector:    'register',
    templateUrl: 'register.template.html',
    providers:   [GemExchangeAPI]
})

export class RegisterComponent {}
