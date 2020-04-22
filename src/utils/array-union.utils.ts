

export const arrayUnion = (arrayOfArray: string[][]) => {
    return new Promise((resolve: Function, reject: Function) => {
        try {
            let totalArr: string[] = [];
            for (const arr of arrayOfArray) {
                totalArr = [...totalArr, ...arr];
            }
            totalArr = [... new Set(totalArr)];
            resolve(totalArr);
        }
        catch(ex) {
            reject(ex);
        }
        
    })

}
