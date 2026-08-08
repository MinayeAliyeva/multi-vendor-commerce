import {allNav} from './allNav';

export const getNav = (role) => {
    const finalNavs = []

    // Verilen role-a uygun menu item-lari secilir.
    for (let i = 0; i < allNav.length; i++) {
       if (role === allNav[i].role) {
         finalNavs.push(allNav[i])
       } 
    }
    return finalNavs

}
