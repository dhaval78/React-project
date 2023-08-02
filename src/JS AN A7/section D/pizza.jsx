import React, { Component } from 'react';
import './app.css';

const sizes = ["Regular", "Medium", "Large"];
const crusts = [
  "New Hand Tossed",
  "Wheat Thin Crust",
  "Cheese Burst",
  "Fresh Pan Pizza",
  "Classic Hand Tossed",
];

const pizza=[
    {
      id: "MIR101",
      image: "https://i.ibb.co/SR1Jzpv/mirinda.png",
      type: "Beverage",
      name: "Mirinda",
      desc: "Mirinda",
      veg: "Yes",
    },
    {
      id: "PEP001",
      image: "https://i.ibb.co/3vkKqsF/pepsi-black.png",
      type: "Beverage",
      name: "Pepsi Black Can",
      desc: "Pepsi Black Can",
      veg: "Yes",
    },
    {
      id: "LIT281",
      image: "https://i.ibb.co/27PvTng/lit.png",
      type: "Beverage",
      name: "Lipton IcedTea",
      desc: "Lipton Iced Tea",
      veg: "Yes",
    },
    {
      id: "PEP022",
      image: "https://i.ibb.co/1M9xDZB/pepsi-new-20190312.png",
      type: "Beverage",
      name: "Pepsi New",
      desc: "Pepsi New",
      veg: "Yes",
    },
    {
      id: "BPCNV1",
      image: "https://i.ibb.co/R0VSJjq/Burger-Pizza-Non-Veg-nvg.png",
      type: "Burger Pizza",
      name: "Classic Non Veg",
      desc: "Oven-baked buns with cheese, peri-peri chicken, tomato &capsicum in creamy mayo",
      veg: "No",
    },
    {
      id: "BPCV03",
      image:
        "https://i.ibb.co/Xtx43fT/Burger-Pizza-Veg-423-X420-Pixel-1.png",
      type: "Burger Pizza",
      name: "Classic Veg",
      desc: "Oven-baked buns with cheese, tomato &capsicum in creamy mayo",
      veg: "Yes",
    },
    {
      id: "BPPV04",
      image:
        "https://i.ibb.co/Xtx43fT/Burger-Pizza-Veg-423-X420-Pixel-1.png",
      type: "Burger Pizza",
      name: "Premium Veg",
      desc: "Oven-baked buns with cheese, paneer,tomato, capsicum & red paprika in creamy mayo",
      veg: "Yes",
    },
    {
      id: "DIP033",
      image: "https://i.ibb.co/0mbBzsw/new-cheesy.png",
      type: "SideDish",
      name: "Cheesy Dip",
      desc: "An all-time favorite with your Garlic Breadsticks & Stuffed GarlicBread for a Cheesy indulgence",
      veg: "Yes",
    },
    {
      id: "DIP072",
      image: "https://i.ibb.co/fY52zBw/new-jalapeno.png",
      type: "SideDish",
      name: "Cheesy Jalapeno Dip",
      desc: "A spicy, tangy flavored cheese dip is a an absolute delight with your favourite Garlic Breadsticks",
      veg: "Yes",
    },
    {
      id: "GAR952",
      image: "https://i.ibb.co/BNVmfY9/Garlic-bread.png",
      type: "SideDish",
      name: "Garlic Breadsticks",
      desc: "Baked to perfection. Your perfect pizza partner! Tastes best with dip",
      veg: "Yes",
    },
    {
      id: "PARCH1",
      image: "https://i.ibb.co/prBs3NJ/Parcel-Nonveg.png",
      type: "SideDish",
      name: "Chicken Parcel",
      desc: "Snacky bites! Pizza rolls with chicken sausage & creamyharissa sauce",
      veg: "No",
    },
    {
      id: "PARVG7",
      image: "https://i.ibb.co/JHhrM7d/Parcel-Veg.png",
      type: "Side Dish",
      name: "VegParcel",
      desc: "Snacky bites! Pizza rolls with paneer & creamy harissa sauce",
      veg: "Yes",
    },
    {
      id: "PATNV7",
      image: "https://i.ibb.co/0m89Jw9/White-Pasta-Nvg.png",
      type: "SideDish",
      name: "White Pasta Italiano Non-Veg",
      desc: "Creamy white pasta with pepper barbecuechicken",
      veg: "No",
    },
    {
      id: "PATVG4",
      image: "https://i.ibb.co/mv8RFbk/White-Pasta-Veg.png",
      type: "SideDish",
      name: "White Pasta Italiano Veg",
      desc: "Creamy white pasta with herb grilledmushrooms",
      veg: "Yes",
    },
    {
      id: "DES044",
      image: "https://i.ibb.co/gvpDKPv/Butterscotch.png",
      type: "Dessert",
      name: "Butterscotch Mousse Cake",
      desc: "Sweet temptation! Butterscotch flavored mousse",
      veg: "Yes",
    },
    {
      id: "DES028",
      image: "https://i.ibb.co/nm96NZW/Choco-Lava.png",
      type: "Dessert",
      name: "Choco Lava Cake",
      desc: "Chocolate lovers delight! Indulgent,gooey molten lava inside chocolate cake",
      veg: "Yes",
    },
    {
      id: "PIZVDV",
      image: "https://i.ibb.co/F0H0SWG/deluxeveg.png",
      type: "Pizza",
      name: "DeluxeVeggie",
      desc: "Veg delight - onion, capsicum, grilled mushroom, corn & paneer",
      veg: "Yes",
    },
    {
      id: "PIZVFH",
      image: "https://i.ibb.co/4mHxB5x/farmhouse.png",
      type: "Pizza",
      name: "Farmhouse",
      desc: "Delightful combination of onion, capsicum, tomato & grilled mushroom",
      veg: "Yes",
    },
    {
      id: "PIZVIT",
      image: "https://i.ibb.co/sRH7Qzf/Indian-Tandoori-Paneer.png",
      type: "Pizza",
      name: "Indi Tandoori Paneer",
      desc: "It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum, red paprika & mint mayo",
      veg: "Yes",
    },
    {
      id: "PIZVMG",
      image: "https://i.ibb.co/MGcHnDZ/mexgreen.png",
      type: "Pizza",
      name: "Mexican Green Wave",
      desc: "Mexican herbs sprinkled on onion, capsicum, tomato &jalapeno",
      veg: "Yes",
    },
    {
      id: "PIZVPP",
      image: "https://i.ibb.co/cb5vLX9/peppypaneer.png",
      type: "Pizza",
      name: "PeppyPaneer",
      desc: "Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika",
      veg: "Yes",
    },
    {
      id: "PIZVVE",
      image: "https://i.ibb.co/gTy5DTK/vegextra.png",
      type: "Pizza",
      name: "VegExtravaganza",
      desc: "Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno &extra cheese",
      veg: "Yes",
    },
    {
      id: "PIZNCP",
      image: "https://i.ibb.co/b5qBJ9d/cheesepepperoni.png",
      type: "Pizza",
      name: "Chicken Pepperoni",
      desc: "A classic American taste! Relish the delectable flavor of Chicken Pepperoni,topped with extra cheese",
      veg: "No",
    },
    {
      id: "PIZNCD",
      image: "https://i.ibb.co/GFtkbB1/Chicken-Dominator10.png",
      type: "Pizza",
      name: "Chicken Dominator",
      desc: "Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rashers",
      veg: "No",
    },
    {
      id: "PIZNPB",
      image: "https://i.ibb.co/GxbtcLK/Pepper-Barbeque-Onion-C.png",
      type: "Pizza",
      name: "Pepper Barbecue & Onion",
      desc: "A classic favourite with pepperbarbeque chicken & onion",
      veg: "No",
    },
    {
      id: "PIZNIC",
      image: "https://i.ibb.co/6Z5wBqr/Indian-Tandoori-Chicken-Tikka.png",
      type: "Pizza",
      name: "Indi Chicken Tikka",
      desc: "The wholesome flavour of tandoori masala with Chicken tikka, onion, red paprika & mint mayo",
      veg: "No",
    },
  ];

