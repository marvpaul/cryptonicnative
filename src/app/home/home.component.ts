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
    availableBaseAlgorithms = [
        "Caesar",
        "Vigenere",
        "AES",
        "DES",
        "Blowfish"
    ];

    ngOnInit(): void {
    }

    constructor(private routerExtensions: RouterExtensions) {}

    continueAfterChoosingAlgorithmEncrypt(): void{
        console.log(this.availableBaseAlgorithms[this.selectedListPickerIndex]);
        if(this.availableBaseAlgorithms[this.selectedListPickerIndex] === 'Caesar'){
            this.routerExtensions.navigate(["encrypt-message-caesar"]);
        } else if(this.availableBaseAlgorithms[this.selectedListPickerIndex] === 'Vigenere') {

            this.routerExtensions.navigate(["encrypt-message"],
                {
                    replaceUrl: false,
                    queryParams: {
                        algorithm: this.availableBaseAlgorithms[this.selectedListPickerIndex],
                    }
                });
        } else {
            this.routerExtensions.navigate(["choose-algorithm"],
                {
                    replaceUrl: false,
                    queryParams: {
                        baseAlgorithm: this.availableBaseAlgorithms[this.selectedListPickerIndex],
                        encryption: true
                    }
                });
        }
            
    }

    continueAfterChoosingAlgorithmDecrypt(): void{
        if(this.availableBaseAlgorithms[this.selectedListPickerIndex] === 'Caesar'){
            this.routerExtensions.navigate(["decrypt-message-caesar"]);
        } else if(this.availableBaseAlgorithms[this.selectedListPickerIndex] === 'Vigenere') {

            this.routerExtensions.navigate(["decrypt-message"],
                {
                    replaceUrl: false,
                    queryParams: {
                        algorithm: this.availableBaseAlgorithms[this.selectedListPickerIndex],
                    }
                });
        } else {
            this.routerExtensions.navigate(["choose-algorithm"],
                {
                    replaceUrl: false,
                    queryParams: {
                        baseAlgorithm: this.availableBaseAlgorithms[this.selectedListPickerIndex],
                        encryption: false
                    }
                });
        }
    }
}
