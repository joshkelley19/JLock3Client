import { Injectable } from '@angular/core';

@Injectable()
export class RuntimeLoggingService{

    printError(message: string, error: any = 'No further details'){
        console.error(message, error);
    }

    printDebug(debugMessage: any){
        console.debug(debugMessage);
    }
}