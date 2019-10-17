import { Component, OnInit } from "@angular/core";
import { Observable } from "tns-core-modules/data/observable";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ActivatedRoute } from "@angular/router";
declare const IQKeyboardManager: any;
declare const UIKeyboardAppearance: any;

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "encrypt-message", loadChildren: "./encrypt-message/encrypt-message.module#EncryptMessageModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "EncryptMessageCaesar",
    moduleId: module.id,
    templateUrl: "./encrypt-message-caesar.component.html"
})
export class EncryptMessageCaesarComponent   extends Observable implements OnInit {
    private iqKeyboard: IQKeyboardManager;
    key: any = ""; 
    plainText: string = "";


    constructor(private routerExtensions: RouterExtensions) {
        super(); 
        // Use the component constructor to inject providers.
        this.iqKeyboard = IQKeyboardManager.sharedManager();
        IQKeyboardManager.keyboardDistanceFromTextField = 20;
    }



    showInformation(): void {
        this.routerExtensions.navigate(["/information-page"],
            {
                replaceUrl: false,
                queryParams: {
                    algorithm: 'Caesar',
                    content: 'In cryptography, a Caesar cipher, also known as Caesar\'s cipher, the shift cipher, Caesar\'s code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a right shift of 3, A would be replaced by D, B would become E, and so on. The method is named after Julius Caesar, who used it in his private correspondence. (Source: https://en.wikipedia.org/wiki/Caesar_cipher).',
                    usedLibrary: 'Used implementation: https://gist.github.com/EvanHahn/2587465'
                }
            });
    }

    encryptMessage(): void {
        var ciphertext: string = "";

        if(this.plainText == ""){
            this.giveAlert("Please provide a text to encrypt!");
        } else if(this.key == ""){
            this.giveAlert("Please provide a key!");
        } else if(isNaN(this.key)){
            this.giveAlert("For caesar cipher only digits are allowed as a key");
        } else{
            // In preview mode the needed dependencies are not accessible
            // Therefor we wan't to paste a dummy ciphertext
            try{
                this.giveSuccessVibrationFeedback();
            } catch{ 
                ciphertext = "pseudo-cipher-text";
            } 
            require("nativescript-nodeify");
            var cryptoModule = require("crypto-module");
            ciphertext = cryptoModule.encryptMessage(this.plainText, parseInt(this.key), 'caesar');
            
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
