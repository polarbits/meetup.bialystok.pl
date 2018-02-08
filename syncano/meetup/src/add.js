import Server from '@syncano/core'

export default (ctx) => {
  const {response, data, users} = new Server(ctx)
  console.log(ctx.meta);
  if (ctx.args.title && ctx.args.description) {
    data.meetups.create({
      title: ctx.args.title, 
      description: ctx.args.description
    });
    response.json({
      message: `OK ${ctx.args.title} ${ctx.args.description}!`
    })
  } else {
    response.json({
      message: 'You have to send "firstname" and "lastname" arguments!'
    }, 400)
  }
}
