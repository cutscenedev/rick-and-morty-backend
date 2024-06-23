function getRedisCacheKey(queryJSON) {
  return `WebAppServer/RaMGraphQLProxyAPIHandler:${queryJSON}`
}

const RaMGraphQLProxyAPIHandler = (redisClient) => async (req, res, next) => {
  const queryJSON = JSON.stringify(req.body);
  const redisCacheKey = getRedisCacheKey(queryJSON)

  const cachedResponse = await redisClient.get(redisCacheKey);

  if (cachedResponse === null) {
    console.debug('RaM proxy api: cache not found');

    try {
      const apiResponse = await fetch('https://rickandmortyapi.com/graphql', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: queryJSON,
      }).then(r => r.json());

      res.send(apiResponse);

      await redisClient.set(
        redisCacheKey,
        JSON.stringify(apiResponse),
        {
          EX: 10 // Short TTL for debugging
        }
      )
    } catch(err) {
      console.error('rickandmortyapi request failed', err)

      res.status(500).send('External API not available');
    }
  } else {
    console.debug('RaM proxy api: cache found');

    res.send(cachedResponse);
  }

  next();
}

module.exports.RaMGraphQLProxyAPIHandler = RaMGraphQLProxyAPIHandler;
