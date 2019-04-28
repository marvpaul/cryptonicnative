import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { EncryptMessageComponent } from "./encrypt-message.component";

const routes: Routes = [
    { path: "encrypt-message", component: EncryptMessageComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EncryptMessageRoutingModule { }
