import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { DecryptMessageCaesarComponent } from "./decrypt-message-caesar.component";

@NgModule({
    imports: [
        NativeScriptFormsModule,
        NativeScriptCommonModule,
    ],
    declarations: [
        DecryptMessageCaesarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DecryptMessageCaesarModule { }
