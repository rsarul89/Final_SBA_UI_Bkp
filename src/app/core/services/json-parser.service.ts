import { Injectable } from '@angular/core';

@Injectable()
export class JsonParserService {
    rebuildJsonDotNetObj(obj): any {
        let arr = new Array();
        this.buildRefArray(obj, arr);
        return this.setReferences(obj, arr)
    }
    private buildRefArray(obj, arr): any {
        if (!obj || obj['$ref'])
            return;
        let objId = obj['$id'];
        if (!objId) {
            obj['$id'] = "x";
            return;
        }
        let id = parseInt(objId);
        let array = obj['$values'];
        if (array && Array.isArray(array)) {
            arr[id] = array;
            array.forEach(function (elem) {
                if (typeof elem === "object")
                    this.buildRefArray(elem, arr);
            });
        }
        else {
            arr[id] = obj;
            for (let prop in obj) {
                if (typeof obj[prop] === "object") {
                    this.buildRefArray(obj[prop], arr);
                }
            }
        }
    }

    private setReferences(obj, arrRefs): any {
        if (!obj)
            return obj;
        let ref = obj['$ref'];
        if (ref)
            return arrRefs[parseInt(ref)];

        if (!obj['$id']) //already visited
            return obj;

        let array = obj['$values'];
        if (array && Array.isArray(array)) {
            for (let i = 0; i < array.length; ++i)
                array[i] = this.setReferences(array[i], arrRefs)
            return array;
        }
        for (let prop in obj)
            if (typeof obj[prop] === "object")
                obj[prop] = this.setReferences(obj[prop], arrRefs)
        delete obj['$id'];
        return obj;
    }

     restoreJsonNetCR(g) {   
        return this.relink(g);
      }
       relink (s) {
        let ids = {}; 
        // we care naught about primitives
        if (s === null || typeof s !== "object") { return s; }
    
        let id = s['$id'];
        delete s['$id'];
    
        // either return previously known object, or
        // remember this object linking for later
        if (ids[id]) {
          return ids[id];
        }
        ids[id] = s;
    
        // then, recursively for each key/index, relink the sub-graph
        if (s.hasOwnProperty('length')) {
          // array or array-like; a different guard may be more appropriate
          for (var i = 0; i < s.length; i++) {
            s[i] = this.relink(s[i]);
          }
        } else {
          // other objects
          for (var p in s) {
            if (s.hasOwnProperty(p)) {
              s[p] = this.relink(s[p]);
            }
          }
        }
    
        return s;
      }
}