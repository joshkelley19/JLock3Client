import { Component, Input } from '@angular/core';

import { ComponentLoggingService } from './componentLevelLogging.service';

@Component({
    selector: 'logging-component',
    templateUrl: './logging.component.html'
})
export class ComponentLoggingComponent {
    @Input() parent: string;
    constructor(private componentService: ComponentLoggingService) {

    }
}