import { sdk } from '@audius/sdk'

const audiusSdk = sdk({
  apiKey: 'c4f14ea7a0b31542e49796d63d537a984774987c',
  apiSecret: '',
})

const track = await audiusSdk.tracks.getTrack({ trackId: 'D7KyD' })
console.log(track, 'Track fetched!')

const userId = (
  await audiusSdk.users.getUserByHandle({
    handle: 'Your Audius handle goes here',
  })
).data?.id

const track = await audiusSdk.users.getUser({
  id: '3OEON3J',
})
console.log(user)
