import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppBarNavItem, NAV_MENU_IZQUIERDA_TEMPLATE, UtilServiceTest, NAV_MENU_IZQUIERDA_STYLES } from '../../app-nav-item';
import { SessionService } from '../../services/session.service';

import { ADMIN_CAJA_CHICA_ITEMS } from '../administracion-caja-chica-routing.module';
import { UtilService } from 'src/app/services/util.service';
let ITEMS = ADMIN_CAJA_CHICA_ITEMS;

@Component({
    selector: 'app-caja-chica-nav',
    template: NAV_MENU_IZQUIERDA_TEMPLATE,
    styles: [NAV_MENU_IZQUIERDA_STYLES]
})
export class CajaChicaNavComponent extends UtilServiceTest {
    constructor(router: Router, utilService: UtilService, sessionService: SessionService) { super(router, utilService, sessionService, ITEMS); }
}