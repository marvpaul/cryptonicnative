import { Component, OnInit } from "@angular/core";
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { View } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";

import * as dialogs from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    listPickerAlgos: Array<string> = ["AES", "AES", "AES", "s"];
    selectedListPickerIndex: number = 1;
    key: string = ""; 
    plainText: string = "";

    ngOnInit(): void {}

    constructor(private routerExtensions: RouterExtensions) {}

    continueAfterChoosingAlgorithmEncrypt(): void{
        if(this.listPickerAlgos[this.selectedListPickerIndex] == "AES"){
            this.routerExtensions.navigate(["encrypt-message"]);
        }  
    }

    continueAfterChoosingAlgorithmDecrypt(): void{
        if(this.listPickerAlgos[this.selectedListPickerIndex] == "AES"){
            this.routerExtensions.navigate(["/decrypt-message"]);
        }  
    }
}
