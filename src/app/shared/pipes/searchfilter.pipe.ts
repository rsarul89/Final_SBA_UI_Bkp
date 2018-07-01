import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
    transform(items: any[], label: string, value: string): any[] {
        if (!items) return [];
        if (!value) return items;
        if (value == '' || value == null) return [];
        return items.filter(it => it[label].toString().toLowerCase().indexOf(value.toLowerCase()) > -1);
    }
}
