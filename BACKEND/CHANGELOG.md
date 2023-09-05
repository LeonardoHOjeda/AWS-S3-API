# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

## [Sin liberar]
### Agregado
- Se agrega endpoint para eliminar un archivo de la base de datos.
- Se ordenan los archivos por fecha de creación de mas reciente a mas antiguo.
- Se agrega el nombre del tenant a la hora de consultar los archivos de la BD.
- Se agrega endpoint para eliminar un archivo del bucket de AWS.
- Se agrega documentación de la API con SWAGGER.
## [1.0.14] - 18-08-2023
### Cambiado
- Se permite subir cualquier tipo de archivos, antes aceptaba únicamente PDF's e imágenes.
## [1.0.13] - 02-08-2023
### Agregado
- Se agregan validacion para restring la subida de archivos que pesen mas de 1 MB cuando se suben múltiples archivos.
- Se agrega validación para restringir la subida de archivos que no sean de tipo PDF o imagen cuando se suben múltiples archivos.

### Corregido
- Se corrige el bug que no guardaba la extensión en la base de datos.
- Se corrige el bug que generaba 2 uuids distintos, uno para la base de datos y otro para el bucket

## [1.0.12] - 31-07-2023
### Agregado
- Se agrega validación para restringir la subida de archivos que pesen más de 1 MB.
- Se agrega validación para restringir la subida de archivos que no sean de tipo PDF o imagen.

[Sin liberar]: https://gitlab.gobdigital.com/nomina/aws-s3-api/-/compare/v1.0.14...main
[1.0.14]: https://gitlab.gobdigital.com/nomina/kiosko_front_react/-/compare/v1.0.13...v1.0.14
[1.0.13]: https://gitlab.gobdigital.com/nomina/kiosko_front_react/-/compare/v1.0.12...v1.0.13
[1.0.12]: https://gitlab.gobdigital.com/nomina/kiosko_front_react/-/compare/6ea5cbee4828850b408c214c8ef7c5750a63e84d...v1.0.12
