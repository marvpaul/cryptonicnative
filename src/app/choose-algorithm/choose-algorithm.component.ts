import { Component, OnInit } from "@angular/core";
import { Observable} from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { View } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";

import * as dialogs from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: "ChooseAlgorithm",
    moduleId: module.id,
    templateUrl: "./choose-algorithm.component.html"
})
export class ChooseAlgorithmComponent extends Observable implements OnInit {
    selectedListPickerIndex: number = 1;
    avaiableAlgorithms = {
        "AES": {
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
        },
        "DES": {
            'DES 56 Bit Key CBC Mode': 'des-cbc',
            'DES 56 Bit Key CFB Mode': 'des-cfb',
            'DES 56 Bit Key OFB Mode': 'des-ofb',
        },
        "Blowfish": {
            'Blowfish 32 Bit Key ECB Mode': 'BLOWFISH-32-ECB',
            'Blowfish 32 Bit Key CBC Mode': 'BLOWFISH-32-CBC',
            'Blowfish 64 Bit Key ECB Mode': 'BLOWFISH-64-ECB',
            'Blowfish 64 Bit Key CBC Mode': 'BLOWFISH-64-CBC',
            'Blowfish 128 Bit Key ECB Mode': 'BLOWFISH-128-ECB',
            'Blowfish 128 Bit Key CBC Mode': 'BLOWFISH-128-CBC',
            'Blowfish 256 Bit Key ECB Mode': 'BLOWFISH-256-ECB',
            'Blowfish 256 Bit Key CBC Mode': 'BLOWFISH-256-CBC',
            'Blowfish 448 Bit Key ECB Mode': 'BLOWFISH-448-ECB',
            'Blowfish 448 Bit Key CBC Mode': 'BLOWFISH-448-CBC',
        }
    };

    listPickerAlgos: Array<string>;
    encryption: any;
    title: String = "";


    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute) {
        super();
        const query = this.route.snapshot.queryParams;
        this.listPickerAlgos = Object.keys(this.avaiableAlgorithms[query.baseAlgorithm]);
        this.encryption = query.encryption;
        if(this.encryption === 'true'){
            this.title = "Encrypt message";
        } else {
            this.title = "Decrypt message";
        }
    }

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

    ngOnInit(): void {
    }
}
