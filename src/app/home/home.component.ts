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
    selectedListPickerIndex: number = 1;
    key: string = ""; 
    plainText: string = "";
    avaiableAlgorithms = {
        'Camellia 256 Bit Key CBC Mode': 'camellia-256-cbc', 
        'AES 256 Bit Key CBC Mode': 'aes-256-cbc', 
        'DES 56 Bit Key CBC Mode': 'des-cbc',
        'Blowfish 448 Bit Key CBC Mode': 'bf-cbc', 
        'Triple DES 192 Bit Key': 'des3',
        'IDEA 128 BIt Key CBC Mode': 'idea-cbc'
    }


    listPickerAlgos: Array<string>;

    ngOnInit(): void {
        this.listPickerAlgos = Object.keys(this.avaiableAlgorithms);
    }

    constructor(private routerExtensions: RouterExtensions) {}

    continueAfterChoosingAlgorithmEncrypt(): void{
            this.routerExtensions.navigate(["encrypt-message"],
            {
                replaceUrl: false,
                queryParams: {
                    algorithm: this.avaiableAlgorithms[this.listPickerAlgos[this.selectedListPickerIndex]]
                }
            });
    }

    continueAfterChoosingAlgorithmDecrypt(): void{
        this.routerExtensions.navigate(["decrypt-message"],
            {
                replaceUrl: false,
                queryParams: {
                    algorithm: this.avaiableAlgorithms[this.listPickerAlgos[this.selectedListPickerIndex]]
                }
            });
    }
}
