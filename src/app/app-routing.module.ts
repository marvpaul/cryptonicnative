import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { EncryptedMessageComponent } from "./encrypted-message.component";
import { DecryptedMessageComponent } from "./decrypted-message.component";
import { EncryptMessageCaesarComponent } from "~/encrypt-message-caesar/encrypt-message-caesar.component";
import { DecryptMessageCaesarComponent } from "~/decrypt-message-caesar/decrypt-message-caesar.component";
import { EncryptMessageComponent } from "~/encrypt-message/encrypt-message.component";
import { DecryptMessageComponent } from "./decrypt-message.component";
import {InformationPageComponent} from "~/information-page/information-page.component";
import {ChooseAlgorithmComponent} from "~/app/choose-algorithm/choose-algorithm.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "encrypted-message", component: EncryptedMessageComponent },
    { path: "decrypted-message", component: DecryptedMessageComponent },
    { path: "encrypt-message", component: EncryptMessageComponent },
    { path: "encrypt-message-caesar", component: EncryptMessageCaesarComponent },
    { path: "decrypt-message-caesar", component: DecryptMessageCaesarComponent },
    { path: "decrypt-message", component: DecryptMessageComponent },
    { path: "information-page", component: InformationPageComponent},
    { path: "choose-algorithm", component: ChooseAlgorithmComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
