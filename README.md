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
  <img height="220px" width="450px" src="https://github.com/Ph-lo/Previously_on/blob/main/screen1.png" />
  <img width="450px" src="https://github.com/Ph-lo/Previously_on/blob/main/screen2.png" />
  <img width="450px" src="https://github.com/Ph-lo/Previously_on/blob/main/screen3.png" />
  <img width="450px" src="https://github.com/Ph-lo/Previously_on/blob/main/screen4.png" />
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
For more informations about the API used for this project see the [Betaseries API doc](https://www.betaseries.com/en/api/)<br />
[Docker](https://docs.docker.com/get-started/)
