/**
 * 
 * @param { string } principalId A string to be passed to the invoked function, can be a javascript object serialized to json and encoded in base64.
 * @param { string } Effect The effect of the policy, should usually be 'Allow'.
 * @param { string } Resource The ARN of the resource to which to apply the effect, if called within a function will usually be event.methodArn.
 * @returns A policy object that can be returned in a lambda authorizer to grant or revoke access.
 */
module.exports = (principalId, Effect, Resource) => ({
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect,
          Resource,
        },
      ],
    },
  })