import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DecryptedMessageComponent } from "./decrypted-message.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule,
    ],
    declarations: [
        DecryptedMessageComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DecryptedMessageModule { }
