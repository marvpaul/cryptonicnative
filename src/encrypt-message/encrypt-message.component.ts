import { Component, OnInit } from "@angular/core";
import { Observable } from "tns-core-modules/data/observable";
import { RouterExtensions } from "nativescript-angular/router";

import * as dialogs from "tns-core-modules/ui/dialogs";
declare const IQKeyboardManager: any;
declare const UIKeyboardAppearance: any;

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "encrypt-message", loadChildren: "./encrypt-message/encrypt-message.module#EncryptMessageModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "EncryptMessage",
    moduleId: module.id,
    templateUrl: "./encrypt-message.component.html"
})
export class EncryptMessageComponent   extends Observable implements OnInit {
    private iqKeyboard: IQKeyboardManager;
    key: string = ""; 
    plainText: string = "";


    constructor(private routerExtensions: RouterExtensions) {
        super(); 
        // Use the component constructor to inject providers.
        this.iqKeyboard = IQKeyboardManager.sharedManager();
        IQKeyboardManager.keyboardDistanceFromTextField = 20;
    }

    encryptMessage(): void {
        var ciphertext: string = "";

        if(this.plainText == ""){
            this.giveAlert("Please provide a text to encrypt!");
        } else if(this.key == ""){
            this.giveAlert("Please provide a key!");
        } else{
            // In preview mode the needed dependencies are not accessible
            // Therefor we wan't to paste a dummy ciphertext
            try{
                this.giveSuccessVibrationFeedback();

                // using --> crypto-js installed via npm
                var CryptoJS = require("crypto-js");
                ciphertext = CryptoJS.AES.encrypt(this.plainText, this.key);
            } catch{ 
                ciphertext = "pseudo-cipher-text";
            } 
            
            this.routerExtensions.navigate(["/encrypted-message"],
            {
                replaceUrl: false,
                queryParams: {
                    encryptedText: ciphertext
                }
            });
        }
    }

    giveAlert(text: string): void{
        try{
            var {TNSFancyAlert} = require("nativescript-fancyalert")
            TNSFancyAlert.showError(
                "Error!",
                text,
                "OK"
            );
            this.giveSuccessVibrationFeedback();      
        } catch{
            dialogs.alert(text).then(()=> {
                console.log("Dialog closed!");
            });
        }        
    }

    giveSuccessVibrationFeedback(): void{
        // // instantiate the plugin
        var {TapticEngine, TapticEngineNotificationType} = require("nativescript-taptic-engine"); 
        let tapticEngine = new TapticEngine();

        tapticEngine.notification({
            type: TapticEngineNotificationType.SUCCESS
        });
    }

    ngOnInit(): void {
        this.iqKeyboard.overrideKeyboardAppearance = true;
        this.iqKeyboard.keyboardAppearance = UIKeyboardAppearance.Dark;
    }
}
