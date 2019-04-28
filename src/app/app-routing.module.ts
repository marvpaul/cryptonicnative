import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { EncryptedMessageComponent } from "./encrypted-message.component";
import { DecryptedMessageComponent } from "./decrypted-message.component";
import { EncryptMessageComponent } from "../encrypt-message/encrypt-message.component";
import { DecryptMessageComponent } from "./decrypt-message.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "encrypted-message", component: EncryptedMessageComponent },
    { path: "decrypted-message", component: DecryptedMessageComponent },
    { path: "encrypt-message", component: EncryptMessageComponent },
    { path: "decrypt-message", component: DecryptMessageComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
