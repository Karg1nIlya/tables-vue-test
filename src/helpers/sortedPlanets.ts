import { IPlanets } from "src/models/IModels";

export default function sortedPlanets(planets: IPlanets[], id: number) {
    let planetsTmp: IPlanets[] = []
    switch (id) {
        case 1: {
            planetsTmp = bubbleSortNumber(planets)
            break;
        }
            
        case 2: {
            planetsTmp = bubbleSortName(planets)
            break;
        }
        
        case 3: {
            planetsTmp = bubbleSortRotationPeriod(planets)
            break;
        }
    
        default:
            break;
    }
    return planetsTmp
};

function bubbleSortNumber(arr: IPlanets[]) {
    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (arr[i].number! > arr[i + 1].number!) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
    return arr
}

function bubbleSortName(arr: IPlanets[]) {
    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (arr[i].name > arr[i + 1].name) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
    return arr
}

function bubbleSortRotationPeriod(arr: IPlanets[]) {
    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (arr[i].rotation_period > arr[i + 1].rotation_period) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
    return arr
}