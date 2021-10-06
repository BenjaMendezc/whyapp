# whyapp

Es una pequeña app focalizada en back-end que utiliza websocket y un REST endpoint (las tecnologías requeridas en el challenge). También tiene un html muy simple
creado solamente para probar la app y jugar un poco, no se va a romper si lo miran muy fuerte pero está limitado de funcionalidades.

Para guardar la información durante sesiones use una base de datos con dialecto `postgres`.

Es la primera vez que trabajo con WebSockets, no conocía la tecnología. Fue un desafío, pero me gustaría seguir haciendo proyectos con ella en el futuro para
mejorar en la implementación.

## Índice

###### Para levantar el proyecto
###### Explicación de la app
###### Tecnologías usadas


## Para levantar el proyecto

1- Crear archivo .env en la carpeta root con estos datos:
```
DB_USERNAME=<tu postgres username>
DB_PASSWORD=<tu postgres password>
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
```
2- `npm run build` | crea la base de datos y seedea algunos pares key-value

3- `npm start` | abre el html y levanta el servidor

Los tests se pueden correr con `npm test`

## Explicación de la app

WhyApp te da razones random para hacer lo que sea. No alcanzaron las razones? Podes crear la tuya. 

La app tiene dos botones:

 `because` va a la base de datos a buscar una razón (al azar) y la renderiza
 
 `add` crea una razón nueva con el valor del input y la guarda en la base de datos. Como `because` es random, quizás vas a tener que apretarlo un par de veces hasta
 que salga tu razón, pero está ahí.
 
#### Explicación un poco más tecnica de la app

El botón `because` hace dos cosas, una *importante y otra no tanto*

*La importante:* tiene un fetch a un REST endpoint que envía una Key por query y le indica al servidor que traiga el value asociado a esa key en la base de datos. Esta funcionalidad fue
requerida en el challenge.
      
*La no tanto:* un fetch a otro endpoint que le pide al servidor que traiga el length de todos los elementos en la database. ¿para que?-> Como la Key que recibe el fetch *importante* es random,
la app usa esta info para saber el rango de numeros que puede tirar al azar: que la key no sea mayor a la cantidad de elementos en la base de datos.


El botón `add` también hace dos cosas

*Agregar la razón:* envía por websocket un json con un par key-value, que en el servidor se parsea y se guarda en la base de datos. Esta funcionalidad fue
requerida en el challenge.

*Asignar la key:* Como la key funciona como primaryKey de la base de datos y tiene validaciones de unicidad, es necesario mandar un numero nuevo junto al value cada vez
que se agrega una razón. Para eso, y de manera similar al botón `because`, la app trae el length de los elementos en la base de datos y le asigna ese valor a la Key.
De esta manera, el par key-value enviado siempre va a tener la key consecutiva al último asiento en la database.

## Tecnologías usadas

#### Servidores

Usé la libreria `ws` para crear el websocket y adjuntarlo a un servidor HTTP. El REST endpoint está hecho con `express`

El servidor **WebSocket** recibe un message con un json que tiene el par key-value y loguea en consola el mensaje recibido. El json se parsea y luego se guarda en la base de datos
estableciendo una columna para la key y otra para el value. Además, tiene un handler para reconocer si la conexión se cortó desde alguna de las partes. El handler consiste
en eventos `ping` y `pong`.

El **REST endpoint** es un GET con control de errores, que ejecuta una query FindOne en el modelo de la base de datos con una cláusula `where` para identificar el id del value
relacionado a la key recibida. En caso de que la key no corresponda a ningun id, se envía un error HTTP y un mensaje correspondiente. Esto no se aprecia en la App ya que
nunca se enviará una key inexistente, pero se puede probar en postman enviando por query una key inexistente. Por ej: `http://localhost:3001/whyapp/because?key=100`

#### Base de datos

Para mantener la información entre sesiones (y que no se pierda si se cae el servidor) implementé una base de datos con el dialecto `postgres`. Usé `dotenv` para guardar
las credencales en un archivo `.env`.

La base de datos consiste en un sólo modelo con dos columnas:

La columna *key*: es la primaryKey del modelo y tiene validaciones de unicidad y allowNull:false

La columna "value": Es un DataType String y no tiene validaciones.

Usé `sequelize` para manipular la base de datos y crear las queries en el servidor. También usé las migraciones de `sequelize-cli` para poder buildearla
y le agregé algunos **seeders** para poder usar la app "out of the box".

#### Tests

Para los tests usé `chai` y `mocha` para la esctructura, y `supertest` para crear una sesión y poder testear los endpoint.



















