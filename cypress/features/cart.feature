Feature: Carrito de compras
  Agregar productos y su cantidad al carrito de compras en la página de detalles del producto

Background:
  Given un usuario cliente anónimo
    And un producto con nombre "Scout Backpack", variante "Extra Large", precio 60.00 y stock 20
    And cliente en págia de detalles del producto "Scout Backpack"

Scenario: Agregar producto al carrito de compras con cantidad 1
  Given que el cliente no tiene productos en su carrito de compras
    And Quantity es 1 (no se ha modificado la cantidad)
  When el cliente anónimo selecciona "Add to cart" de "Scout Backpack" en su carrito de compras
  Then el cliente anónimo recibe un mensaje de notificación "Cart successfuly updated"
    And el cliente anónimo tiene 1 "Scout Backpack" en su carrito de compras
    And el precio total de la compra es 60.00

Scenario: Agregar producto al carrito de compras con cantidad 2
  Given que el cliente no tiene productos en su carrito de compras
    And Quantity es 2 (se ha aumentado la cantidad)
  When el cliente anónimo selecciona "Add to cart" de "Scout Backpack" en su carrito de compras
  Then el cliente anónimo recibe un mensaje de notificación "Cart successfuly updated"
    And el cliente anónimo tiene 2 "Scout Backpack" en su carrito de compras
    And el precio total de la compra es 120.00

Scenario: Agregar producto al carrito de compras con cantidad 10
  Given que el cliente no tiene productos en su carrito de compras
    And Quantity es 10 (se ha aumentado la cantidad)
  When el cliente anónimo selecciona "Add to cart" de "Scout Backpack" en su carrito de compras
  Then el cliente anónimo recibe un mensaje de notificación "Cart successfuly updated"
    And el cliente anónimo tiene 10 "Scout Backpack" en su carrito de compras
    And el precio total de la compra es 600.00

Scenario: Agregar producto al carrito de compras con cantidad 19
  Given que el cliente no tiene productos en su carrito de compras
    And Quantity es 19 (se ha aumentado la cantidad)
  When el cliente anónimo selecciona "Add to cart" de "Scout Backpack" en su carrito de compras
  Then el cliente anónimo recibe un mensaje de notificación "Cart successfuly updated"
    And el cliente anónimo tiene 19 "Scout Backpack" en su carrito de compras
    And el precio total de la compra es 1140.00

Scenario: Agregar producto al carrito de compras con cantidad 20
  Given que el cliente no tiene productos en su carrito de compras
    And Quantity es 20 (se ha aumentado la cantidad)
  When el cliente anónimo selecciona "Add to cart" de "Scout Backpack" en su carrito de compras
  Then el cliente anónimo recibe un mensaje de notificación "Cart successfuly updated"
    And el cliente anónimo tiene 20 "Scout Backpack" en su carrito de compras
    And el precio total de la compra es 1200.00

Scenario: Agregar producto al carrito de compras con cantidad nula (campo vacío)
  Given que el cliente no tiene productos en su carrito de compras
    And Quantity es '' (nula) (se ha borrado la cantidad)
  When el cliente anónimo selecciona "Add to cart" de "Scout Backpack" en su carrito de compras
  Then el cliente anónimo recibe un mensaje de error "Quantity can't be blank"

Scenario: Agregar producto al carrito de compras con cantidad 0
  Given que el cliente no tiene productos en su carrito de compras
    And Quantity es 0 (se ha disminuído la cantidad)
  When el cliente anónimo selecciona "Add to cart" de "Scout Backpack" en su carrito de compras
  Then el cliente anónimo recibe un mensaje de error "Quantity must be greater than 0"

Scenario: Agregar producto al carrito de compras con cantidad 21 (mayor al stock)
  Given que el cliente no tiene productos en su carrito de compras
    And Quantity es 21 (se ha aumentado la cantidad)
  When el cliente anónimo selecciona "Add to cart" de "Scout Backpack" en su carrito de compras
  Then el cliente anónimo recibe un mensaje de error "Quantity must be less than or equal to 20 (stock for this product variant)"