import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { EncryptMessageComponent } from "./encrypt-message.component";

@NgModule({
    imports: [
        NativeScriptFormsModule,
        NativeScriptCommonModule,
    ],
    declarations: [
        EncryptMessageComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EncryptMessageModule { }
