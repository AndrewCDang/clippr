function toRadians(degrees:number) {
    return degrees * Math.PI / 180;
}

const getDistance = (lat1:number, lng1:number, lat2:number, lng2:number) => {
    
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLng = toRadians(lng2 - lng1);

        const a = 
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers

        return distance;
}

export default getDistance