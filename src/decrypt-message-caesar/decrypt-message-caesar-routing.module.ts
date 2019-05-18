import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { DecryptMessageCaesarComponent } from "./decrypt-message-caesar.component";

const routes: Routes = [
    { path: "decrypt-message-caesar", component: DecryptMessageCaesarComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class DecryptMessageCaesarRoutingModule { }