const vegpizzaData = pizza.filter(
    (item) => item.veg === "Yes" && item.type === "Pizza"
  );

const sideDishData =   pizza.filter((item) => item.type === "SideDish");


const beverageData =pizza.filter(
    (item) =>
      item.type === "Dessert" ||
      item.type === "Burger Pizza" ||
      item.type === "Beverage"
  );

class Piz extends Component {
 state = {
      cartItems: [],
      selectedCategory: "",
      itemSelections: {},
      isInCart:false,
    };
  

    addToCart = (item) => {
        const { itemSelections,cartItems } = this.state;
        const { id } = item;
        const size = itemSelections[id]?.size || ''; 
        const crust = itemSelections[id]?.crust || '';
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id); 
        this.setState({
            isInCart:true
        })
        if (existingItem) {
            this.incrementQuantity(existingItem.id);
          } else {
    if(item.type==="Pizza"){if(size===""|| crust ===""){
    alert("Select crust and size")
    return
    }}
        const newItem = { ...item, quantity: 1, size, crust };
        this.setState((prevState) => ({
          cartItems: [...prevState.cartItems, newItem],
        }));
      };
    }

  incrementQuantity = (id) => {
    this.setState((prevState) => ({
      cartItems: prevState.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  decrementQuantity = (id) => {
    this.setState((prevState) => {
      const updatedCartItems = prevState.cartItems.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const filteredCartItems = updatedCartItems.filter((item) => item.quantity > 0);

      return { cartItems: filteredCartItems };
    });
  };

  handleSizeChange = (itemId, size) => {
    this.setState((prevState) => ({
      itemSelections: {
        ...prevState.itemSelections,
        [itemId]: {
          ...prevState.itemSelections[itemId],
          size,
        },
      },
    }));
  };

  handleCrustChange = (itemId, crust) => {
    this.setState((prevState) => ({
      itemSelections: {
        ...prevState.itemSelections,
        [itemId]: {
          ...prevState.itemSelections[itemId],
          crust,
        },
      },
    }));
  };

  renderItemGrid = (dataToRender) => {
    const { itemSelections, cartItems } = this.state;
  
    return (
      <div className="d-flex flex-row flex-wrap text-center">
        {dataToRender.map((item) => {
          const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
          const quantityInCart = isInCart ? cartItems.find((cartItem) => cartItem.id === item.id).quantity : 0;
  
          return (
            <div className="col-6 border" key={item.id}>
              <img className='im2' src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              {item.type === "Pizza" ? (
                <>
                  <select
                    onChange={(e) => this.handleSizeChange(item.id, e.target.value)}
                    value={itemSelections[item.id]?.size || ""}
                    disabled={isInCart}
                  >
                    <option value="">Select Size</option>
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) => this.handleCrustChange(item.id, e.target.value)}
                    value={itemSelections[item.id]?.crust || ""}
                    disabled={isInCart}
                  >
                    <option value="">Select Crust</option>
                    {crusts.map((crust) => (
                      <option key={crust} value={crust}>
                        {crust}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                ""
              )}
              <br />
              <br />
              {isInCart ? (
                <div className="quantity-control">
                  <button className="btn btn-danger" onClick={() => this.decrementQuantity(item.id)}>
                    -
                  </button>
                  <button className="btn btn-secondary">{quantityInCart}</button>
                  <button className="btn btn-success" onClick={() => this.incrementQuantity(item.id)}>
                    +
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary" onClick={() => this.addToCart(item)}>
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  

  renderCartItemRow = (item) => {
    return (
      <div className="d-flex no-wrap border" key={item.id}>
        <img className='im1' src={item.image} alt={item.name} />
        <div>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        {console.log(item)}
        {item.type==="Pizza"?<span className='fs'> {item.size} | {item.crust}</span>:""}
       
        <div className="">
          <button className='btn btn-danger' onClick={() => this.decrementQuantity(item.id)}>-</button>
          <button className='btn btn-secondary'>{item.quantity}</button>
          <button className='btn btn-success' onClick={() => this.incrementQuantity(item.id)}>+</button>
        </div>
        </div>
      </div>
    );
  };
  handleNavbarButtonClick = (category) => {
    this.setState({ selectedCategory: category });
  };

  render() {
    const { cartItems, selectedCategory } = this.state;
    let dataToRender = [];
    if (selectedCategory === "Veg Pizza") {
      dataToRender = vegpizzaData;
    } else if (selectedCategory === "Non-veg Pizza") {
      dataToRender = pizza.filter((item) => item.veg === "No" && item.type === "Pizza");
    } else if (selectedCategory === "Side Dishes") {
      dataToRender = sideDishData;
    } else if (selectedCategory === "Other Items") {
      dataToRender = beverageData;
    } else {
      
      dataToRender = vegpizzaData;
    }

    return (
      <>
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">MyFavPizza</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link"  onClick={() => this.handleNavbarButtonClick("Veg Pizza")}
              >Veg pizza <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  onClick={() => this.handleNavbarButtonClick("Non-veg Pizza")}>Non-Veg Pizza</a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  onClick={() => this.handleNavbarButtonClick("Side Dishes")}>Side Dishes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  onClick={() => this.handleNavbarButtonClick("Other Items")}>Other Items</a>
          </li>
        </ul>
      </div>
    </nav>
        <div className='fl'>
        <div className="content">
          {this.renderItemGrid(dataToRender)}
        </div>
        <div className="cr">
          <h2 style={{textAlign:"center"}}>Cart</h2>
          {cartItems.length===0?<h2 style={{textAlign:"center"}}>Cart is empty</h2>:(cartItems.map((item) => this.renderCartItemRow(item)))}
        </div>
        </div>
      </>
    );
  }
}
export default Piz;
