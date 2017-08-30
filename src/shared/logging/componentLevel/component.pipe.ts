import { Pipe, PipeTransform } from '@angular/core';

import { ComponentMessage } from '../../../model/ComponentMessage';

@Pipe({
    name: 'component'
})
export class ComponentPipe implements PipeTransform {
    transform(values: Array<ComponentMessage>, currentComponent: string = 'ALL'){
        if(currentComponent === 'ALL'){
            return values;
        }
        return values.filter(value => {
            return value.component === currentComponent;
        })
    }
}