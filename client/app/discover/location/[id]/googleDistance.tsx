"use client"

import { DistanceMatrixService, useLoadScript} from '@react-google-maps/api'


export function distanceMatrix(userLocation: string, barberLocation: string): Promise<number> {

    const loc1: string = userLocation;
    const loc2: string = barberLocation;

    const service = new google.maps.DistanceMatrixService();

    const getDistance = async(): Promise<number> => {
        const request = await service.getDistanceMatrix({
            origins: [loc1],
            destinations: [loc2],
            travelMode: google.maps.TravelMode.BICYCLING
        });
        const data = request.rows[0].elements[0].distance.value;
        return data;
    };

    return getDistance();
}

export default null;
