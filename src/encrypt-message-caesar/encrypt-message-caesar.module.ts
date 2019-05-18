import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { EncryptMessageCaesarComponent } from "./encrypt-message-caesar.component";

@NgModule({
    imports: [
        NativeScriptFormsModule,
        NativeScriptCommonModule,
    ],
    declarations: [
        EncryptMessageCaesarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EncryptMessageCaesarModule { }
