# Our API Documentation

Here's the description of the API! _NOTE:_ interfacing with our API will bring the latest on all things slimey and scaly.

## Port - Location of all endpoints to interfacae with our API is at `http://localhost:5150`

## [POST] `/api/snakes`

| Endpoint    | TYPE | DATA |
| ----------- | ---- | ---- |
| /api/snakes | POST | json |

### Example:

```
{
  name: 'Boa',
  description: 'Constricts and suffocates its prey',
}
```

## [GET] `/api/snakes`

| Endpoint    | TYPE | DATA |
| ----------- | ---- | ---- |
| /api/snakes | POST | json |

### Example:

```
[
  {
    name: 'Boa',
    description: 'Constricts and suffocates its prey',
  },
  {
    name: 'Diamondback',
    description: 'Rattles tail as a warning',
  }
]
```

## [PUT] `/api/snakes/:name`

| Endpoint    | TYPE | DATA |
| ----------- | ---- | ---- |
| /api/snakes | POST | json |

### Example:

All PUT requests require a name and description input.

```
[
  {
    name: 'New name',
    description: 'New description',
  }
]
```

## [DELETE] `/api/snakes/:name`

| Endpoint    | TYPE | DATA |
| ----------- | ---- | ---- |
| /api/snakes | POST | json |
