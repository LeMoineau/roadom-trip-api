# Roadom-trip API

## Deploy

```shell
npm run build
git push #will automatically deploy on vercel
```

## Routes

### Create a trip

#### Endpoint

```
POST /trips
```

#### Body

```
{
    startingPos: {
        lat: number,
        lon: number,
        label?: string
    };
    distanceMax: number;
    distanceMin?: number;
    allowNoInformationsEnding?: boolean;
}
```

when `allowNoInformationsEnding` is set to `true`, trips created accept to not receive open street map data from the choosen ending point (that may cause several missing hints which would not have enough informations)
