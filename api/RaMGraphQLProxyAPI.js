const handler = async (req, res, next) => {
  const response = await fetch('https://rickandmortyapi.com/graphql', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(req.body),
  }).then(r => r.json());

  res.send(response)

  next();
}

module.exports.RaMGraphQLProxyAPIHandler = handler;
