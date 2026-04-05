import { allNav } from "./allNav";
export const getNav = (role: string) => {
    const finalNavs=[]
    for (let i = 0; i < allNav.length; i++) {
        if (allNav[i].role === role) {
            finalNavs.push(allNav[i]);
        }
    }
    return finalNavs;
}