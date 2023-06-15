import React, { FC, useState } from 'react';
import { Address, Maybe } from 'types';
import { GoogleMap, Marker } from '@react-google-maps/api';

type MapPanelProps = {
  address?: Maybe<Address> | undefined;
  height: string;
  width: string;
  showTextAddress?: boolean;
};

const MapPanel: FC<MapPanelProps> = ({ address, height, width, showTextAddress }) => {
  const [latLang, setLatLang] = useState({ lat: 0, lng: 0 });

  const containerStyle = {
    width: width,
    height: height,
  };

  const center = {
    lat: latLang.lat,
    lng: latLang.lng,
  };

  const onLoad = React.useCallback(
    function callback(map: any) {
      if (!address?.lng) {
        const formatted_address = `${address?.line1}, ${address?.city}, ${address?.stateProvince} ${address?.postalCode}`;
        const request = {
          query: formatted_address,
          fields: ['name', 'geometry'],
        };

        const service = new window.google.maps.places.PlacesService(map);

        service.findPlaceFromQuery(request, function (results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (var i = 0; i < results.length; i++) {
              setLatLang({
                lat: results[i].geometry?.location?.lat() as number,
                lng: results[i].geometry?.location?.lng() as number,
              });
            }
            map.setCenter(results[0].geometry?.location);
          }
        });
      } else {
        setLatLang({ lat: address.lat as number, lng: address.lng });
      }
    },
    [address]
  );

  const onUnmount = React.useCallback(function callback(map: any) {}, [address, setLatLang, latLang]);

  return true ? (
    <div>
      {showTextAddress && address?.line1 && (
        <div className="text-sm font-medium">{`${address?.line1}, ${address?.city}, ${address?.stateProvince} ${address?.postalCode}`}</div>
      )}
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} onUnmount={onUnmount} onLoad={onLoad}>
        <Marker position={center} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default MapPanel;
