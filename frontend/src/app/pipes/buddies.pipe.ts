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
        for (let userBuddie of user.buddies.value) {
          if (buddie._id === userBuddie._id) {
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
