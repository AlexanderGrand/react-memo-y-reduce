<<<<<<< HEAD

# React Hook Memo y Reduce

https://alexandergrand.github.io/react-memo-y-reduce/

## La granja de grand es un ejemplo de como usar el hook reduce para encapsular la logica de un programa de manera organizada y estandar, es decir, que su finalidad es que pueda majerase la logica de una manera que puede ser entendida por otras personas, independientemente del programador. Siempre y cuando, se conozca el concepto base del hook reduce claro. Entonces, ¿Cuando se debe usar el hook reduce?

### El hook reduce se debe utilizar cuando un programa presenta una correlacion en los datos, es decir, si un dato cambia , tambien cambian los demas datos simultaneamente.

En este caso en particular, el hook reduce se utilizo en el manejo de los 3 formularios encargados de gestionar los datos entrantes de la app. Por tanto:

- Si la cantidad de pollitos bebes cambia, cambia el total de aves.

- Si la cantidad de pollos adultos cambia, la cantidad de pollitos bebes cambia.

- Si la cantidad de pollos adultos transferidos a otras granja cambia, cambia la cantidad de pollos adultos restantes, y cambia el total de aves en existencia.

Todos Lo datos anteriores estan correlacionados, y si un dato cambia, produce un efecto en todos los demas.

## Ahora bien, todos los datos se calculan segun su logica y se van mostrando en una tabla ya procesados. No obstante, cada vez que los datos van cambiando en la caja de texto del formulario, el hook reduce los detecta, el problema es que esa actualizacion en el hook reduce renderiza todo el componente, incluso la tabla de datos procesados que es otro componente.

### En este caso, es sencillo, todos los datos equivalen a una sola fila, pero esto no siempre es asi, asumamos que hay cientos de miles de datos que se estan mostrando en la tabla, volver a ejecutar todos esos datos, podrian afectar el rendimiento de la aplicacion.

## Entonces, ¿como se soluciona el problema del quel hook reduce renderiza todo el componente tabla o estadistica?, la respuesta es mediante React.memo.

### React memo tiene como objetivo determinar cuando debe renderizarse un componente, y para ello maneja una version memorizada del mismo, que depende directamente de sus props, es decir, si un componente recibe props, el componente solo se renderizara cada vez y unicamente, cuando sus props cambien, en caso contrario, se retorna una version memorizada del mismo.

## Entonces ,para ilustrar y observar el uso de React.memo , la app de la granja tiene una componente tabla optimizado y otro no optimizado, en la version no optimizada, en su parte superior se encuentra un barra de colores, que cambia cada vez que el hook reduce rederiza todo, de igual forma, en la version optimizada tambien se encuentra la barra de colores, pero, solo cambiara de color cuando se da click en el boton de algun formulario. Gracias a que internamente esta envuelto sobre React.memo.

=======
