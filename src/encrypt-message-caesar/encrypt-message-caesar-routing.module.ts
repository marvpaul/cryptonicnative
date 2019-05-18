import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { EncryptMessageCaesarComponent } from "./encrypt-message-caesar.component";

const routes: Routes = [
    { path: "encrypt-message-caesar", component: EncryptMessageCaesarComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EncryptMessageCaesarRoutingModule { }
