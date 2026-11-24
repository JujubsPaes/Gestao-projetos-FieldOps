type Coordinate = { latitude: number; longitude: number };

const EARTH_RADIUS_METERS = 6_371_000;
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export function distanceInMeters(from: Coordinate, to: Coordinate): number {
  const latitudeDifference = toRadians(to.latitude - from.latitude);
  const longitudeDifference = toRadians(to.longitude - from.longitude);
  const fromLatitude = toRadians(from.latitude);
  const toLatitude = toRadians(to.latitude);
  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(fromLatitude) * Math.cos(toLatitude) * Math.sin(longitudeDifference / 2) ** 2;

  return 2 * EARTH_RADIUS_METERS * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function formatDistance(meters: number): string {
  return meters < 1_000 ? `${Math.round(meters)} m` : `${(meters / 1_000).toFixed(2)} km`;
}
