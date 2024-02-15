# Formulario Multipaso

Este proyecto se trata de único formulario dividido en cuatro pasos que al finalizarlo aumenta el salario del empleado en 'x' porcentaje dependiendo del tiempo que lleve en dicha empresa. Al ser un formulario contiene verificaciones en cada input para que si hay algún campo considerado incorrecto, mediante expresiones regulares, no avance al siguiente paso. Cada paso abarca diferentes funcionalidades, tales como combos, input de tipo radio, gráficos 
realizados con canvas y más. En el último paso la fecha está capada al año 2000 que es cuando se fundó presuntamente la empresa simulada en este formulario.

# CRUD Estudiantes

Trata de una aplicación web en la que se pueden registrar estudiantes, una vez registrados editarlos o borrarlos, con sistema de paginación cada 5 estudiantes mostrados se genera una página para los siguientes. En este proyecto se realiza una conexión a una base de datos firebase y se interactúa con ella mediante javascript y diferentes métodos de crear, actualizar, borrar estudiantes. Cada input tiene validaciones para comprobar que el estudiante no se registre o se actualice
cumpliendo una serie de pautas, el id mostrado es solo estético ya que para actualizar y crear uso el hash que genera firebase para acceder a cada tabla.

# Factores a tener en cuenta en ambos trabajos

Los números tienen que tener 9 dígitos y empezar por 6 o 7 u 8 o 9 para ser validado. En el formulario-multipaso el correo tiene que tener formato ejemplo@ejemplo.com.
En el CRUD Estudiantes he considerado que no pueden haber dos estudiantes con el mismo nombre y apellidos, pero si pueden haber dos estudiantes, hermanos por ejemplo, uno con un correo y teléfono y otro con el mismo, ya que he pensado que pueden poner el correo y teléfono de los padres
y ofrezco la posibilidad que sean los mismos. Pero no pueden haber dos estudiantes iguales.
