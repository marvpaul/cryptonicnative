import { Component, OnInit } from "@angular/core";
import { Observable } from "tns-core-modules/data/observable";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ActivatedRoute } from "@angular/router";
declare const IQKeyboardManager: any;
declare const UIKeyboardAppearance: any;

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "encrypt-message", loadChildren: "./encrypt-message/encrypt-message.module#EncryptMessageModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "InformationPage",
    moduleId: module.id,
    templateUrl: "./information-page.component.html"
})
export class InformationPageComponent   extends Observable implements OnInit {

    algorithm: String;
    information: String;
    usedLibrary: String;

    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute) {
        super();
        const query = this.route.snapshot.queryParams;
        this.algorithm = query['algorithm'];
        this.information = query['content'];
        this.usedLibrary = query['usedLibrary'];
    }

    ngOnInit(): void {
    }
}
