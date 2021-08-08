export const apiQuery = async (url, body, options) => (
  await (await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    credentials: 'include',
    ...(body
      ? {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      : {}),
    ...options
  })).json()
)
