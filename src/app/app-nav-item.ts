import { Usuario } from "../model/usuario";
import { Router } from "@angular/router";
import { SessionService } from "./services/session.service";
import { UtilService } from './services/util.service';

export const NAV_MENU_IZQUIERDA_TEMPLATE =
    `
    <button *ngFor='let workspace of workspaces; let i = index' class='{{i == 0 ? "iigwo home" : (isWorkspaceCurrentPath(workspace) ? "iigwo accent" : "iigwo")}}'
        (click)='navigateToWorkspacePath($event, workspace)'>
        <mat-icon svgIcon="{{workspace.svgName}}"></mat-icon>
        <label>{{workspace.title}}</label>
    </button>

    <button class="iigwo bottom" (click)="utilService.workspaceNavMenuShortened = !utilService.workspaceNavMenuShortened">
        <mat-icon svgIcon="arrow-back" *ngIf="!utilService.workspaceNavMenuShortened"></mat-icon>
        <mat-icon svgIcon="arrow-forward" *ngIf="utilService.workspaceNavMenuShortened"></mat-icon>
        <label *ngIf="!utilService.workspaceNavMenuShortened" i18n='@@Ocultar'>Ocultar</label>
        <label *ngIf="utilService.workspaceNavMenuShortened">Mostrar</label>
    </button>

    `;

export const NAV_MENU_IZQUIERDA_STYLES = `

    :host {
        display: flex;
        flex-flow: column;
        height: 100%;
    }

    button.iigwo.bottom {
        margin-top: auto;
        margin-bottom: 8px;
        border-top: 1px rgba(0,0,0,0.1) solid;
    }
`

export class UtilServiceTest {

    workspaces = [];
    ITEMS: AppBarNavItem[];

    constructor(
        private router: Router,
        public utilService: UtilService,
        private sessionService: SessionService, ITEMS: AppBarNavItem[]
    ) {
        this.ITEMS = ITEMS;

        if (sessionService.sessionUsuarioPromise) {
            sessionService.sessionUsuarioPromise
                .then(u => {
                    this.updateItems(u);
                    this.updateUsuario();
                }).catch(e => {
                    this.updateUsuario();
                })
        } else this.updateUsuario();
    }

    updateUsuario() {
        this.sessionService
            .getUsuario()
            .then(u => {
                this.updateItems(u);
            })
    }

    updateItems(u: Usuario) {
        this.workspaces = [this.ITEMS[0].module];
        this.ITEMS
            .filter(e => e.isVisibleFor(u))
            .forEach(e => this.workspaces.push(e));
    }

    isWorkspaceCurrentPath(workspace: AppBarNavItem) { return window.location.pathname.endsWith(AppBarNavItem.path(workspace)); }
    
    navigateToWorkspacePath(event, workspace: AppBarNavItem): void { 
        this.utilService.workspaceNavMenuOpened = false;
        setTimeout(()=>{
            this.router.navigate([AppBarNavItem.path(workspace)]); 
        }, 0)
    }
}

export class AppBarNavItem {


    module: AppBarNavItem;
    title: string;
    subtitle: string;

    uri: string;
    svgName: string;

    isVisibleFor(u: Usuario): boolean { return true }

    static path(e: AppBarNavItem): string {
        return e.module ? e.module.uri + '/' + e.uri : e.uri;
    }
}