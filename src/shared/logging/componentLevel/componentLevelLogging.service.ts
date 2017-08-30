import { Injectable } from '@angular/core';

import { ComponentMessage } from '../../../model/ComponentMessage';

@Injectable()
export class ComponentLoggingService {
    errors: Array<ComponentMessage>;
    warnings: Array<ComponentMessage>;
}