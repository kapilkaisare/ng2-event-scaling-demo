import { Injectable } from '@angular/core';
import { ReorderableObject } from './reorderable-object';

const SMALLEST = 10,
      SMALL = 100,
      MEDIUM = 1000,
      LARGE = 10000,
      LARGEST = 100000;

const generateObjects = (sampleCount: number): ReorderableObject[] => {
  const objects: ReorderableObject[] = [];

  for( let i = 0; i < sampleCount; i++ ) {
    objects.push(new ReorderableObject(i+1, 'item-'+(i+1) ));
  }

  return objects;
};

@Injectable()
export class ReorderableObjectService {

  constructor() { }

  getObjects(sampleSize: string): ReorderableObject[] {
    let sampleCount: number;
    switch (sampleSize) {
      case 'smallest': sampleCount = SMALLEST; break;
      case 'small': sampleCount = SMALL; break;
      case 'large': sampleCount = LARGE; break;
      case 'largest': sampleCount = LARGEST; break;
      case 'medium': 
      default: sampleCount = MEDIUM;
    }

    return generateObjects(sampleCount);
  }

}
