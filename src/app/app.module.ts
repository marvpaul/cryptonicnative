import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { EncryptedMessageComponent } from "./encrypted-message.component";
import { DecryptedMessageComponent } from "./decrypted-message.component";
import { EncryptMessageComponent } from "~/encrypt-message/encrypt-message.component";
import { EncryptMessageCaesarComponent } from "~/encrypt-message-caesar/encrypt-message-caesar.component";

import { DecryptMessageCaesarComponent } from "~/decrypt-message-caesar/decrypt-message-caesar.component";
import { DecryptMessageComponent } from "./decrypt-message.component";
import {InformationPageComponent} from "~/information-page/information-page.component";
import {ChooseAlgorithmComponent} from "~/app/choose-algorithm/choose-algorithm.component";



@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule
    ],
    declarations: [
        AppComponent,
        EncryptedMessageComponent,
        EncryptMessageComponent,
        DecryptMessageComponent,
        DecryptedMessageComponent,
        EncryptMessageCaesarComponent,
        DecryptMessageCaesarComponent,
        InformationPageComponent,
        ChooseAlgorithmComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
