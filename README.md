<div>
  <h1 align="">Previously_on</h1>
  <p align="">School project - tv shows manager</p>
</div>

## Table of Contents

* [General info](#general-info)
* [Setup](#setup)
* [Status](#status)
* [Links](#links)


## General info
TV-shows manager, linked to the user's betaseries account via Oauth login

<p float="left" >
  <img height="220px" width="450px" src="https://github.com/Ph-lo/Previously_on/blob/main/Screenshot%202022-09-10%20at%2021-43-38%20React%20App.png" />
  <img width="450px" src="https://github.com/Ph-lo/Previously_on/blob/main/Screenshot%202022-09-10%20at%2021-37-16%20React%20App.png" />
  <img width="450px" src="https://github.com/Ph-lo/Previously_on/blob/main/Screenshot%202022-09-10%20at%2021-40-43%20React%20App.png" />
  <img width="450px" src="https://github.com/Ph-lo/Previously_on/blob/main/Screenshot%202022-09-10%20at%2021-40-54%20React%20App.png" />
</p>


## Setup
In the server side, create a .env file :
``` .env
CLIENT_ID=[BETASERIES CLIENT ID]
CLIENT_SECRET=[BETASERIES CLIENT ACCESS ]
REDIRECT_URI=http://localhost:5000/auth
```
Start the app with docker-compose :
``` shell
docker-compose up
```

## Status

The user can:
* go through the latest shows
* add / manage favorite shows
* leave comments on episodes
* manage friends

No search implemented

## Links
For more informations about the API used for this project see the [API doc](https://www.betaseries.com/en/api/)<br />
[Docker](https://docs.docker.com/get-started/)
