import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'letterFilter'
})
export class LetterFilterPipe implements PipeTransform{
    transform(entries: Array<any>, letter: string): Array<any>{
        let newArray = entries.filter(entry => entry.website.charAt(0).toLowerCase() === letter.toLowerCase());
        return newArray;
    }
}