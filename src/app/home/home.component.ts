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
        //'Camellia 256 Bit Key CBC Mode': 'camellia-256-cbc', 
        'AES 128 Bit Key CBC Mode': 'aes-128-cbc', 
        'AES 128 Bit Key CFB Mode': 'aes-128-cfb',
        'AES 128 Bit Key CTR Mode': 'aes-128-ctr',
        'AES 128 Bit Key OFB Mode': 'aes-128-ofb',
        'AES 192 Bit Key CBC Mode': 'aes-192-cbc', 
        'AES 192 Bit Key CFB Mode': 'aes-192-cfb',
        'AES 192 Bit Key CTR Mode': 'aes-192-ctr',
        'AES 192 Bit Key OFB Mode': 'aes-192-ofb',
        'AES 256 Bit Key CBC Mode': 'aes-256-cbc', 
        'AES 256 Bit Key CFB Mode': 'aes-256-cfb',
        'AES 256 Bit Key CTR Mode': 'aes-256-ctr',
        'AES 256 Bit Key OFB Mode': 'aes-256-ofb',
        'DES 56 Bit Key CBC Mode': 'des-cbc',
        'DES 56 Bit Key': 'des', 
        'DES 56 Bit Key CFB Mode': 'des-cfb',
        'DES 56 Bit Key OFB Mode': 'des-ofb',
        'Caesar Cipher': 'caesar',
        'Vigenere Cipher': 'vigenere'
        //'Blowfish 448 Bit Key CBC Mode': 'bf-cbc', 
        //'Triple DES 192 Bit Key': 'des3',
        //'IDEA 128 BIt Key CBC Mode': 'idea-cbc'
    }

    listPickerAlgos: Array<string>;

    ngOnInit(): void {
        this.listPickerAlgos = Object.keys(this.avaiableAlgorithms);
    }

    constructor(private routerExtensions: RouterExtensions) {}

    continueAfterChoosingAlgorithmEncrypt(): void{
        if(this.avaiableAlgorithms[this.listPickerAlgos[this.selectedListPickerIndex]] === 'caesar'){
            this.routerExtensions.navigate(["encrypt-message-caesar"]);
        } else{
            this.routerExtensions.navigate(["encrypt-message"],
            {
                replaceUrl: false,
                queryParams: {
                    algorithm: this.avaiableAlgorithms[this.listPickerAlgos[this.selectedListPickerIndex]]
                }
            });
        }
            
    }

    continueAfterChoosingAlgorithmDecrypt(): void{
        if(this.avaiableAlgorithms[this.listPickerAlgos[this.selectedListPickerIndex]] === 'caesar'){
            this.routerExtensions.navigate(["decrypt-message-caesar"]);
        } else{
            this.routerExtensions.navigate(["decrypt-message"],
            {
                replaceUrl: false,
                queryParams: {
                    algorithm: this.avaiableAlgorithms[this.listPickerAlgos[this.selectedListPickerIndex]]
                }
            });
        }
    }
}
