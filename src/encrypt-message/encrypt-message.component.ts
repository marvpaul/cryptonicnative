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
    selector: "EncryptMessage",
    moduleId: module.id,
    templateUrl: "./encrypt-message.component.html"
})
export class EncryptMessageComponent   extends Observable implements OnInit {
    private iqKeyboard: IQKeyboardManager;
    key: string = ""; 
    plainText: string = "";
    choosenAlgorithm: string = ""; 


    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute) {
        super(); 
        // Use the component constructor to inject providers.
        this.iqKeyboard = IQKeyboardManager.sharedManager();
        IQKeyboardManager.keyboardDistanceFromTextField = 20;
        const query = this.route.snapshot.queryParams;
        this.choosenAlgorithm = query['algorithm']; 
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

                require("nativescript-nodeify");
                var crypto = require("crypto-module");
                ciphertext = crypto.encryptMessage(this.plainText, this.key, this.choosenAlgorithm);
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
