const key = "services"

// Return a truthy/falsy value for whether favouriting is possible in the given browser
export const favouritingEnabled = () => {
    if(localStorage){
        // Check if user disabled cookies
        if(JSON.parse(window.localStorage.getItem("disabled"))) return false
        return true
    }
    return false
}

// Return an array of everything, or null if uninitialised
// If ids param is given, return an array of only IDs instead
export const listFavourites = () => {
    const list = JSON.parse(localStorage.getItem(key))
    if(list) return list
    return []
}

// Check whether the given service is saved
export const isFavourited = (assetId) => {
    let services = listFavourites()
    if(services){
        let matchingServices = services.filter(service=>{
            if(service.assetId === assetId) return service
        })
        return matchingServices.length > 0
    }
    return false
}
  
// Save a given service object, and return the new list
export const addFavourite = (service) => {
    let services = listFavourites()
    if(!services){
        services = new Array()
    }
    services.push(service)
    localStorage.setItem(key, JSON.stringify(services))
    return listFavourites()
}

// Remove service by assetId
export const removeFavourite = (assetId) => {
    let services = listFavourites()
    if(services){
        const remainingServices = services.filter(service=>{
            if(service.assetId !== assetId) return service
        })
        localStorage.setItem(key, JSON.stringify(remainingServices))
        return remainingServices
    }
}