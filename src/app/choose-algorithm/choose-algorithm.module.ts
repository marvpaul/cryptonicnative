import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ChooseAlgorithmComponent } from "./choose-algorithm.component";
import { registerElement } from "nativescript-angular";
registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView);

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule
    ],
    declarations: [
        ChooseAlgorithmComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChooseAlgorithmModule { }
