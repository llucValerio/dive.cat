import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buddies',
  pure: false
})
export class BuddiesPipe implements PipeTransform {

  transform(buddies: any[],user: any): any {
    let userExists: boolean = false;
    if (!buddies || !user) {
      return buddies;
    }
    return buddies.filter(buddie => {
      userExists = false
      if (buddie._id !== user._id.value) {
        for (let index:number=0;index<user.buddies.value.length;index++){
          if (buddie._id === user.buddies.value[index]._id) {
            userExists = true
          }
        }
        if(!userExists) {
          return buddie
        }
      }
    })
  }
}
