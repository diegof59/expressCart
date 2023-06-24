describe('Agregar producto al carrito de compras', () => {
  
  it('Agregar producto al carrito de compras con cantidad 1', () => {

    cy.visit('/product/scout-backpack');

    cy.get('#product_variant').select(0);
    cy.get('#product_variant').find('option:selected').should('have.text', 'Extra Large');
    
    cy.get('#product_quantity').should('have.value', 1);
    
    cy.get('.product-add-to-cart').click();

    cy.get('#notify_message').should('have.text', 'Cart successfully updated');
    cy.get('#notify_message').should('have.class' , 'alert-success');

    cy.visit('/checkout/cart');
    cy.get('.cart-product-quantity').first().should('have.value', 1);
    cy.get('strong.my-auto').first().should('have.text', '£60.00');
  });

  it('Agregar producto al carrito de compras con cantidad 2', () => {

    cy.visit('/product/scout-backpack');

    cy.get('#product_variant').select(0);
    cy.get('#product_variant').find('option:selected').should('have.text', 'Extra Large');
    
    cy.get('#product_quantity').clear();
    cy.get('#product_quantity').type(2);
    cy.get('#product_quantity').should('have.value', 2);
    
    cy.get('.product-add-to-cart').click();

    cy.get('#notify_message').should('have.text', 'Cart successfully updated');
    cy.get('#notify_message').should('have.class' , 'alert-success');

    cy.visit('/checkout/cart');
    cy.get('.cart-product-quantity').first().should('have.value', 2);
    cy.get('strong.my-auto').first().should('have.text', '£120.00');
  });

  it('Agregar producto al carrito de compras con cantidad 10', () => {

    cy.visit('/product/scout-backpack');

    cy.get('#product_variant').select(0);
    cy.get('#product_variant').find('option:selected').should('have.text', 'Extra Large');
    
    cy.get('#product_quantity').clear();
    cy.get('#product_quantity').type(10);
    cy.get('#product_quantity').should('have.value', 10);
    
    cy.get('.product-add-to-cart').click();

    cy.get('#notify_message').should('have.text', 'Cart successfully updated');
    cy.get('#notify_message').should('have.class' , 'alert-success');

    cy.visit('/checkout/cart');
    cy.get('.cart-product-quantity').first().should('have.value', 10);
    cy.get('strong.my-auto').first().should('have.text', '£600.00');
  });

  it('Agregar producto al carrito de compras con cantidad 19', () => {

    cy.visit('/product/scout-backpack');

    cy.get('#product_variant').select(0);
    cy.get('#product_variant').find('option:selected').should('have.text', 'Extra Large');
    
    cy.get('#product_quantity').clear();
    cy.get('#product_quantity').type(19);
    cy.get('#product_quantity').should('have.value', 19);
    
    cy.get('.product-add-to-cart').click();

    cy.get('#notify_message').should('have.text', 'Cart successfully updated');
    cy.get('#notify_message').should('have.class' , 'alert-success');

    cy.visit('/checkout/cart');
    cy.get('.cart-product-quantity').first().should('have.value', 19);
    cy.get('strong.my-auto').first().should('have.text', '£1140.00');
  });

  it('Agregar producto al carrito de compras con cantidad 20', () => {

    cy.visit('/product/scout-backpack');

    cy.get('#product_variant').select(0);
    cy.get('#product_variant').find('option:selected').should('have.text', 'Extra Large');
    
    cy.get('#product_quantity').clear();
    cy.get('#product_quantity').type(20);
    cy.get('#product_quantity').should('have.value', 20);
    
    cy.get('.product-add-to-cart').click();

    cy.get('#notify_message').should('have.text', 'Cart successfully updated');
    cy.get('#notify_message').should('have.class' , 'alert-success');

    cy.visit('/checkout/cart');
    cy.get('.cart-product-quantity').first().should('have.value', 20);
    cy.get('strong.my-auto').first().should('have.text', '£1200.00');
  });

  it('Agregar producto al carrito de compras con cantidad vacía/nula', () => {

    cy.visit('/product/scout-backpack');

    cy.get('#product_variant').select(0);
    cy.get('#product_variant').find('option:selected').should('have.text', 'Extra Large');
    
    cy.get('#product_quantity').clear();
    cy.get('#product_quantity').should('have.value', '');
    
    cy.get('.product-add-to-cart').click();

    cy.get('#notify_message').should('have.text', 'Quantity can\'t be blank');
    cy.get('#notify_message').should('have.class' , 'alert-warning');

    cy.visit('/checkout/cart');
    cy.get('.cart-contents-shipping').should('have.text', 'Cart empty');
    cy.get('.cart-product-quantity').first().should('not.exist');
  });

  it('Agregar producto al carrito de compras con cantidad 0', () => {

    cy.visit('/product/scout-backpack');

    cy.get('#product_variant').select(0);
    cy.get('#product_variant').find('option:selected').should('have.text', 'Extra Large');
    
    cy.get('#product_quantity').clear();
    cy.get('#product_quantity').type(0);
    cy.get('#product_quantity').should('have.value', 0);
    
    cy.get('.product-add-to-cart').click();

    cy.get('#notify_message').should('have.text', 'Quantity must be greater than 0');
    cy.get('#notify_message').should('have.class' , 'alert-warning');

    cy.visit('/checkout/cart');
    cy.get('.cart-contents-shipping').should('have.text', 'Cart empty');
    cy.get('.cart-product-quantity').first().should('not.exist');
  });

  it('Agregar producto al carrito de compras con cantidad 21', () => {

    cy.visit('/product/scout-backpack');

    cy.get('#product_variant').select(0);
    cy.get('#product_variant').find('option:selected').should('have.text', 'Extra Large');
    
    cy.get('#product_quantity').clear();
    cy.get('#product_quantity').type(21);
    cy.get('#product_quantity').should('have.value', 21);
    
    cy.get('.product-add-to-cart').click();

    cy.get('#notify_message').should('have.text', 'Quantity must be less than or equal to 20 (stock for this product variant');
    cy.get('#notify_message').should('have.class' , 'alert-warning');

    cy.visit('/checkout/cart');
    cy.get('.cart-contents-shipping').should('have.text', 'Cart empty');
    cy.get('.cart-product-quantity').first().should('not.exist');
  });
});
