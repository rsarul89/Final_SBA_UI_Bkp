import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'filterbyobject'
})

@Injectable()
export class FilterByObject implements PipeTransform {
    transform(items: any[], objectName: string, propertyName: any, value: string): any[] {
        if (!items) return [];
        if (!value) return items;
        if (value == '' || value == null) return [];
        return items.filter(it => it[objectName][propertyName].toString().toLowerCase().indexOf(value.toLowerCase()) > -1);
    }
}
