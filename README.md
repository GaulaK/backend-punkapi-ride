# BEER COLLECTION - For RIDE!

## Start the project

Before start, install dependencies with :

`npm install`

To run the project, you can use the command :

`npx nodemon start`

If the server crashes, you can save to reload the server. Don't forget to add the .env file in the project.

# ROUTES

## generate

`/generate`

Generate 80 default beers from [Punk API](https://punkapi.com/). ⚠️ This route need to setup a Bearer Token Authentification for working. In .env file, add a variable `TOKEN_GENERATE_DATA` with the value of the token you want.

**Method** : POST

## getAll

Get all beers from the Database.

`/getAll`

**Method** : GET

No parameters.

## getOne

Get one beer from the Database.

`/getOne`

**Method** : GET

| Query | Information          | Required |
| :---- | :------------------- | :------: |
| id    | id element to search |   YES    |

## createOne

Create a new beer, you need to give the name to make a valid request.

`/updateOne`

**Method** : POST

| Body         | Information                                            |  Type  | Required |
| :----------- | :----------------------------------------------------- | :----: | -------- |
| name         | Beer name                                              | String | YES      |
| tagline      | Beer tagline/Summary                                   | String | NO       |
| first_brewed | format MM/YYYY for default data                        | String | NO       |
| description  | Beer description                                       | String | NO       |
| image_url    | URL with an image reference                            | String | NO       |
| abv          | Alcohol by Volume                                      | Number | NO       |
| ibu          | International Bitterness Units                         | Number | NO       |
| ebc          | European Brewery Convention                            | Number | NO       |
| srm          | Standard Reference Method                              | Number | NO       |
| ph           | Beer ph level (acidity)                                | Number | NO       |
| ingredients  | Object who contains all ingredients use (no formatter) | Object | NO       |

## updateOne

`/updateOne`

**Method** : PATCH

| Body   | Information                                                                                       | Required |
| :----- | :------------------------------------------------------------------------------------------------ | :------: |
| id     | id element to modify                                                                              |   YES    |
| update | Object with all informations to update (see [here](#createone) to check all available attributes) |   YES    |

## deleteOne

Delete a beer from the Database.

`/deleteOne`

**Method** : DELETE

| Body | Information          | Required |
| :--- | :------------------- | :------: |
| id   | id element to delete |   YES    |
