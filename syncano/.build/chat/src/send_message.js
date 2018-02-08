import Syncano from 'syncano-server'

export default ctx => {
  const { channel, response } = new Syncano(ctx)
  const { username, text, token } = ctx.args

  channel.publish(`realtime.${token}`, { text, username })
    .then(res => response(JSON.stringify(res), 200, 'application/json'))
    .catch(err => response(JSON.stringify(err), 400, 'application/json'))
}
