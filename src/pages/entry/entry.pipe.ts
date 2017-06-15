import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'letterShow'
})
export class LetterShowPipe implements PipeTransform{
    emptyArray: Array<string> = [];
    
    getLetters(entries: Array<any>){
        let newArray = entries.forEach(entry => {
            let letter = entry.website.charAt(0).toUpperCase();
            if(this.emptyArray.indexOf(letter) < 0){
                this.emptyArray.push(letter);
            }
        });
    }

    transform(letters: Array<string>, entries: Array<any>): Array<string>{
        this.getLetters(entries);
        let newArray = letters.filter(letter => this.emptyArray.indexOf(letter) >= 0);
        return newArray;
    }
}