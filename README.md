# SoundQuest

Proyecto de React con Vite inicializado con Vanilla JavaScript sin frameworks.

- Guardo el token en las cookies para que, en caso de que no haya expirado (tiene la misma duración que el token de Spotify –3600–), no haga la llamada al fetch, sino que recupere el token de la cookie –ya que si reinicia, se pierde del Redux–. Lo había pensado en un principio para guardar el token dentro de otro token que me devolviera el back, pero es que igual se puede decodificar y no tiene sentido. Igual puedo reaprovechar estas funciones de cookies para en el futuro guardar "uid", por ejemplo.