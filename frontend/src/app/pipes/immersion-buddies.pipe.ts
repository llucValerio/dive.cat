import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'immersionBuddies',
  pure: false
})
export class ImmersionBuddiesPipe implements PipeTransform {

  transform(userBuddies: any[], immersionBuddies:any): any {
    if (!userBuddies || !immersionBuddies) {
      return userBuddies;
    }
    return userBuddies.filter(item => {
        if ((immersionBuddies.find((immBud:any) => immBud._id === item._id))=== undefined){
          return item
        }
      });
  }
}

