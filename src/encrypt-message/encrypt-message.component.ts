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
    informations = {
        vigenere: {
            algorithm: 'Vigenere',
            content: 'Vigenere Cipher is a method of encrypting alphabetic text. It uses a simple form of polyalphabetic substitution. A polyalphabetic cipher is any cipher based on substitution, using multiple substitution alphabets .The encryption of the original text is done using the Vigenère square or Vigenère table. (Source: https://www.geeksforgeeks.org/vigenere-cipher/)',
            usedLibrary: 'https://github.com/sheharyarn/cipherjs'
        },
        aes: {
            algorithm: 'AES',
            content: 'The Advanced Encryption Standard, or AES, is a symmetric block cipher chosen by the U.S. government to protect classified information and is implemented in software and hardware throughout the world to encrypt sensitive data. (Source: https://searchsecurity.techtarget.com/definition/Advanced-Encryption-Standard).\\n',
            usedLibrary: 'We used the build in crypto library of node for AES encryption with a random initialization vector and a 8 byte random salt. For key derivation we\'ve used https://www.npmjs.com/package/scryptsy with 1024 internal iterations.'
        },
        des: {
            algorithm: 'DES',
            content: 'The Data Encryption Standard (DES) is a symmetric-key algorithm for the encryption of electronic data. Although its short key length of 56 bits, criticized from the beginning, makes it too insecure for most current applications, it was highly influential in the advancement of modern cryptography. (Source: https://en.wikipedia.org/wiki/Data_Encryption_Standard)',
            usedLibrary: 'We used the build in crypto library of node for DES encryption with a random initialization vector and a 8 byte random salt. For key derivation we\'ve used https://www.npmjs.com/package/scryptsy with 1024 internal iterations.'
        },
        blowfish: {
            algorithm: 'Blowfish',
            content: 'Blowfish is a symmetric block cipher that can be used as a drop-in replacement for DES or IDEA. It takes a variable-length key, from 32 bits to 448 bits, making it ideal for both domestic and exportable use. Blowfish was designed in 1993 by Bruce Schneier as a fast, free alternative to existing encryption algorithms. Since then it has been analyzed considerably, and it is slowly gaining acceptance as a strong encryption algorithm. Blowfish is unpatented and license-free, and is available free for all uses. (Source: https://www.schneier.com/academic/blowfish/ )',
            usedLibrary: 'We used this implementation: https://github.com/egoroof/blowfish . For encryption a random initialization vector, pad with zero (null) characters (null padding), and a 8 byte random salt is used. For key derivation we\'ve used https://www.npmjs.com/package/scryptsy with 1024 internal iterations.'
        }
    };


    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute) {
        super(); 
        // Use the component constructor to inject providers.
        this.iqKeyboard = IQKeyboardManager.sharedManager();
        IQKeyboardManager.keyboardDistanceFromTextField = 20;
        const query = this.route.snapshot.queryParams;
        this.choosenAlgorithm = query['algorithm'];
        console.log(this.choosenAlgorithm);
    }

    showInformation(): void {
        console.log(this.choosenAlgorithm);
        let informationPageContent =  {};
        if(this.choosenAlgorithm.includes("aes")){
            informationPageContent = this.informations.aes;
        } else if(this.choosenAlgorithm.includes("des")){
            informationPageContent = this.informations.des;
        } else if(this.choosenAlgorithm.includes("BLOWFISH")){
            informationPageContent = this.informations.blowfish;
        } else if(this.choosenAlgorithm.includes("vigenere")){
            informationPageContent = this.informations.vigenere;
        }
        this.routerExtensions.navigate(["/information-page"],
            {
                replaceUrl: false,
                queryParams: informationPageContent
            });
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

                
            } catch{ 
                ciphertext = "pseudo-cipher-text";
            } 
            require("nativescript-nodeify");
            var cryptoModule = require("crypto-module");
            ciphertext = cryptoModule.encryptMessage(this.plainText, this.key, this.choosenAlgorithm);
            
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
