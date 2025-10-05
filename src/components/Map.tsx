import React from 'react';
import {Camera, MapView} from '@maplibre/maplibre-react-native';
import {
  CircleLayerSpecification,
  GeoJSONSourceSpecification,
  LineLayerSpecification,
  StyleSpecification,
} from '@maplibre/maplibre-gl-style-spec';
import {GeoJSON} from 'geojson';

import * as defaultMapStyle from '../map-styles/style.json';
import {Button} from 'react-native';

let defaultStyle: StyleSpecification = defaultMapStyle as StyleSpecification;

// in this example search origin is set to Hervanta
const herwoodCenteredShipSource: GeoJSONSourceSpecification = {
  type: 'geojson',
  data: 'https://meri.digitraffic.fi/api/ais/v1/locations?radius=100&latitude=61.4481&longitude=23.8521',
};

const shipLayer: CircleLayerSpecification = {
  id: 'ships',
  type: 'circle',
  source: 'fintraffic-ships',
  paint: {
    'circle-color': '#fa0',
  },
};

const herwoodToCapetown: GeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [23.8521, 61.4481],
          [18.4233, -33.918861],
        ],
      },
      properties: {name: 'Hervanta - Cape Town'},
    },
  ],
};

const herwood2CapetownSource: GeoJSONSourceSpecification = {
  type: 'geojson',
  data: herwoodToCapetown,
};

const herwoodLayer: LineLayerSpecification = {
  id: 'herwood-to-capetown',
  type: 'line',
  source: 'herwood-to-capetown',
  paint: {
    'line-cap': 'round',
    'line-width': 10,
    'line-color': '#fa0',
  },
};

const plainPointSource: GeoJSONSourceSpecification = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [19.93481, 60.09726],
        },
        properties: {name: 'Mariehamn'},
      },
    ],
  },
};

const plainPointLayer: CircleLayerSpecification = {
  id: 'plain-point',
  type: 'circle',
  source: 'plain-point',
  paint: {
    'circle-color': '#0a0',
    'circle-stroke-width': 2,
    'circle-stroke-color': '#000',
  },
};

const cameraInitState = {
  centerCoordinate: [19.93481, 60.09726],
  zoomLevel: 10,
};

const Map = () => {
  const [mapStyle, setMapStyle] =
    React.useState<StyleSpecification>(defaultStyle);
  const [camera, setCamera] = React.useState<any>(cameraInitState);
  const cameraref = React.useRef<Camera>(null);

  const addLineLayer = () => {
    setMapStyle({
      ...mapStyle,
      sources: {
        ...mapStyle.sources,
        'herwood-to-capetown': herwood2CapetownSource,
      },
      layers: [...mapStyle.layers, herwoodLayer],
    });
  };

  const addLayer = () => {
    setMapStyle({
      ...mapStyle,
      sources: {
        ...mapStyle.sources,
        'fintraffic-ships': herwoodCenteredShipSource,
        'plain-point': plainPointSource,
      },
      layers: [...mapStyle.layers, shipLayer, plainPointLayer],
    });
  };

  // set new center focus, defaults to mariehamn
  const resetCamera = () => {
    setCamera(cameraInitState);
  };

  /*
if (defaultStyle) {
  defaultStyle.sources = {
    ...defaultStyle.sources,
    'fintraffic-ships': herwoodSource,
  };

    defaultStyle.layers.push({
      id: 'herwood-location-static',
      type: 'circle',
      source: 'fintraffic-ships',
      paint: {
        'circle-radius': 4,
        'circle-color': '#ffe600ff',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#000000ff',
      },
    });
  }
  */
  return (
    <>
      <Button title="Reset" onPress={resetCamera}></Button>
      <Button title="Show" onPress={addLineLayer}></Button>
      <Button title="Show2" onPress={addLayer}></Button>
      <MapView id={'asdf'} style={{flex: 1}} mapStyle={mapStyle}>
        <Camera
          centerCoordinate={camera.centerCoordinate}
          zoomLevel={camera.zoom}
        />
      </MapView>
    </>
  );
};

export default Map;
