import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import * as dialogs from "tns-core-modules/ui/dialogs";


/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "encrypted-message", loadChildren: "./encrypted-message/encrypted-message.module#EncryptedMessageModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "DecryptedMessage",
    moduleId: module.id,
    templateUrl: "./decrypted-message.component.html"
})
export class DecryptedMessageComponent implements OnInit {
    decryptedText: string = ""; 
    constructor(private route: ActivatedRoute){
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
       const query = this.route.snapshot.queryParams;
       this.decryptedText = query['decryptedText']; 
    }

    copyToClipboard(): void{
        try{
            var {TNSFancyAlert} = require("nativescript-fancyalert")
            var clipboard = require("nativescript-clipboard");
            clipboard.setText(this.decryptedText).then(function() {
                // show success
                TNSFancyAlert.showSuccess(
                    "Success!",
                    "Copied to clipboard!",
                    "OK"
                );
            }); 
            this.giveSuccessVibrationFeedback();
            
        } catch{
            dialogs.alert("Sorry, something wen't wrong! Please manaully copy t text.").then(()=> {
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
}
