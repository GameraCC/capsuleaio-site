# Capsule AIO Site

## Overview

The capsuleaio site can be broken down into 5 subsections:

* capsuleaio-api-v1  
    This api contains methods for the website to use
* capsuleaio-api-v2
    This is the websocket api used by the bot itself
* capsuleaio-db
    The database containing all of capsuleaio's business data including user data, analytics, and keys
* capsuleaio-key
    The aws hosted RSA key pair used for encryption between capsuleaio and the client
* capsuleaio-site
    The static website assets

All elements of the site include serverless templates for launching.

## Authorization

The authorization process for capsuleaio is as follows...

### Database

The database uses the primary key: type and the secondary key: id and a secondary index on the field: keyId.

Keys are persistent keys that represent a license to capsule aio. Keys persist indefinitely in the database. They have an internal id (id) and an external id (keyId). The internal id is a hash that will not change. The keyId is the key value that is given to the customer, and may change when a user deactivates the key to sell/trade it.

Users are created from discord logins and may or may not be associated with a key. If a user is associated with a key it is considered activated. An activated user is paired 1:1 with a key. A user will stay activated with a key until they choose to deactivate. If a user does not pay their monthly fee, their key may become unusuable but it will still be activated to their account.

When a user activates a key, they will get the activations array added to their database item which contains all historical activations on their account. They will also get the apiKey object which contains their api key for accessing nokamai, etc. This is generated automatically using the aws sdk. They will also get the key and keyId properties added. Key is the id of the key type record that they activated, while keyId is the user-known name of the key. These can be looked up using the secondary index.