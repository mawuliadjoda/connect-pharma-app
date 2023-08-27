/*
export type UserGeolocationCoordinates = {
    latitude: number,
    longitude: number
} | null


export const getUserLocationFromBrowser = new Promise<UserGeolocationCoordinates>((resolve, reject,) => {
    
    console.log('j execute getUserLocationFromBrowser')
    let userCordinate: UserGeolocationCoordinates = null;

    if (navigator.geolocation) {
        console.log('latitude && longitude && userTelephone get from browser.');
        navigator.geolocation.getCurrentPosition(
            (position) => {

                userCordinate = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                } as UserGeolocationCoordinates;

                resolve(userCordinate);

            },
            (error) => {
                console.error(error);
                reject(error);
            }
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
});
*/