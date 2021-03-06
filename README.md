# Pusher Me

A sample project that configures a private channel and control the members subscription to a channel.
Why not let pusher handle that? Because Pusher presence channels only supports 100 members
at maximum.

Also it has a `React` component call `<Pusher />` which can be used like this:

```jsx
<Pusher channel="my-channel-name"
        event="my-event-name"
        handler={this.myHandler.bind(this)}
        params={{userId: 1, token: 'a-token'}} />
```

Its properties are:

  * `channel`: The Pusher channel in which we are going to subscribe
  * `event`: The channel event we are going to be bond
  * `handler`: Callback function to be called when a Pusher event arrive
  * `params`: Extra params passed to the Pusher component so the channel authentication
  can work properly

  **NOTE 1**: This is needed because we are using private channels and Pusher requires an authentication endpoint so the WebSocket connection can be accepted or not. (I also think we can omit this params and let the component retrieve these informations).

  **NOTE 2**: The pusher config in the frontend part is retrieved from the `.env` file just like the backend.

---

On the backend side we have a controller called `API::PusherController` which has two actions:

* `auth`: the action responsible to accept or not the WebSocket connection
* `webhook`: it is the Pusher existence webhook which receives two events `channel_occupied` and `channel_vacated`. We use this events to store in a `Redis` instance the key (`channels:channel-name`) a boolean value saying if the channel is occupied or not.

---

Also on the backend we have an action `create` on `API::MessagesController` that receives a message and triggers a Pusher event through a `sidekiq` worker so the response time could be fast.


----

## Configuration

You need to have:

* Ruby `2.4.2` installed
* NodeJS 6+
* PostgreSQL
* Redis
* Yarn

Run:

* `cp .env.sample .env`
* `bundle install`
* `yarn install`
* `bin/rails db:create db:migrate`
* `foreman start`

**DON'T FORGET**: You need to configure your .env file with your Pusher credentials.

**DISCLAIMER**: This project has no tests because it's just an spike for a problem that I faced.



